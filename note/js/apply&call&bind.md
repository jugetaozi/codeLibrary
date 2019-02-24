```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
<script>
	//bind apply call的普通使用
	console.log("这里是bind apply call的普通使用")
	var o={
		funName:"o name",
		fun:function(args){
			console.log(this.funName+args)
		}
	}
	o.fun(" args");
	var o_apply={
		funName:"apply name",
	}
	o.fun.apply(o_apply,[" args"])
	var o_call={
		funName:"call name",
	}
	o.fun.call(o_call," args");
	var o_bind={
		funName:"bind name",
	}
	o.fun.bind(o_bind)(" args");
</script>
<script>
	//将类数组转为数组
	console.log("这里是将类数组转为数组")
	function args(a,b){
		console.log(arguments)
		console.log(arguments instanceof Array)
		var arr=Array.prototype.slice.call(arguments,0);
		console.log(arr instanceof Array)
		console.log(arr)
	}
	args(1,2)
</script>
<script>
	//toString() 方法
	console.log("这里是toString方法使用")
	console.log(Object.prototype.toString())
	console.log(Object.prototype.toString.call([]))
</script>
</body>
</html>
```