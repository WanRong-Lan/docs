# 一场连锁反应的BUG

### 任务背景

修改存量代码，实现过滤出指定的数据。

```java
// Dome
@RequestMapping(value="/url")
publick Object testController(HttpServletRequest request){
  ...
  return Object;
}
```

前端ajax 请求是通过公共方法，且header没有提供动态配置的入参（写死的），导致所有的ajax请求的content type 是 application/json（这将是问题根源）。同时服务端的controller 方法不修改入参，之前写的如何就保留（修改后工作量大）。这就是项目的限制

## 实现功能

### 第一版

很理想的只是加了上getParameter 获取post请求参数,。

```java
// Dome
@RequestMapping(value="/url")
publick Object testController(HttpServletRequest request){
  String id = request.getParameter("id");// 嗯没错大家都这样写的 copy过来就没问题了。
  ...
  return Object;
}
```

本地调试发现 id 为空。why ???? 是环境问题吗，还是咋的了。大家不都这样写的吗？

#### 问题1原因

拜访度娘后明白了。

根据Servet 规范需要满足 以下条件则请求体 中的表单数据，将填充在 HttpServletRequest 的parameter 集合中

 1. 这个请求是HTTP/HTTPS请求
  2. 请求方法是POST（querystring无论是否POST都将被设置到parameter中）
  3. 请求类型（Content-Type） 是application/x-www-form-urlencoded

#### 解决方案

通过获取request的请求body 的流来接触参数。

```java
private String getBodyId(HttpServletRequest request){
  String id = "";
  try{
    ServletInputStream sis = request.getinputStream();
    StringBuilder sb = new StringBuilder();
    byte[] buf = new byte[1024];
    int len=0;
    while((len=sis.read(buf))!=-1){
      sb.append(new String(buf,0,len));
    }
    Map str = JSONbject.parseObject(sb.toString());
    id=(String)str.get("id");
  }catch(IOException e){
    
  }
  return id;
}
```

### 第二版

```java
// Dome 此次修改 Controller 和 Service 的修改点是一致的，可以说是完全copy。
@RequestMapping(value="/url")
publick Object testController(HttpServletRequest request){
  String id = getBodyId(request);// 嗯没错大家都这样写的 copy过来就没问题了。
  Object ret = Service(request);
  ...
  return Object;
}
```

解决好了，本地调试OK，但测试反馈存在部分账号失败。无奈的我又被QA追两天后，功夫不负有心人终于找到答案。

经过分析，是Service 通过request.getinputStream() 获取到 null，百度得知 [HttpServletRequest的输入流只能读取一次](https://www.cnblogs.com/xd502djj/p/11869679.html)，而且 Service 暴露的接口只有request 对象又不能进行修改。

这次排查问题，前前后后总共浪费了3天时间，虽然第二天又向团队报风险并分配了一个高级帮忙（结果还是不理想）。最后还是按照自己的猜测并测试后确定问题点。

## 总结

1. 排查方法单一，需要丰富排查手段，特别是刚接触一个跨地区跨部门协作开发的大型项目。需要尽快的熟悉本地自测联调方法。事后自己摸索了一套不需要上游服务开发部门提供信息就可以进行本地开发联调自测，并被团队采用。
2. Java 基础薄弱，比如在HttpServletRequest 的输入流只能读一次的问题上居然浪费了3天时间。
3. 不能过度依赖外部的支持要坚定自己的想法做下去，在第二天团队分配了一个高级协助的时有沟通第一天排查后的猜想但是被反驳了（因为方法是一模一样），之后我就放弃，并把精力放在了下一迭代开发。
4. 粗心大意了，在 Controller 和 Service 中的修改点一致，在本地联调自测时只跑通了Controller 里的方法忽略了Service 。以后 代码修改到哪，自测就要到那里。

