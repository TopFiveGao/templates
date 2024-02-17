$().ready(function() {
	// $("#dataForm").initDic();
	$("#creator").val(getLocalUser().userid);
	$("#lastupdatedby").val(getLocalUser().userid);
	var e = "<i class='fa fa-times-circle'></i> ";
	$("#dataForm").validate({
		rules: {
			name:{required:true,rangelength:[1,30]},
		},
		messages: {
			name:{
                required:e+"必填",
                rangelength:e+"角色名称不得少于1字，不得超过30字",
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
function mclose() {
	var index = window.parent.parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
	parent.parent.layer.close(index); //再执行关闭 
}