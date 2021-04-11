# Singleton（单例）模式1

Singleton （单例）模式被熟知的原因是因为它限制了类的实例化次数----只能实例一次。Singleton 模式可分为懒汉式、饿汉式、注册式等多种，在此已简单的懒汉式、饿汉式讲起



## 概念

### 使用意图

保证一个类在全局中只有一个实例，且可全局访问。

### 实现

通过一个方法创建一个类的实例

### 写法

饿汉式：直接创建类的实例化，也就是用空间换时间，一上来就实例对象

懒汉式：在需要的时候在创建，是用时间换空间，按需要来完成第一次的实例对象

### 代码演示

* 场景：封装一个利用navigator.userAgent 来判断浏览器

```javascript
window.browser=function(){
  let names = ['Opera','Firefox','Chrome'];//浏览器集合
  let userAgent = navigator.userAgent;// 获取userAgent
  let name = "";//浏览器名称
  let instance=null;// 需要换成的实例变量
  for(let i of names){
    if(userAgent.indexOf(i)>-1){
      name = i;
      break;
    }
  }
  function init(){this.name = name}
  init.prototype={
    isChrome:function(){return this.name===names[2]},
    isOpera:function(){return this.name===names[0]},
    isFirefox:function(){return this.name===names[1]},
  }
  /**
  * 饿汉式 : 
  */
  return {
    getInstance:function(){
      if(!instance){
        instance = new init()
      }
      return instance
    }
  }
}()
```





