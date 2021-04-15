# 线程的定义Runnable和Thread

首先我们先来简单了解下进程和线程之间的关系。

进程是一个正在执行中的程序，每一个进程执行都有一个执行的顺序该顺序就是一个执行路径（控制单元）。

线程是进程中一个独立的控制单元，线程在控制着进程的执行。

简而言之一个进程中至少有一个线程。

## 线程定义

```java
/**
 * 方法一：继承Thread 方式
 * 调用：new Dome().start;
 */
class Dome extends Thread{
    public void run(){
        for(int i =0;i<=60;i++){
            System.out.println(this.getName() + " run -- "+i );
        }
    }
}
/**
 * 方法二：实现Runnable接口
 * 调用：new Thread(new Dome1())
 */
class Dome1 implements Runnable{

    @Override
    public void run() {
        for(int i =0;i<=60;i++){
            System.out.println(Thread.currentThread().getName() + " run -- "+i );
        }
    }
}
public class Thread1 {
    public static void main(String[] args) {
        // 第一种调用方法
        Dome dome = new Dome();
        dome.start();
        // 第二种调用方法
        Dome1 dome1 = new Dome1();
        new Thread(dome1).start();
        for (int i=0;i<=40;i++){
            System.out.println("main run -- "+i );
        }
    }
}
```

实现方式和继承方式的区别

* 实现Runnable 接口避免了单一继承的局限性。
* Runnable 可以实现多个相同程序代码的线程区共享同一个资源，而Thread不可以
* 在定义线程时，建议实现Runnable接口



## 为什么不直接调用run方法

在执行线程的时候需要考虑当前进程资源是否空闲，如进程不空闲则线程就需排队等候进程通知执行，start 方法就体现出了基本价值。其次是如果直接执行 run 方法就和调用方法没有什么区别。

**注：**在JAVA 虚拟机中至少保持了两个线程 主线程和垃圾回收线程





