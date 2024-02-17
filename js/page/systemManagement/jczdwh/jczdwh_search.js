$(document).ready(function(){
	$("#button_submit").click(function(){
		//后续采用添加元素的方式
		window.parent.$("#param_kind").val($("#kind").val());
		window.parent.$("#param_code").val($("#code").val());
		window.parent.$("#param_detail").val($("#detail").val());
		mclose();
	});
	var data ={"result":[{
				"kind":getUrlParam("kind"),
				"code":getUrlParam("code"),
				"detail":getUrlParam("detail")
	}]}
	$("#dataForm").setForm(data);
});
function mclose(){
	var index = window.parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
	parent.layer.close(index); //再执行关闭 
}
