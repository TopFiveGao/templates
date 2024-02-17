$().ready(function() {
	var m_index ;
	$("#dataForm").initDic();
	$("#dataForm").validate({
		rules: {
		
			mc:{
				required:true,
				rangelength:[0,10],
				},
			fllx:{
				required:true,
				},
			mbnr:{
				required:true,
				}
		},
		messages: {
			mc:{
				required:"必填",
				rangelength:"菜单名称不得超过10字",
			},
			fllx:{
		        required:"必填",
		    },
		    mbnr:{
		        required:"必填",
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
			// $("#dataForm").attr("action",api_base+"/sync/Writer.i");
			// var options = {
	  //       		success:function(data) {
	  //       			var jsonData = $.parseJSON(data);
	  //           		if(jsonData.result_state == 0){
	  //           			msgAfterFun(1,"保存成功",mclose);
	  //           		}else{
	  //           			msgAfterFun(2,"保存失败",mclose);
	  //           		}
	  //           		layer.close(m_index);
	  //       		}
	  //   		};
			// 	m_index = layer.load();
	  //   		$(form).ajaxSubmit(options);
		}
	});
	

});
function mclose(){
	var index = window.parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
	parent.layer.close(index); //再执行关闭 
}
