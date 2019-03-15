webpack推荐插件说明
* ProgressPlugin（webpack自带）：用于统计打包进度
* IgnorePlugin（webpack自带）：忽略本地的一些模块
* CleanWebpackPlugin：清理指定目录的文件
* DllPlugin（webpack自带）：预打包文件
* babel-loader: 负责es6语法转化
* babel-preset-env: 包含es6、7等版本的语法转化规则
* babel-polyfill: es6内置方法和函数转化垫片
* babel-plugin-transform-runtime: 避免polyfill污染全局变量
* 