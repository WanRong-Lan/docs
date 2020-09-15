# CSS 兼容问题收集  <!-- {docsify-ignore-all} -->

## -webkit-fill-available

* 场景：A 页面 用iframe 嵌套B页面，B页面不定高。所以A页面开发人员 在iframe 上添加自动填充样式 -webkit-fill-available。A、B页面的开发人员分属不同公司部门。

* 在部分客户端机型存在无法自动填充，或填充了但B页面上的click事件无法触发

* 解决方案：A页面 定义一个window.setHeight(height) 方法。 B页面通过 window.parent.setHeight() 调用A页面的方法
