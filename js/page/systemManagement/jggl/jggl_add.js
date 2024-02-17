$(document).ready(function() {
	$("#dataForm").initDic();
	var e = "<i class='fa fa-times-circle'></i> ";
	$("#dataForm").validate({
		rules: {
			deptname: {
				required: true,
				rangelength: [0, 66]
			},
			deptcode: {
				required: true
			},
			parentid: {
				required: true
			},
			sjfw: {
				required: true,
				rangelength: [0, 66]
			},
		},
		messages: {
			deptname: {
				required: e+"必填",
				rangelength:  e+"部门名称不得超过66字",
			},
			sjfw: {
				required:  e+"必填",
				rangelength:  e+"长度不得超过66字",
			},
		},
		submitHandler: function(form) { //这样表单验证通过后会自动提交
			$("#dataForm").attr("action", api_path + "/sync/Writer.i"); //设置或返回被选元素的属性值
			var options = {
				success: function(data) { //请求成功完成时
					if (data.result_state == 0) {
						msgAfterFun(1, "保存成功", mclose);
					} else if (data.result_state == "400") {
						parent.layer.msg('机构代码重复不能保存', {
							icon: 8
						});
					} else {
						msgAfterFun(2, "保存失败", mclose);
					}
				}
			};
			$(form).ajaxSubmit(options);
		}
	});
});

function mclose() {
	var index = window.parent.parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
	parent.parent.layer.close(index); //再执行关闭 
}
