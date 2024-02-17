$().ready(function() {
	$("#dataForm").initDic();
	var e = "<i class='fa fa-times-circle'></i> ";
	$("#dataForm").validate({
		rules: {

		},
		
	
		messages: {

		},
		submitHandler: function(form) {
			$("#dataForm").attr("action", api_path + "/sync/Writer.i");
			var options = {
				success: function(data) {
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