var pagination = {
	page : 1,
	totalPage : 1,
	options : {
		totalField : "total",
		dataField : "rows"
	},
	uri : "",
	resultType : "json",
	queryType : "get",
	callback : function(dataList) {
		if (config.debug) {
			console.log("the pagination callback method is not defined");
		}
	},
	rows : 10,
	initPageInfo : function(data) {
		var options = pagination.options;
		var callback = pagination.callback;
		if (!options) {
			api.hideProgress();
			return;
		}
		if (!data) {
			api.hideProgress();
			return;
		}
		var totalField = options.totalField || "total";
		var dataField = options.dataField || "rows";
		var grid = data["grid"] || {};
		var rows = grid[dataField] || [];
		if (config.debug) {
			console.log("传入的数据--->>" + JSON.stringify(data));
			console.log("待解析的数据--->>" + JSON.stringify(rows));
		}
		var statusCode = grid.statusCode;
		var msg = grid.message || "请检查您的网络设置!";
		if (statusCode == 300) {
			api.toast({
				msg : msg
			});
			return;
		}
		if (!callback) {
			if (config.debug) {
				console.log("未指定分页程序读取数据后的回调程序!");
			}
			return;
		}
		try {
			if (!callback(rows)) {
				if (config.debug) {
					console.log("回调程序返回为false，不初始化分页信息!");
				}
				return;
			}
		} catch(e) {
			if (config.debug) {
				console.log("回调程序调用出现错误!" + e.message);
			}
			return;
		}

		if (pagination.page > pagination.totalPage) {
			pagination.page = pagination.totalPage;
		}

		var total = grid[totalField];
		if (!total) {
			total = 0;
		}
		pagination.totalPage = Math.ceil(total / pagination.rows);
		if (pagination.totalPage < 1) {
			pagination.totalPage = 1;
		}

	},
	goPage : function(flag) {
		if (!pagination.callback) {
			return;
		}
		var page = pagination.page;
		var totalPage = pagination.totalPage;
		if (flag == 'next') {
			if (config.debug) {
				console.log("到下一页!");
			}
			page += 1;
		} else if (flag == 'first') {
			if (config.debug) {
				console.log("到第一页!");
			}
			page = 1;
		} else if (flag == 'last') {
			if (config.debug) {
				console.log("到最后一页!");
			}
			page = totalPage;
		} else if (flag == 'pre') {
			if (config.debug) {
				console.log("到上一页!");
			}
			page -= 1;
		} else {
			return;
		}
		if (page < 1) {
			page = 1;
			api.toast({
				msg : '当前已经是第一页了！'
			});
			return;
		}

		if (config.debug) {
			console.log("totalPage=" + totalPage + ",page=" + page);
		}
		if (page > totalPage) {
			page = totalPage;
			api.toast({
				msg : '当前已经是最后一页了！'
			});
		}
		pagination.page = page;
		api.showProgress({
		});
		webUtil.query(pagination.uri, function(ret, err) {
			if (ret) {
				pagination.initPageInfo({
					dataField : "rows",
					totalField : "total",
					grid : ret
				}, pagination.callback);
			} else {
				api.toast({
					msg : '网络连接错误，请重试!'
				});
			}
			api.hideProgress();
		}, {
			page : pagination.page,
			rows : pagination.rows
		}, pagination.queryType || "get", null, pagination.resultType || "json");
	},
	initRefreshMethod : function() {
		if (config.debug) {
			console.log("init refresh pagination method...");
		}
		api.addEventListener({
			name : 'swipedown'
		}, function(ret, err) {
			//向上滑动，加载上一页
			var target = document.getElementById("main");
			var stop = target.scrollTop;
			var tHeight = target.offsetHeight;
			var sHeight = target.scrollHeight;
			if (config.debug) {
				console.log("向上---滚动距离:" + stop + ",主窗口可视高度:" + tHeight + ",滚动条高度:" + sHeight);
			}
			if (stop == 0) {
				pagination.goPage('pre');
			} else {
				if (config.debug) {
					console.log("did none");
				}
			}
		});
		api.addEventListener({
			name : 'swipeup'
		}, function(ret, err) {
			//向下滑动到底部
			var target = document.getElementById("main");
			var scrollTop = target.scrollTop;
			var clientHeight = target.clientHeight;
			var tHeight = target.offsetHeight;
			var sHeight = target.scrollHeight;
			if (config.debug) {
				console.log("向下---滚动距离:" + scrollTop + ",主窗口可视高度:" + tHeight + ",滚动条高度:" + sHeight);
			}
			if ((scrollTop + clientHeight) >= sHeight) {
				pagination.goPage('next');
			} else {
				if (config.debug) {
					console.log("did none");
				}
			}
		});
	}
};
