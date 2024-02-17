$().ready(function(){
	$("#dataForm").initDic({successHandler: function(){
		formDataBinding();
	}});
	$("input[name='systemid']").val(getUrlParam("systemid"));
	$("#dataForm").validate({
		rules: {
			optid_name:"required",
			detail:"required",
			auth:"required"	
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
		}
	});
});

/*optid单条信息查询*/
function formDataBinding(){
	var param = {
			"systemid": getUrlParam("systemid")
		}
		getData(api_base+"/Common/Reader.i", "optid_query_one", param, function(result) {
			$("#dataForm").setForm(result);
			$("#lx").attr("default",result.result[0].LX)
		});
}


function mclose(){
	var index = window.parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
	parent.layer.close(index); //再执行关闭 
}