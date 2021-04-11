# 练习 - 数组排序

## 选择排序

* 工作原理：首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置，然后，再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。以此类推，直到所有元素均排序完毕。

* 实现思路
  1. 初始状态：无序数组R[0-n-1]
  2. 设置一个变量i，让i 从0至n-2 循环 。0-i 为已排序区间，i记为k
  3. 在未排序区间R(i+1 至 n-1)遍历与R[k]对比，满足对比条件则k 等于对比元素坐标。
  4. 判断k不等于i则两元素位置调换，以此重复。
* 算法性能
  1. 交换次数：交换操作介于 0 和 (n - 1)次之间
  2. 比较次数：比较操作为 n (n - 1） / 2 次之间
* 参考代码

```java
    /**
     * 选择排序
     * @param arr
     */
    public void selectSort1(int[] arr){
        for(int i=0,len=arr.length;i<len;i++){
            int k = i;//默认i为最小数索引
            for(int j = i+1;j < len; j++){//未排序区间
                if(arr[k]<arr[j]){// 未排序区间与最小元素k对比
                    k=j;
                }
            }
            swap(arr,i,k); //数组位置互换
        }
    }
    /**
     * int 数组两元素位置互换
     * @param arr int 数组
     * @param a 元素坐标
     * @param b 元素坐标
     */
    private static void swap(int[] arr,int a,int b){
        int item = arr[a];
        arr[a]=arr[b];
        arr[b]=item;
    }
```



## 冒泡排序

* 工作原理：依次比较两个相邻的元素，如果顺序错误就把它们交换过来。直到没有相邻的元素需要交换，因为越小的元素会经由交换慢慢“浮”到数列的顶端（升序或降序排列）就像水中气泡慢慢的向上浮起，故名“冒泡排序”。
* 实现思路：
  1. 初始状态：无序数组R[0-n-1]
  2. 从R[0]元素起向后依次比较每一对相邻元素，若逆序则交换位置。
  3. 对所有元素重复以上步骤，直到最后一个元素。
* 参考代码

```java
    public void bubbleSort1(int[] arr){
      // 需要排序执行的次数 n-1次
        for (int i=0,len=arr.length;i<len-1;i++){
            int j=0;
            while (j<len-1-i){
                if(arr[j]>arr[++j]){
                    swap(arr,j-1,j);
                }
            }
        }
    }
```



