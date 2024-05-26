### 1. 业务背景

研究 nginx 容器部署时，创建一个容器的命令过长，于是想把它改造成配置脚本。

Docker 要素： 1. 镜像； 2. 容器。

原以为写 Dockerfile 文件就可以了，可是发现 Dockerfile 文件只能构建镜像， 不能启动容器。

但容器管理技术 docker-compose 符合需求， 所以采取了写 docker-compose.yml 配置的方案。

### 2. Nginx 容器的 docker-compose.yml

> 注意： nginx.conf 文件需要提前准备好！

```yaml
# docker-compose.yml

services:
  nginx:
    image: nginx
    container_name: webserver
    ports:
      - '80:80'
    volumes:
      - /home/programs/nginx/logs:/var/log/nginx
      - /home/programs/nginx/html:/usr/share/nginx/html:ro
      - /home/programs/nginx/nginx.conf:/etc/nginx/nginx.conf:ro
    restart: always
```

### 3. Nginx 容器的启动

```shell
docker compose up -d
```

### 4. Nginx 服务配置

按照步骤1、2、3 的流程执行后，

nginx 服务就已经启动了，

把 vue 或 react 等类似框架的构建产物放入挂载目录 html 中即可实现前后端分离项目的前端部署。

对于前端部署要注意路由的分类：

1. 前端路由（哈希路由，前端js控制）；
2. 后端路由（后端服务控制）；

对于浏览器中的 url， 在前端路由模式下 url 哈希部分的变化是不会向后端发起请求的，
所以叫前端路由，此时在浏览器刷新页面时不会出现任何异常；但如果是后端路由的话，url
的任何改变都会向后端重新发起请求，如果遇到路由重定向且后端路由写的不完善的情况，
则刷新页面后容易出现 404 的 bug。

```shell
# nginx 配置一般在默认的 nginx.conf 文件的 http 模块下添加所需的 server 模块。
http {
  include       /etc/nginx/mime.types;
  default_type  application/octet-stream;


  log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
  '$status $body_bytes_sent "$http_referer" '
  '"$http_user_agent" "$http_x_forwarded_for"';

  access_log  /var/log/nginx/access.log  main;

  sendfile        on;
  #tcp_nopush     on;

  keepalive_timeout  65;

  #gzip  on;

  include /etc/nginx/conf.d/*.conf;

  # section start  charset 一定要在 http 中，其他地方无效！！！
  charset utf8;
  server {

    server_name localhost;

    location / {
      root /;
      index index.html index.htm;
      try_files $uri $uri/ /index.html;  # 功能点1：解决刷新页面 404 问题
    }

    location /dev/ {
      proxy_pass http://abc.com/;         # 功能点2：设置代理。如果【有后缀 /】 表示代理路径中会删除 /dev，否则保留 /dev 进行拼接全路径。
    }
  }
}

```
