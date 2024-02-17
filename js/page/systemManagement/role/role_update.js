$(document).ready(function() {
	//初始化字典
	// $("#dataForm").initDic();
	//绑定数据
	formDataBinding();
	//添加校验
	var e = "<i class='fa fa-times-circle'></i> ";
	$("#dataForm").validate({
		rules: {
			name: {
				required: true,
				rangelength: [2, 20]
			},
			sjfw: {
				required: true,
				digits:true
			},
		},
		messages: {
			name: {
				required: e+"必填",
				rangelength: e+"角色名称不得少于2字，不得超过20字",
			},
			sjfw: {
				required: e+"必填",
			},
		},
		submitHandler: function(form) {
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

function formDataBinding() {
	var param = {
		"systemid": getUrlParam("systemid")
	}
	getData(api_base + "/Common/Reader.i", "sys_role_query", param, function(result) {
		$("#dataForm").setForm(result);
		$("#systemid").val(getUrlParam("systemid"));
		$("#creator").val(getLocalUser().userid);
		$("#lastupdatedby").val(getLocalUser().userid);
	});
}

function mclose() {
	var index = window.parent.parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
	parent.parent.layer.close(index); //再执行关闭 
}
