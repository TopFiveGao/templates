$(document).ready(function(){
	$("#dataForm").initDic({successHandler: function(){
		formDataBinding();
	}});
	//添加校验
	var e = "<i class='fa fa-times-circle'></i> ";
	$("#dataForm").validate({
		rules: {
			kind:{required:true,rangelength:[0,55]},
			code:{required:true,rangelength:[0,60]},
			detail:{required:true,rangelength:[0,80]},
			zt:{required:true}
		},
		messages: {
			kind:{
                required:e+"必填",
                rangelength:e+"编码类型长度不得超过55",
            },
            code:{
                required:e+"必填",
                rangelength:e+"字典编码长度不得超过60",
            },
            detail:{
                required:e+"必填",
                rangelength:e+"编码类型长度不得超过80",
            },
			zt:{
			    required:e+"必填",
			}
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
		"dictionaryid": getUrlParam("dictionaryid")
	}
	getData(api_base+"/Common/Reader.i", "dictionary", param, function(result) {
		$("#dataForm").setForm(result);
	});
}
function mclose(){
	var index = window.parent.parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
	parent.parent.layer.close(index); //再执行关闭 
}