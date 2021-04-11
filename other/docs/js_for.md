# for...in & for...of

## for...in

for...in 是ES5 的语法，用于对数组或者对象的属性名。

* 代码示例

```javascript
//遍历数组
let arr = ['A','B','C'];
for(let i in arr){
  console.log(i) // 输出数组下标（0，1，2）
}
//遍历对象
let obj = {
  name:'NAME',
  age:12
}
for(let key in obj){
  console.log(key) // 输出key值 （name,age）
}
//遍历原型
function people(name,age){
  this.name = name;
  this.age = age;
}
people.prototype={
  getName:function(){return this.name},
  getAge:function(){return this.age}
}
let people1 = new people('张三',24);
for(let k in people1){
  console.log(k); // 输出：// 输出：name，age，getName，getAge
}
```

* **总结**

1. 可遍历对象自身和继承过来可枚举属性以及对象从构造函数中继承过来的属性
2. for...in 以原始插入的顺序迭代对象的可枚举属性，而不可枚举属性忽略不迭代。
3. for...in 原理是 Object.keys() 返回给定对象中所有可枚举属性名的字符串数组

注解：可枚举属性：是指JS自定义属性。不可枚举属性指对象内置属性。如：数组中的length、function中的prototype

## for...of

是ES6语法，可迭代对象（包括  Array，Map，Set，String，TypedArray，arguments 对象等等）上创建一个迭代循环，调用自定义迭代钩子，并为每个不同属性的值执行语句

* **代码示例**

```javascript
let arr = ['A','B','C'];
for(let i of arr){
  console.log(i);// 输出：A,B,C
}

let str = 'abc';
for(let s of str){
  console.log(s);// 输出：a,b,c
}

let setNo = new Set([1,2,1,3,4,2,3]);
for(let sn of setNo){
  console.log(sn);//输出：1,2,3,4
}

function* foo(){
  yield 1;
  yield 2;
  yield 3;
}
for(let f of foo()){
  console.log(f);// 输出：1,2,3
}
```

* **总结**

1. for...of 遍历可迭代对象定义要迭代的数据，而非属性。
2. for...of可以使用的范围广，除开篇介绍中提及的之外还有Generator函数、具备Iterator接口的数据结构

> 注：Iterator接口的数据结构有：Array、Map、Set、String、TypedArray、arguments对象、NodeList对象

> 参考：[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of),

## 总结for...in 和for...of 

1. 无论是for...in还是for...of语句都是迭代一些东西。它们之间的主要区别在于它们的迭代方式。

for...in 语句以任意顺序迭代对象的可枚举属性。

for...of 语句遍历可迭代对象定义要迭代的数据。