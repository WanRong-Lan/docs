# JS ---- 观察者模式

## 前言

观察者模式是行为模式的一种，一个对象（目标）将依赖于它的对象，将有关状态的变化自动通知给它们（观察者）的对象。简单理解是一对多的依赖关系，让一个或多个观察者对目标的状态感兴趣，它们通过将自己依附在目标对象上并注册感兴趣的内容。

## 组成

* Subject（目标）

维护一系列的观察者，方便添加和删除观察者

* Observer（观察者）

为目标状态提供发生改变是需获得通知的对象提供一个更新接口

* ConcreteSubject（具体目标）

状态发生改变时，向Observer发出通知，存储ConcreteObserver的状态

* ConcreteObserver（具体观察者）

存储指向ConcreteSubject的引用，实现Observe的更新接口，是自身状态与目标的状态保持一致。



TODO：待补充例子便于理解



## 代码演示

```javascript
function ObserverList(){
  this.observer=[];
}
Observer.prototype={
  add:function(item){
    return this.observer.push(item);
  },
  length:function(){
    return this.observer.length;
  },
  removeIndexAt:function(index){
    if(index===0){
      return this.observer.shift();
    }else if(index=== this.observer.length-1){
      return this.observer.pop();
    }
  }
}

function Subject(){
  this.observers = new ObserverList();
}
Subject.prototype={
  addObserver:function(item){
    this.observers.add(item)
  },
  removerObserver:function(){
    this.observers.removeIndexAt(0);
  }
}
```



