$(document).ready(function(){
	$("#dataForm").initDic({
		successHandler:function(){
			var data ={"result":[{
				"dept":getUrlParam("dept"),
				"name":getUrlParam("name"),
				"idcardno":getUrlParam("idcardno")
			}]}
			$("#dataForm").setForm(data);
			//$("#dept").val(getUrlParam("dept"));
			//$("dept").trigger("chosen:updated");
			//$("#name").val(getUrlParam("name"));
			//$("#idcardno").val(getUrlParam("idcardno"));
		}
		});
	$("#button_submit").click(function(){
		//后续采用添加元素的方式
		window.parent.$("#param_dept").val($("#dept").val());
		window.parent.$("#param_name").val($("#name").val());
		window.parent.$("#param_idcardno").val($("#idcardno").val());
		mclose();
	});
});
function mclose(){
	var index = window.parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
	parent.layer.close(index); //再执行关闭 
}
