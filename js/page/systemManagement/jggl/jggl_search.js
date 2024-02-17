$(document).ready(function(){
	$("#button_submit").click(function(){
		//后续采用添加元素的方式
		window.parent.$("#param_deptname").val($("#deptname").val());
		window.parent.$("#param_deptcode").val($("#deptcode").val());
		mclose();
	});
});
function mclose(){
	var index = window.parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
	parent.layer.close(index); //再执行关闭 
}
