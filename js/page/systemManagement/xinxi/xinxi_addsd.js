$().ready(function() {
	$("#dataForm").initDic();
	$("#systemid").val(getUrlParam("id"));
	var e = "<i class='fa fa-times-circle'></i> ";
	$("#dataForm").validate({
		rules: {
			mc:{required:true,rangelength:[0,66]},
		},
		messages: {
			
			mc:{
                required:"必填",
                rangelength:"名称不得超过66字",
            }
		},
		submitHandler:function(form){
			if($('#wjdz').val() != ''){
				$("#dataForm").attr("action",api_path+"/sync/Writer.i");
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
			}else{
				parent.layer.msg('请先上传图片', {
					icon: 0
				});
			}
			
		}
	});
});
function mclose(){
	var index = window.parent.parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
	parent.parent.layer.close(index); //再执行关闭 
}
$(function () {
	var options = {
		success: function (data) {
		}
	};
	$("#form2").ajaxForm(options);
});