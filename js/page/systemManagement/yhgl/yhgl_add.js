$().ready(function() {
	$("#allowable").chosen();
	
	$('#only_one_yz').hide();
	$("#dataForm").initDic();
	$("#dept").val(getUrlParam("param"));
	$("#dept_v").val(getUrlParam("zhname"));
	$("#creator").val(getLocalUser().userid);
	$("#lastupdatedby").val(getLocalUser().userid);
	var e = "<i class='fa fa-times-circle'></i> ";
	$("#dataForm").validate({
		rules: {
			loginname: {
				required: true,
				rangelength: [0, 20],
				// isUserName: true
			},
			name: {
				required: true,
				rangelength: [0, 33]
			},
			idcardno: {
				rangelength: [0, 20]
			},
			dept: {
				required: !0
			},
			password: {
				required: true,
				rangelength: [5, 16]
			},
			password_conform: {
				required: true,
				equalTo: "#password"
			},
			allowable: "required"
		},
		messages: {
			loginname: {
				required: e+"必填",
				rangelength:e+ "登录名不得超过20字",
			},
			// sjhm:{
			// 	rangelength: "手机号为11位数",
			// },
			name: {
				required: e+"必填",
				rangelength:e+ "姓名不得超过33字",
			},
			password: {
				required: e+"必填",
				rangelength:e+ "密码不得少于5个字符，不得超过16个字符",
			},
			idcardno: {
				rangelength: e+"身份证号有误",
			},
		},
		submitHandler: function(form) {
			$("#dataForm").attr("action", api_base + "/sync/Writer.i");
			var options = {
				success: function(data) {
					// var jsonData = $.parseJSON(data);
					if (data.result_state == 0) {
						msgAfterFun(1, "保存成功", mclose);
					} else {
						msgAfterFun(2, "保存失败", mclose);
					}
				}
			};
			$(form).ajaxSubmit(options);
			$("#yh_add").hide();
		}
	});
	$('#loginname').blur(function() {
		var loginname = $('#loginname').val();
		var param = {};
		param.loginname = loginname;
		var postData = {
			"optid": 'only_one_yz',
			"param": param
		};
		$.ajax({
			type: "POST",
			url: api_base + "/Common/Reader.i",
			contentType: "application/json",
			dataType: "json",
			data: JSON.stringify(postData),
			success: function(data) {
				if (data.result.length > 0) {
					$('.only_one_yz').html("<i class='fa fa-times-circle'></i>该用户名已被注册！");
				} else {
					$('.only_one_yz').html('');
				}
			}
		});
	});

});


function fangbsd(val){
	if(val == "" || val.length > 20){
		$('.only_one_yz').html('');
	}
}
function mclose() {
	var index = window.parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
	parent.layer.close(index); //再执行关闭 
}