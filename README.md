# scrat后端渲染Webapp模式示例项目

> 这是一个后端渲染模式与webapp体验完美结合的项目

首次渲染是后端输出，页面切换是ajax，体验非常流畅！

在线运行效果：http://scrat-pagelet-demo-fouber.c9.io/

运行说明：

## 安装scrat (v0.4.6或以上版本)

```bash
npm install -g scrat
```

## 下载此项目

```bash
git clone https://github.com/fouber/scrat-pagelet-demo.git
```

## 构建并发布项目

```bash
cd scrat-pagelet-demo
scrat release -cwL
```

## 启动本地调试服务器

> 注意，这里最好新开一个命令窗口，不要关闭上一步中的命令，它在监听文件修改，并帮助你自动刷新浏览器！

```bash
scrat server start
```

## 访问页面

http://localhost:5000/
