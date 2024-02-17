$().ready(function() {
	$("#dataForm").initDic();
	$("#parentid").val(getUrlParam("id"));
	$("#superid").val(getUrlParam("id"));
	var e = "<i class='fa fa-times-circle'></i> ";
	$("#dataForm").validate({
		rules: {
			name:{required:true,rangelength:[0,66]},
			url:{rangelength:[0,66]},
			type:{
				valueNotEquals:""
			},
			orderby:{
				required:true,
				isDigits:true
			}
		
		},
		messages: {
			orderby:{
				isDigits:"只能为数字"
			},
			name:{
                required:"必填",
                rangelength:"菜单名称不得超过66字",
            },
            url:{
                rangelength:"url长度不得超过66字",
            }
			
		},
		submitHandler:function(form){
			if($("#superid").val() == ''){
				$("#superid").val('-1')
			}
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
function mclose(){
	var index = window.parent.parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
	parent.parent.layer.close(index); //再执行关闭 
}