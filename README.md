# 说明
记录项目的常规创建流程，免去每次创建项目都要去各个官网查怎么集成配置第三方包的烦恼，方便自行开发。

# 用法
1. 利用脚手架工具创建项目已是常态，虽然它提供了方便，但脚手架创建项目的默认配置并不一定是我们需要的，经常需要修改或删除部分配置;
2. 为了一劳永逸，我把利用脚手架创建的项目进行自定义修改，做成更干净、拿来即用的模板，并打上 tag;
3. 后续开发时搭配 degit 的功能，即可快速获取想要的项目模板.

# 示例
例如，想获取 vue 基础项目模板，即可使用如下命令：

```bash
# npx degit user/repo#tag my-project

npx degit topfivegao/templates#vue-base vue-base
```

# git 学习记录
因为这里要用到 git 的 tag 功能，用的时候出了点问题，就来记录下吧。
```bash
# git tag 和 branch 切换命令都是 git checkout [tagName/branchName]
# 但 tag 是静态的，是某一次的 git commit 的引用，是只读的，不能更新修改
# branch 则是动态的，是当前分支的引用，可以更新修改
```