$().ready(function(){
	$("#dataForm").initDic({successHandler: function(){
		formDataBinding();
	}});
	var systemid  = getUrlParam("systemid");
	$("input[name='systemid']").val(systemid);
	var m_index ;
	$("#dataForm").validate({
		rules: {
			auth_p:"required",	
		},
		submitHandler:function(form){	
			$("#dataForm").attr("action",getRootPath()+"/sync/Writer.i");
			var options = {
	        		success:function(data) {
	        			// var jsonData = $.parseJSON(data);
	            		if(data.result_state == 0){
	            			alertInfor("更改成功",mclose);
	            		}else{
	            			alertInfor("更改失败",null);
	            		}
	            		layer.close(m_index);
	        		}
	    		};
				m_index = layer.load();
	    		$(form).ajaxSubmit(options);
		}
	});
})


function formDataBinding(){
	var param = {
			"systemid": getUrlParam("systemid")
		}
		getData(getRootPath()+"/Common/Reader.i", "optid_accredit_status_query", param, function(result) {
			$("#dataForm").setForm(result);		
//			if(result.result[0].AUTH_P==0){
//				$("input[name='auth_p']").val('已授权');}
//			else{
//				$("input[name='auth_p']").val('未授权');
//			}
		});
}

function mclose(){
	var index = window.parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
	parent.layer.close(index); //再执行关闭 
}