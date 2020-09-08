
# 三数之和 <!-- {docsify-ignore-all} -->

## 题目

给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。

注意：答案中不可以包含重复的三元组。

> 来源：[力扣](https://leetcode-cn.com/problems/3sum)

## 审题

1. a + b + c = 0 可以推断 a,b,c 中 必须包含一个数小于等于 0  和另外一个数大于等于0，此等式才成立。假设 a<=0 且 c>=0，则 a<=b<=c
2. 题目提供n个整数数组则 n>=3
3. 结果不能包含重复的三元组，那么需要对数组进行排序 避免重复的三元组

## 示例

```
给定数组 nums = [-1, 0, -2, 2, -1, -4]，

满足要求的三元组集合为：
[
  [-2,0,2],
  [-1,-1,2]
]
```

## 解题

### 简单暴力

简单的三层嵌套循环，遇上大数据量的时候循环的次数将是指数级将大大影响运行。比如 [测试数据](https://leetcode-cn.com/submissions/detail/102485448/testcase/) 运行时间就超时了。

```javascript

var threeSum = function(nums) {
    let arr = [];
    let len = nums.length;
   
   // 数组长度小于3，无解
   if(len<3)return arr;

    // 升序
    nums.sort((a,b)=>a-b)
  
    let a=0,b,c; // 三个数的数组坐标
  
    // 遍历 a 从最小值开始
    for(a ;a<len-2;a++){
       // 最小值 a 大于 0 无解
        if(nums[a]>0) break;
        // 判断过滤掉相邻的两个相同元素
        if(a>0 && nums[a]===nums[a-1])  continue; // a 去重

        // 遍历 b
        b=a+1;
        for(b;b<len-1;b++){
            if(nums[a]+nums[b]>0) break;
            if(b>a+1&&nums[b]===nums[b-1]) continue; // b 去重

            // 遍历 c 从最大值开始
            c=len-1;
            for(c;c>b;c--){
                if(nums[c]<0) break; // c <0 无解
                if(nums[a]+nums[b]+nums[c]===0){
                    arr.push([nums[a],nums[b],nums[c]])
                    break;
                }
            }
        }
    }

    return arr;
};
```

### 优化

在暴力版的基础上改进 c 值的遍历， 因为a+b+c=0 且 c为最大值 可以推断出 c =｜a+b| 。那么当 a+b+c>0 时 c > |a+b| 那么c 需变小。同时改进了 b 的遍历，因为a<b<c 那么b 可以遍历到 c 的坐标减一的值。

```javascript
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    let arr = [];
    let len = nums.length;
   
   // 数组长度小于3，无解
   if(len<3)return arr;

    // 升序
    nums.sort((a,b)=>a-b)
  
    let a=0,b,c; // 三个数的数组坐标
  
    // 遍历 a 从最小值开始
    for(a ;a<len-2;a++){
       // 最小值 a 大于 0 无解
        if(nums[a]>0) break;
        // 判断过滤掉相邻的两个相同元素
        if(a>0 && nums[a]===nums[a-1])  continue; // a 去重

        // b 从a+1 开始遍历
        b=a+1;
        c=len-1; // c从最大值开始遍历
        for(b;b<c;b++){
            if(nums[a]+nums[b]>0) break;

            if(b>a+1&&nums[b]===nums[b-1]) continue; // b 去重

            // 当 a+b+c>0 则 c = |a+b|, 说明c 需要变小
            while(nums[a]+nums[b]+nums[c]>0) --c;
            if(nums[a]+nums[b]+nums[c]===0 && b<c) {
                arr.push([nums[a],nums[b],nums[c]])
            }
        }
    }

    return arr;
};
```

### 进阶

基于上一版本的内容扩展出了 当a +b+c<0 且 a<b<c  则 |b| < |a+c| , b的坐标变大。整体上 b 在逐渐变大，而c 在逐渐变小。同时优化了去重的判断由原先if 改成 while。

```javascript
var threeSum = function(nums) {
    let arr = [];
    let len = nums.length;
   
   // 数组长度小于3，无解
   if(len<3)return arr;

    // 升序排序
    nums.sort((a,b)=>a-b)
  
    let a=0,b,c; // 三个数的数组坐标
  
    while(a<len-2){

        // b 从a+1 开始遍历
        b=a+1;
        c=len-1; // c从最大值开始遍历
        while(b<c){
            let sum = nums[a]+nums[b]+nums[c];
            if(sum>0){ // sum > 0 则 c往左移一位
                --c;
            }else if(sum<0){ // sum < 0 则 b 往 右移一位
                ++b;
            }else{
                arr.push([nums[a],nums[b],nums[c]]);
                while(b<c && nums[b] === nums[++b]){} //b 去重
                while(b<c && nums[c] === nums[--c]){} //c 去重
            }
        }
         while(a<len-2 && nums[a]===nums[++a]){} // a 去重
    }
    return arr;
};
```

## 总结

a+b+c=0的条件下包含了很多隐藏信息，而这些隐藏的信息就是程序优化的方向。在生活工作中遇到的问题也隐藏了诸多的信息，而这些信息的挖掘和分析才是体现个人能力的真正时刻。
