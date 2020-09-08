# 两数之和 <!-- {docsify-ignore-all} -->

## 题目

给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。

> 题目来源：[力扣](https://leetcode-cn.com/problems/two-sum)

## 审题

1. 题目提供整数数组 nums 和目标值 target，目的是找出目标值target=nums中两个不相同元素之和。返回两个元素的下标

2. 场景假设：每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。这个假设很重要，首先是目标值target 会对应一个答案

## 示例

综合审题结果给出两种测试用例

```
1. 给定 nums = [2,7,11,15] 和 target = 9，结果返回[0，1]

2. 给定 nums = [2,7,7,11,15] 和 target = 14，结果返回[1,2]

3. 给定 nums = [2,7,7,11,15] 和 target = 18，结果返回[1,3]
```

## 解题

### 1. 暴力方法（两层遍历嵌套）

两层遍历计算每两个元素之和，思路来源于冒泡排序

```javascript
var twoSum = function(nums, target) {
    const len = nums.length;
    for(let i=0;i<len-1;i++){
        const item = nums[i];
        for(let j=i+1;j<len;j++){
            if(item+nums[j]===target){
                return [i,j];
            }
        }
    }
};
```

### 2.0 检索数组中差值元素

遍历计算每个元素和目标值之差，思路：根据题目逆推出target-nums[x]=nums[y] (x和y分别是nums的元素坐标)，那么我们要检索nums数组中的nums[y]位置。

```javascript

var twoSum = function(nums, target) {
    let len = nums.length-1;
   while(len>0){
        let shortIndex = nums.indexOf(target-nums[len]);
        if(shortIndex>-1 && shortIndex!=len){
            return [shortIndex,len]
        }
        --len;
    }
};
// 用递归方法
var twoSum = function(nums, target, len=nums.length-1){
  let shortIndex = nums.indexOf(target-nums[len]);
   if(shortIndex>-1 && shortIndex!=len){
      return [shortIndex,len]
    }
  return twoSum(nums,target,--len)
}


```

### 3.0 利用Object做差值索引

利用Object做差值索引，其实就是2.0方案中把查询差值在nums中的坐标的检索优化。

```javascript
// 执行效率提高了，但是内存加大了
var twoSum = function(nums, target){
   let map = {}
   for(let i in nums){
       const item = nums[i]
       if(map[target-item]>=0){
           return [map[target-item],i]
       }
       map[item] = map[item] || i// 过滤调相同值元素坐标取最早元素
   }
}

// 递归方法,内存消耗比上面一个方案略大
var twoSum = function(nums, target, i=0, map={}){
    if(map[target-nums[i]]>=0){
        return [map[target-nums[i]],i]
    }
    map[item] = map[item] || i;
    i++;
    return twoSum(nums, target,i,map)
}
```

## 总结

3.0同1.0和2.0在数组检索的效率上有显著的提升，但因3.0方案在执行过程中创建了一个Object对象作为缓存数据，内存消耗比前两个方案要大。

1.0和2.0方案相比较内存和执行效率都不相上下，唯独代码简洁和可读性上的差距较大。
