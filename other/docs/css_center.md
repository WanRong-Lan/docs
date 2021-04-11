# CSS 居中大法

## 利用 transform 达到居中效果

```html
<div class="transform_center">
	<div class="center_div"></div>
</div>
<style>
  .transform_center{
    position: relative;
    width: 300px;
    height: 300px;
    background-color: #eee;
  }
  .transform_center .center_div {
    width: 100px;
    height: 100px;
    background-color: #6d6d6d;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
```

center_div 先利用 top 50% 和 left 50% 在利用 transform: translate(-50%, -50%); 基于 center_div 高度和宽度向左 向上 移动50%，达到上下左右居中效果

## 利用margin 达到居中效果

```html
<div class="margin_center">
  <div class="center_div"></div>
</div>
<style>
  .margin_center{
    position: relative;
    width: 300px;
    height: 300px;
    background-color: #eee;
  }
  .margin_center > .center_div {
    width: 100px;
    height: 100px;
    background-color: #6d6d6d;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -50px;
    margin-left: -50px;
  }
</style>
```



## 利用display:flex 达到居中效果

```html
<div class="margin_center">
    <div class="center_div"></div>
</div>
<style>
    .margin_center{
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #eee;
    }
    .margin_center > .center_div {
        width: 100px;
        height: 100px;
        background-color: #6d6d6d;
    }
</style>
```

## 利用display: grid 达到居中效果

```
<h3>利用grid 达到居中效果</h3>
<div class="margin_center">
    <div class="center_div"></div>
</div>
<style>
    .margin_center{
        display: grid;
        justify-items: center;
        align-items: center;
        background-color: #eee;
    }
    .margin_center > .center_div {
        width: 100px;
        height: 100px;
        background-color: #6d6d6d;
    }
</style>
```

