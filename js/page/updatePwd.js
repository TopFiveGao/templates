$(document).ready(function(){
	$("#onopet").click(mclose);
	//添加校验
	var e = "<i class='fa fa-times-circle'></i> ";
	$("#dataForm").validate({
		rules: {
			oldpassword:{
                required: true,
                minlength:5,
                maxlength:20
            },
			newpassword:{
				required: true,
                minlength:5,
                maxlength:20,
                checkNewPwd:true
				},
			confirmpassword:{
				required: true,
        		equalTo: "#newpassword"
			}
		},
		messages: {
			oldpassword:{
				minlength:"最少5个字符",
				maxlength:"最多20个字符"
			},
			newpassword:{
				minlength:"最少5个字符",
				maxlength:"最多20个字符",
				checkNewPwd:"密码必须由大小写字母加数字加特殊字符组成!"
				},
		   confirmpassword:{
			equalTo:"您两次输入的密码不一致!"
		   }
		},
		submitHandler:function(form){
			$.ajax({
				url: api_base + "/Common/Reader.i",
				type: 'post',
				dataType: "json",
				contentType: "application/json",
				data: JSON.stringify({"optid": "checkPwd",
				"param": {
					"oldpassword": $("#oldpassword").val()
				}}),
				success: function(data) {
					
					if(data.result_state == "0"){
						$("#dataForm").attr("action",api_base+"/sync/Writer.i");
						var options = {
							success:function(data) {
								if(data.result_state == 0){
									msgAfterFun(1,"密码修改成功",logout);
								}else{
									msgAfterFun(2,"密码修改失败",mclose);
								}
							}
						};
						$(form).ajaxSubmit(options);
					}else{
						parent.layer.msg(data.result_msg, {
							icon: 2
						});
					}
				},
			})
		}
	});
});

$(function(){
	jQuery.validator.addMethod("checkNewPwd", function(value, element) {
    var password = /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,}$/;
    return this.optional(element) || (password.test(value));
}, "密码必须由大小写字母加数字加特殊字符组成!");
});

function mclose(){
	var index = window.parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
	parent.layer.close(index); //再执行关闭 
}
function logout(){
	$.ajax({
		type: "post",
		url: api_auth + "/auth/logout",
		async: false, //设为同步
		contentType: "application/json",
		dataType: "json",
		crossDomain: true, //跨域
		data: null,
		success: function(result) {
			var data = eval(result);
			if (data.result_state == "0") {
				window.location.href = getRootPath() + "/jwxt/login.html";
				sessionStorage.clear(); //清空所有缓存
			} else {
				layer.alert("退出失败", { icon: 2, title: '提示' })
				return;
			}
		}
	});
}