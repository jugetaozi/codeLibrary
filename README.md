## GitBook 简介

- [GitBook 官网](https://link.jianshu.com?t=https%3A%2F%2Fwww.gitbook.com)
- [GitBook 文档](https://link.jianshu.com?t=https%3A%2F%2Fgithub.com%2FGitbookIO%2Fgitbook)

## GitBook 准备工作

### 安装 Node.js

GitBook 是一个基于 Node.js 的命令行工具，下载安装 [Node.js](https://link.jianshu.com?t=https%3A%2F%2Fnodejs.org%2Fen)，安装完成之后，你可以使用下面的命令来检验是否安装成功。

```
$ node -v
v7.7.1
```

### 安装 GitBook

输入下面的命令来安装 GitBook。

```
$ npm install gitbook-cli -g
```

安装完成之后，你可以使用下面的命令来检验是否安装成功。

```
$ gitbook -V
CLI version: 2.3.2
GitBook version: 3.2.3
```

更多详情请参照 [GitBook 安装文档](https://link.jianshu.com?t=https%3A%2F%2Fgithub.com%2FGitbookIO%2Fgitbook%2Fblob%2Fmaster%2Fdocs%2Fsetup.md) 来安装 GitBook。

### 安装 GitBook 编辑器

去 [GitBook 官网](https://link.jianshu.com?t=https%3A%2F%2Fwww.gitbook.com%2F) 下载 GitBook 编辑器；如果是 Mac 用户且安装过 `brew cask` 的话可以使用 `brew cask install gitbook-editor` 命令行来安装 GitBook 编辑器。

## 先睹为快

GitBook 准备工作做好之后，我们进入一个你要写书的目录，输入如下命令。

```
$ gitbook init
warn: no summary file in this book
info: create README.md
info: create SUMMARY.md
info: initialization is finished
```

可以看到他会创建 README.md 和 SUMMARY.md 这两个文件，README.md 应该不陌生，就是说明文档，而 SUMMARY.md 其实就是书的章节目录，其默认内容如下所示：

```
# Summary

* [Introduction](README.md)
```

接下来，我们输入 `$ gitbook serve` 命令，然后在浏览器地址栏中输入 `http://localhost:4000` 便可预览书籍。

效果如下所示：



![img](https:////upload-images.jianshu.io/upload_images/1944467-80941aa796f964d9?imageMogr2/auto-orient/strip%7CimageView2/2/w/1000/format/webp)



运行该命令后会在书籍的文件夹中生成一个 `_book` 文件夹, 里面的内容即为生成的 html 文件，我们可以使用下面命令来生成网页而不开启服务器。

```
gitbook build
```

下面我们来详细介绍下 GitBook 目录结构及相关文件。

## 目录结构

GitBook 基本的目录结构如下所示：

```
.
├── book.json
├── README.md
├── SUMMARY.md
├── chapter-1/
|   ├── README.md
|   └── something.md
└── chapter-2/
    ├── README.md
    └── something.md
```

下面我们主要来讲讲 book.json 和 SUMMARY.md 文件。

### book.json

该文件主要用来存放配置信息，我先放出我的配置文件。

```
{
    "title": "Blankj's Glory",
    "author": "Blankj",
    "description": "select * from learn",
    "language": "zh-hans",
    "gitbook": "3.2.3",
    "styles": {
        "website": "./styles/website.css"
    },
    "structure": {
        "readme": "README.md"
    },
    "links": {
        "sidebar": {
            "我的狗窝": "https://blankj.com"
        }
    },
    "plugins": [
        "-sharing",
        "splitter",
        "expandable-chapters-small",
        "anchors",

        "github",
        "github-buttons",
        "donate",
        "sharing-plus",
        "anchor-navigation-ex",
        "favicon"
    ],
    "pluginsConfig": {
        "github": {
            "url": "https://github.com/Blankj"
        },
        "github-buttons": {
            "buttons": [{
                "user": "Blankj",
                "repo": "glory",
                "type": "star",
                "size": "small",
                "count": true
                }
            ]
        },
        "donate": {
            "alipay": "./source/images/donate.png",
            "title": "",
            "button": "赞赏",
            "alipayText": " "
        },
        "sharing": {
            "douban": false,
            "facebook": false,
            "google": false,
            "hatenaBookmark": false,
            "instapaper": false,
            "line": false,
            "linkedin": false,
            "messenger": false,
            "pocket": false,
            "qq": false,
            "qzone": false,
            "stumbleupon": false,
            "twitter": false,
            "viber": false,
            "vk": false,
            "weibo": false,
            "whatsapp": false,
            "all": [
                "google", "facebook", "weibo", "twitter",
                "qq", "qzone", "linkedin", "pocket"
            ]
        },
        "anchor-navigation-ex": {
            "showLevel": false
        },
        "favicon":{
            "shortcut": "./source/images/favicon.jpg",
            "bookmark": "./source/images/favicon.jpg",
            "appleTouch": "./source/images/apple-touch-icon.jpg",
            "appleTouchMore": {
                "120x120": "./source/images/apple-touch-icon.jpg",
                "180x180": "./source/images/apple-touch-icon.jpg"
            }
        }
    }
}
```

相信很多节点自己也能猜到是什么意思，我还是简单介绍下吧。

#### title

本书标题

#### author

本书作者

#### description

本书描述

#### language

本书语言，中文设置 "zh-hans" 即可

#### gitbook

指定使用的 GitBook 版本

#### styles

自定义页面样式

#### structure

指定 Readme、Summary、Glossary 和 Languages 对应的文件名

#### links

在左侧导航栏添加链接信息

#### plugins

配置使用的插件

#### pluginsConfig

配置插件的属性

### SUMMARY.md

这个文件主要决定 GitBook 的章节目录，它通过 Markdown 中的列表语法来表示文件的父子关系，下面是一个简单的示例：

```
# Summary

* [Introduction](README.md)
* [Part I](part1/README.md)
    * [Writing is nice](part1/writing.md)
    * [GitBook is nice](part1/gitbook.md)
* [Part II](part2/README.md)
    * [We love feedback](part2/feedback_please.md)
    * [Better tools for authors](part2/better_tools.md)
```

这个配置对应的目录结构如下所示:



![img](https:////upload-images.jianshu.io/upload_images/1944467-de97699c5919469e?imageMogr2/auto-orient/strip%7CimageView2/2/w/604/format/webp)



我们通过使用 `标题` 或者 `水平分割线` 将 GitBook 分为几个不同的部分，如下所示：

```
# Summary

### Part I

* [Introduction](README.md)
* [Writing is nice](part1/writing.md)
* [GitBook is nice](part1/gitbook.md)

### Part II

* [We love feedback](part2/feedback_please.md)
* [Better tools for authors](part2/better_tools.md)

---

* [Last part without title](part3/title.md)
```

这个配置对应的目录结构如下所示:



![img](https:////upload-images.jianshu.io/upload_images/1944467-e80d5e46997e5eb4?imageMogr2/auto-orient/strip%7CimageView2/2/w/596/format/webp)



## 插件

GitBook 有 [插件官网](https://link.jianshu.com?t=https%3A%2F%2Fplugins.gitbook.com%2F)，默认带有 5 个插件，highlight、search、sharing、font-settings、livereload，如果要去除自带的插件， 可以在插件名称前面加 `-`，比如：

```
"plugins": [
    "-search"
]
```

如果要配置使用的插件可以在 book.json 文件中加入即可，比如我们添加 [plugin-github](https://link.jianshu.com?t=https%3A%2F%2Fplugins.gitbook.com%2Fplugin%2Fgithub)，我们在 book.json 中加入配置如下即可：

```
{
    "plugins": [ "github" ],
    "pluginsConfig": {
        "github": {
            "url": "https://github.com/your/repo"
        }
    }
}
```

然后在终端输入 `gitbook install ./` 即可。

如果要指定插件的版本可以使用 plugin@0.3.1，因为一些插件可能不会随着 GitBook 版本的升级而升级。