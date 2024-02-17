$().ready(function(){
	// formDataBinding();
	$("#dataForm").initDic({successHandler: function(){
		formDataBinding();
	}});
	$("#systemid").val(getUrlParam("systemid"));
	var e = "<i class='fa fa-times-circle'></i> ";
	$("#dataForm").validate({
		rules: {
	
		},
		
			
		messages: {
			
		},
		submitHandler:function(form){		
			$("#dataForm").attr("action",api_path+"/sync/Writer.i");
			var options = {
	        		success:function(data) {
	            		if(data.result_state == 0){
	            			msgAfterFun(1,"保存成功",mclose);
	            		}else{
	            			msgAfterFun(2,"保存失败",mclose);
	            		}
	        		}
	    		};
	    	$(form).ajaxSubmit(options);
		}
	});
});
/*optid单条信息查询*/
function formDataBinding(){
	var param = {
		"systemid": getUrlParam("systemid")
	}
	getData(api_path+"/Common/Reader.i", "aqgl_aqzzbz_select", param, function(result) {
		$("#dataForm").setForm(result);
		$("#pzrq").val(result.result[0].PZRQ_V);
	});
}
function mclose(){
	var index = window.parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
	parent.layer.close(index); //再执行关闭 
}