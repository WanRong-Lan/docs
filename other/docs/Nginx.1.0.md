# Nginx之搭建简单服务器

安装教程在此不多说了，度娘会告诉我们的。

本篇主要是简单了说下Nginx 安装后怎么搭建一个简单的服务 

## 总配置文件

* 文件路径：安装目录/nginx/nginx.conf
* 文件内容说明

```nginx
#运行用户，默认即是nginx，可以不进行设置
user  nginx;
#Nginx进程，一般设置为和CPU核数一样
worker_processes  auto;   
#错误日志存放目录
error_log  /var/log/nginx/error.log warn;
#进程pid存放位置
pid        /var/run/nginx.pid;

events {
    worker_connections  1024; # 单个后台进程的最大并发数
}

http {
    include       /etc/nginx/mime.types;   #文件扩展名与类型映射表
    default_type  application/octet-stream;  #默认文件类型
    #设置日志模式
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;   #nginx访问日志存放位置

    sendfile        on;   #开启高效传输模式
    #tcp_nopush     on;    #减少网络报文段的数量

    keepalive_timeout  65;  #保持连接的时间，也叫超时时间

    #gzip  on;  #开启gzip压缩

    include /etc/nginx/conf.d/*.conf; #包含的子配置项位置和文件
}
```

服务配置文件主要放在/etc/nginx/conf.d/目录下，以.conf	的后缀配置server 的相关配置。

关于总配置文件的更细化的内容在 ---- 后续更新



## 子配置文件

文件目录： /etc/nginx/conf.d/default.conf

此文件主要配置的是http的子模块 server的配置，服务代理或访问路径都在这里配置。以下配置的是访问静态页面的配置内容只需要把html页面放在root 目录内。

```nginx
server {
    listen       80;   #配置监听端口
    server_name  localhost;  //配置域名

    location / {
        root   /usr/share/nginx/html;     #服务默认启动目录
        index  index.html index.htm;    #默认访问文件
    }

    #error_page  404              /404.html;   # 配置404页面

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;   #错误状态码的显示页面，配置后需要重启
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

}
```

## 启动、重启、关闭

1. 启动

```shell
nginx    #后续重启的话，只能通过强制删除进程，才能成功
#或者
systemctl start nginx.service
```

2. 重启

```shell
systemctl restart nginx.service
```

3. 关闭

```shell
# 三选一
nginx -s quit    # 温和停止
nginx -s stop    # 强硬停止
killall nginx    # 野蛮停止，杀死进程
# 或者
systemctl stop nginx.service
```

4. 查看Nginx进程

```shell
ps aux | grep nginx
```

> PS :每次更改配置文件，都需要重启nginx服务。修改配置后可以通过 nginx -s reload 命令使配置文件生效。









