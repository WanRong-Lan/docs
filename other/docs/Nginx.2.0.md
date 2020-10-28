# Nginx 常用配置

在 [Nginx之搭建简单服务器](./docs/Nginx.1.0.md)初略的讲解到 总配置文件 nginx.conf  将详细的讲解Nginx常用的配置项目可以满足日常使用。

### Nginx 配置结构

首先来了解下nginx.conf 中的内容都包含哪些

```nginx
... # 全局块
events { # events 块 
    ...
}

http { # html 块
  ...
  server{ # server块 
    ...
    location{ # location 块
     	... 
    }
  }
}
```

1. 全局块的配置也就是全局配置，它影响nginx全局的指令。参考：[Nginx 主模块](https://www.nginx.cn/doc/core/mainmodule.html)
2. events 块配置影线nginx 服务器与用户的网络连接相关的配置 。参考：[Nginx 事件模块](https://www.nginx.cn/doc/core/events.html)
3. http 块 可以嵌套配置多个server（虚拟主机）相关的参数，同时配置与虚拟主机相关的配置内容。
4. server 块 是配置虚拟主机的相关配置，一个html块可以包含多个server块
5. location 块配置请求路由的处理

### 全局块配置

```nginx
user www users; # 指定www 用户和users用户组， 默认值为 nobody nobody
worker_processes 1 # Nginx 工作进程数量，一般设置为和CPU 核数一致
pid /var/log/nginx.pid # 进程ID存储日志文件

#错误日志存放目录,日志级别：[ debug | info | notice | warn | error | crit ]
error_log  /var/log/nginx/error.log warn；
# include可以用于任何地方，引入其他配置文件
include vhosts/*.conf;
```

* include 配置

Nginx配置文件中，include可以用于任何地方，以便增强配置文件的可读性，并且能够使得部分配置文件重新使用

### events 块配置





