let sds;
$().ready(function() {
	function getUrlParam(name) {
		var url = window.location.search;
		// 正则筛选地址栏
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		// 匹配目标参数
		var result = url.substr(1).match(reg);
		//返回参数值
		return result ? decodeURIComponent(result[2]) : null;
	}
	inpurt()
	$("#dataForm").initDic();
	sds = getUrlParam("id")
	$("#systemid").val(getUrlParam("id"));
	$("#t").val(getUrlParam("lamu"));
	var e = "<i class='fa fa-times-circle'></i> ";
	$("#dataForm").validate({
		rules: {
			name: {
				required: true,
				rangelength: [0, 66]
			},
			url: {
				rangelength: [0, 66]
			},
			type: {
				valueNotEquals: ""
			},
			orderby: {
				required: true,
				isDigits: true
			}
		},
		messages: {
			orderby: {
				isDigits: "只能为数字"
			},
			name: {
				required: "必填",
				rangelength: "菜单名称不得超过66字",
			},
			url: {
				rangelength: "url长度不得超过66字",
			},
		},
		submitHandler: function(form) {
			$("#dataForm").attr("action", api_path + "/sync/Writer.i");
			var options = {
				success: function(data) {
					// var jsonData = $.parseJSON(data);
					if (data.result_state == 0) {
						msgAfterFun(1, "保存成功", mclose);
					} else {
						msgAfterFun(2, "保存失败", mclose);
					}
				}
			};
			$(form).ajaxSubmit(options);
			$("#button").hide();
		}
	});
});

function mclose() {
	var index = window.parent.parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
	parent.parent.layer.close(index); //再执行关闭 
}

function inpurt() {
	let param = {
		'systemid': getUrlParam("id")
	};
	let datas = {
		"optid": "info_select_update",
		"param": param
	}
	let mydata = JSON.stringify(datas);
	$.ajax({
		url: api_path + "/Common/Reader.i",
		type: 'post',
		dataType: "json",
		contentType: "application/json",
		data: mydata,
		success: function(data) {
			let htmlsp = data.result[0].ZWHTML
			$("#exvaen").html(htmlsp);
		
		}
	});
};

