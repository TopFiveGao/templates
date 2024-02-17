$().ready(function() {
	var m_index ;
	$("#dataForm").initDic();
	$("#dataForm").validate({
		rules: {
			optid_name:{
				required:true,
				maxlength:60
			},
			info:{
				required:true,
				maxlength:60
			},
			ms:{
				maxlength:160
			}
		},
		messages: {

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
	            		layer.close(m_index);
	        		}
	    		};
				m_index = layer.load();
	    		$(form).ajaxSubmit(options);
		}
	});
	

});
function mclose(){
	var index = window.parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
	parent.layer.close(index); //再执行关闭 
}
