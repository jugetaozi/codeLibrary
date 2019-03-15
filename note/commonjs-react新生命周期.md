axios 传输格式 'Content-Type': 'application/x-www-form-urlencoded',的情况下  post请求需要qs库来转化body
- 后台的返回码需要结合xhr的状态码来返回

-componentShouldComponent 
- getDerivedStateFromProps 在render和shouldComponentUpdate之前
- getSnapshotBeforeUpdate


所有代码都运行在模块作用域，不会污染全局作用域。
模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。要想让模块再次运行，必须清除缓存。
模块加载的顺序，按照其在代码中出现的顺序