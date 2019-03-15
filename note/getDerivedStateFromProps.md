```javascript
static getDerivedStateFromProps (props, state){
  return {
    state:'update'
  }
}

getDerivedStateFromProps  每次props改变或者mounting阶段会被触发  必须返回一个state 静态方法 不可以调用this

getSnapshotBeforeUpdate () {//很关键的，我们获取当前rootNode的scrollHeight，传到componentDidUpdate 的参数perScrollHeight
       return this.rootNode.scrollHeight;
}
componentDidUpdate (perProps, perState, perScrollHeight) {//getSnapshotBeforeUpdate返回的值成为componentDidUpdate的第三个参数
       const curScrollTop= this.rootNode.scrollTop;
       if (curScrollTop < 5) return ;
       this.rootNode.scrollTop = curScrollTop + (this.rootNode.scrollHeight  - perScrollHeight);
       //加上增加的div高度，就相当于不动
}

```