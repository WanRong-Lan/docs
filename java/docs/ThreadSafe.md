

# 线程安全

## 产生原因

* 案例

```java
class Dome1 implements Runnable{
  // 线程共享的数据
    private int tick = 10;
    @Override
    public void run() {
        while (true){
            if(tick>=0){
                try{
                    // 模拟资源被抢占
                    Thread.sleep(10);
                }catch (Exception e){}
                System.out.println(Thread.currentThread().getName() + " run tick: "+tick-- );
            }else{
                break;
            }
        }
    }
}
public class Thread1 {

    public static void main(String[] args) {
        Dome1 dome1 = new Dome1();
        new Thread(dome1).start();
        new Thread(dome1).start();
        new Thread(dome1).start();
    }
}
```

结果会输出-1、-2 这就是线程安全。



多条语句在操作通过一个线程共享数据时，一个线程对多条语句只执行了一部分，还有部分没有执行完，
另一个线程参与进来，导致tick共享数据错误。

## 解决方案

对多条操作共享数据的语句，只能让一个线程执行完成，在执行过程中不允许其他线程参与执行，可以采用以下方法。

### synchronized (Object)同步代码块

写法：

```
synchronized (Object){
	...同步代码块
}
```

Object 如同锁，持有锁的才可以进入，没有锁的线程即使抢占到了CPU执行权也无法进入。这就好比一个房间只能容纳一个人工作，进去一个人将门反锁上避免其他人来抢占房间。而一个人占用一个房间资源工作是比较耗费资源的。

实现同步代码需要有以下前提

1. 必须要有两个或两个以上的线程
2. 必须是多线程使用同一个锁

```java
class Dome1 implements Runnable{
    private int tick = 10;
    Object obj = new Object();
    @Override
    public void run() {
        while (true){
            // 添加同步代码，obj 就是锁。
            synchronized (obj){
                if(tick>=0){
                    try{
                        // 模拟资源被抢占
                        Thread.sleep(10);
                    }catch (Exception e){}
                    System.out.println(Thread.currentThread().getName() + " run tick: "+tick-- );
                }else{
                    break;
                }
            }
        }
    }
}
```



### synchronized 同步函数 

同步函数是将synchronized 作为函数修饰符使用的锁的当前函数的this。如果函数是静态方法，使用的锁不是this，因为静态方法中不可以定义this，而是使用的该方法所在的类名.class

```java
class Dome1 implements Runnable{
    private static int tick = 10;
    Object obj = new Object();
    @Override
    public void run() {
        while (true){
            Dome1.test();
            synchronized(obj){
                if(tick>=0){
                    try{
                        // 模拟资源被抢占
                        Thread.sleep(10);
                    }catch (Exception e){}
                    System.out.println(Thread.currentThread().getName() + " run tick: "+tick-- );
                }else{
                    break;
                }
            }
        }
    }
    public synchronized static void test(){
        if(tick>=0){
            try{
                // 模拟资源被抢占
                Thread.sleep(10);
            }catch (Exception e){}
            System.out.println(Thread.currentThread().getName() + " test tick: "+tick-- );
        }
    }
}
```

案例执行后会出现输出-1的情况（没有出现可以多执行两次），因为静态方法test 和同步代码块使用的锁不是同一个。只需要修改同步代码块synchronized(obj)锁为 synchronized(Dome1.calss)。

### Lock 锁机制

通过创建 Lock 对象，采用lock() 加锁，unLock() 解锁，来保护指定的代码块

```java
class Dome2 implements Runnable{
    private int tick = 10;
  // 创建Lock对象
    Lock lock = new ReentrantLock();
    @Override
    public void run() {
        while (true){
            try{
                // 上锁
                lock.lock();
                if(tick<0){
                    break;
                }
                System.out.println(Thread.currentThread().getName() + " run tick: "+tick-- );

            }catch (Exception e){
                e.printStackTrace();
            }finally {
                // 解锁
                lock.unlock();
                try{
                    // 模拟资源被抢占
                    Thread.sleep(10);
                }catch (Exception e){}
            }
        }
        System.out.println(Thread.currentThread().getName()+"结束");
    }
}
```

## 总结

1. synchronized 是在JVM层面实现的，因此系统可以监控锁的释放与否
2. ReentrantLock 是使用代码实现，系统无法自动释放锁，需要在代码中的finally子句中显示释放锁lock.unlock();。
3. 在并发两比较小的情况下，建议使用synchronized ；如果并发量比较大高的情况下，性能往往没有ReentrantLock 好，此时使用ReentrantLock 是不错的方案
4. 使用synchronized 代码块时,可以与wait()、notify()、nitifyAll()一起使用，从而进一步实现线程的通信,需要注意的是，wait()和notify()必须在synchronized代码块中调用。





