var webUtil = {
	getService : function(uri) {
		var tokenId = $api.getStorage("tokenId");
		if (tokenId) {
			if (uri.indexOf("?tokenId=") < 0 && uri.indexOf("&tokenId=") < 0) {
				if (uri.indexOf("?") > 0) {
					uri += "&tokenId=" + tokenId;
				} else {
					uri += "?tokenId=" + tokenId;
				}
			}
		}
		if (uri.indexOf("?") >= 0) {
			uri += "&deviceId=" + api.deviceId;
		} else {
			uri += "?deviceId=" + api.deviceId;
		}
		var target = config.server + uri;
		if (config.debug) {
			console.log("访问地址:" + target);
		}
		return target;
	},
	query : function(uri, callback, data, type, files, resultType) {
		api.showProgress({
			msg : "通讯中..."
		});
		if (resultType == "json") {
			if (uri.indexOf("?ajax=") < 0 && uri.indexOf("&ajax=") < 0) {
				if (uri.indexOf("?") >= 0) {
					uri += "&ajax=1";
				} else {
					uri += "?ajax=1";
				}
			}
		}
		var url = webUtil.getService(uri);
		if (!type) {
			type = "post";
		}
		if (!resultType) {
			resultType = "json";
		}

		if (!data) {
			data = {};
		}
		var param = {};
		param.values = data;
		if (files) {
			type = "post";
			param.file = files;
		}
		if (config.debug) {
			console.log("参数信息:" + JSON.stringify(param));
		}
		api.ajax({
			url : url,
			charset : "utf-8",
			timeout : 5,
			method : type,
			async: false,
			dataType : resultType,
			data : param,
//			cache : false
		}, function(ret, err) {
			if (config.debug) {
				console.log("服务器返回数据ret===>>>" + JSON.stringify(ret));
				console.log("服务器返回数据err===>>>" + JSON.stringify(err));
			}
			api.hideProgress();
			if (ret) {
				if (resultType == "json") {
					var res = {};
					res = ret;
					var statusCode = res.statusCode || 0;
					if (statusCode == 301 || statusCode == "301") {
						console.log("用户登录超时,即将进入登录页面！");
						api.toast({
							msg : '登录超时，请重新登录!'
						});
						api.sendEvent({
							name : 'relogin'
						});
						setTimeout(function() {
							api.closeToWin({
								name : 'root'
							});
						}, 2000);
						return;
					}
					if (callback) {
						callback(res, null);
					}
					return;
				} else {
					return callback(ret, null);
				}
			} else {
				if (callback) {
					var msg = "请检查网络设置!";
					//					@-这里返回的错误信息是服务器返回格式错误
					if (err) {
						msg = err.ms || msg;
					}
					callback(null, {
						success : false,
						code : 500,
						msg : msg
					});
				}
				return;
			}
		});
	},
	queryUrl : function(url, callback, data, type, files, resultType) {
		api.showProgress({
			msg : "通讯中..."
		});
		if (config.debug) {
			console.log("通讯地址:" + url);
		}
		if (!type) {
			type = "post";
		}
		if (!resultType) {
			resultType = "json";
		}
		if (!data) {
			data = {};
		}
		var param = {};
		param.values = data;
		if (files) {
			type = "post";
			param.files = files;
		}
		if (config.debug) {
			console.log("参数信息:" + JSON.stringify(param));
		}
		api.ajax({
			url : url,
			charset : "utf-8",
			timeout : 5,
			method : type,
			dataType : resultType,
			data : param,
			cache : false
		}, function(ret, err) {
			if (config.debug) {
				console.log("服务器返回数据ret===>>>" + JSON.stringify(ret));
				console.log("服务器返回数据err===>>>" + JSON.stringify(err));
			}
			api.hideProgress();
			if (ret) {
				var res = {};
				res = ret;
				if (callback) {
					callback(res, null);
				}
				return;
			} else {
				if (callback) {
					var msg = "请检查网络设置!";
					//				@-这里返回的错误信息是服务器返回格式错误
					if (err) {
						msg = err.ms || msg;
					}
					callback(null, {
						success : false,
						code : 500,
						msg : msg
					});
				}
				return;
			}
		});
	}
}