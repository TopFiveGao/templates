$(document).ready(function(){
	// $("#dataForm").initDic({successHandler:function(){
	// 	//绑定数据
	// }})
		formDataBinding();
	//添加校验
	var e = "<i class='fa fa-times-circle'></i> ";
	$("#dataForm").validate({
		rules: {
			dmjmc:{required:true,rangelength:[0,55]},
			dmjbz:{required:true,rangelength:[0,60]},
			lxbh:{required:true,rangelength:[0,80]},
		},
		messages: {
			kind:{
                required:"必填",
                rangelength:"代码集名称长度不得超过55",
            },
            code:{
                required:"必填",
                rangelength:"标准长度不得超过60",
            },
            detail:{
                required:"必填",
                rangelength:"类型编号长度不得超过80",
            },
		},
		submitHandler:function(form){
			$("#dataForm").attr("action",api_base+"/sync/Writer.i");
			var options = {
	        		success:function(data) {
	        			// var jsonData = $.parseJSON(data);
	            		if(data.result_state == 0){
	            			msgAfterFun(1,"保存成功",mclose);
	            		}else{
	            			msgAfterFun(2,"保存失败",mclose);
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
	getData(api_base+"/Common/Reader.i", "dmjgl_select", param, function(result) {
		$("#dataForm").setForm(result);
	});
}
function mclose(){
	var index = window.parent.parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
	parent.parent.layer.close(index); //再执行关闭 
}