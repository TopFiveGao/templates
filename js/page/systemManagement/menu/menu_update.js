$(document).ready(function() {
	$("#dataForm").initDic({successHandler: function(){
		formDataBinding();
	}});
	//添加校验
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
			menuoptid: {
				rangelength: [0, 70]
			},
			type: {
				valueNotEquals: ""
			},
			orderby: {
				required: true,
				isDigits: true
			},
			superid:{
				required: true
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
			menuoptid: {
				rangelength: "optid长度不得超过70字",
			},
			superid:{
				required: "必填"
			}
		},
		submitHandler: function(form) {
			var dataJson = $("#dataForm").serializeJson();
			if ($('#img') && $('#img').val() == "" && isHasImg) {
				$('#cleanImg').val("true");
			} else {
				$('#cleanImg').val("");
			}
			$("#dataForm").attr("action", api_base + "/sync/Writer.i");
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
var isHasImg = false;

function formDataBinding() {
	var param = {
		"systemid": getUrlParam("id")
	}
	getData(api_base + "/Common/Reader.i", "cd_query", param, function(date) {
		if (date.result[0].IMG && date.result[0].IMG.length > 0) {
			var innerHtml = '<a class="btn btn-primary active" onclick="window.open(\'' + date.result[0].IMG +
				'\')">查看图标</a><a href="javascript:clean();" style="padding-left:5px;"><i class="fa fa-remove fa-lg"></i></a>';
			$('#imgfile').html(innerHtml);
			isHasImg = true;
		}
		delete date.result.IMG;
		var murl = date.result[0].M_URL
		$("#url").val(murl)
		$("#dataForm").setForm(date);
		$("#parentid").val(getUrlParam("parentid"));
		$("#systemid").val(getUrlParam("id"));
	});
}

function mclose() {
	var index = window.parent.parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
	parent.parent.layer.close(index); //再执行关闭 
}

function clean() {
	var innerHtml = '<input id="img" name="img" type="file">';
	$('#imgfile').html(innerHtml);
}




$.fn.initDicers = function(options) {
	var options = options || {};
	var successHandler = options.successHandler || (function() {});
	var selectObj = this.find('select[dic="dic"]');
	$.each(selectObj, function() {
		var selectObj_ = this;
		var param = {};
		if ($(this).attr("kind")) {
			param.kind = $(this).attr("kind");
		}
		if ($(this).attr("code")) {
			param.code = $(this).attr("code");
		}
		//处理定义字典请求
		if(param.kind == 'gzdw'){
			var optid = $(this).attr("optid") ? $(this).attr("optid") : "ryxx_dw_select";
		}else if(param.kind == 'jd'){
			var optid = $(this).attr("optid") ? $(this).attr("optid") : "xzqh_select_jd";
		}else if(param.kind == 'cdld'){
			var optid = $(this).attr("optid") ? $(this).attr("optid") : "cd_fid_select";
		}else{
			var optid = $(this).attr("optid") ? $(this).attr("optid") : "dictionary";
		}
		if ($(this).attr("filter")) {
			var filter = $(this).attr("filter");
			var params = filter.split("|");
			$.each(params, function(index, param_) {
				param[param_.split("=")[0]] = param_.split("=")[1];
			});
		}
		var url = api_base + "/Common/Reader.i";
		var postData = {
			"optid": optid,
			"page_index": "1",
			"page_size": "20",
			"is_paging": "1",
			"is_couting": "1",
			"order": "",
			"param": param
		};
		$.ajax({
			type: "POST",
			url: url,
			// crossDomain: true,//跨域
			async: false, //设为同步，防止字典不能赋值
			contentType: "application/json",
			dataType: "json",
			headers: {
				"P_token": sessionStorage.getItem("p_token")
			},
			data: JSON.stringify(postData),
			success: function(result) {

				var data = eval(result);
				if (data.result_state == "0") {
					var innerHtml = "<option value=\"\" hassubinfo=\"true\">----请选择----</option>";
					if ($(selectObj_).attr("title") != "" && $(selectObj_).attr("title") != undefined) {
						innerHtml = "<option value=\"\" hassubinfo=\"true\">----" + $(selectObj_).attr("title") + "----</option>";
					}
					$.each(data.result, function(index, obj) {
						innerHtml += "<option value=\"" + obj.CODE + "\" hassubinfo=\"true\">" + obj.DETAIL + "</option>";
					});
					$(selectObj_).html(innerHtml);
					$(selectObj_).chosen({
						no_results_text: "正在查找该项"
					});
					if ($(selectObj_).attr("default")) {
						try {
							var code = $(selectObj_).attr("default").split(",")[0];
							$(selectObj_).val(code);
						} catch (e) {
							alert(e.message);
						}
					}
					$(selectObj_).trigger("chosen:updated");
				} else {
					parent.layer.alert("初始化字典失败");
					return;
				}
			}
		});
	});
	eval(successHandler());
};