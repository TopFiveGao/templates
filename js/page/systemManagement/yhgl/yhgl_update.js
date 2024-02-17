$(document).ready(function(){
	$("#allowable").chosen();
	//初始化字典
	$("#dataForm").initDic({successHandler:formDataBinding});
	//绑定数据
	//setTimeout(formDataBinding,"2000");
	//formDataBinding();
	//添加校验
	var e = "<i class='fa fa-times-circle'></i> ";
	$("#dataForm").validate({
		rules: {
			loginname:{required:true,rangelength:[0,20]},
			name:{required:true,rangelength:[0,33]},
			idcardno:{rangelength:[0,20]},
			dept:{
				required:!0
			},
			password:{required:true,rangelength:[5,16]},
			password_conform:{
				required: true,
        		equalTo: "#password"
			},
			// sjhm:{
			// 	/*rangelength:[0,20],*/
			// 	required: !0,
			// 	rangelength: [11, 11],
			// 	digits:true
			// },
			allowable:"required"
		},
		messages: {
			loginname:{
				required:"必填",
                rangelength:"登录名不得超过50字",
            },
            name:{
				required:"必填",
                rangelength:"姓名不得超过50字",
            },
			// sjhm:{
			// 	rangelength: "手机号为11位数",
			// },
            password:{
				required:"必填",
                rangelength:"密码不得少于5个字符，不得超过16个字符",
            },
            idcardno:{
                rangelength:"身份证号有误",
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
    		$("#yh_add").hide();		
		}
	});
});
function formDataBinding() {
	var param = {
		"systemid": getUrlParam("systemid")
	}
	getData(api_base+"/Common/Reader.i", "sys_user_query", param, function(result) {
		$("#dataForm").setForm(result);
		$("#password_conform").val($("#password").val());
		$("#systemid").val(getUrlParam("systemid"));
		$("#creator").val(getLocalUser().userid);
		$("#lastupdatedby").val(getLocalUser().userid);
		if(result.result[0].QMDZ != undefined && result.result[0].QMDZ != '' ){
			$(".imageblock").css("display","block");
			const image = document.getElementById('showimg');
			const imageUrl = api_img+result.result[0].QMDZ;
			image.scr = imageUrl;
			$("#showimg").attr("src",imageUrl);
		};
	});
}
function mclose(){
	var index = window.parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
	parent.layer.close(index); //再执行关闭 
}
$("#download").click(function(){
window.open($("#ryzhurl").val())})
