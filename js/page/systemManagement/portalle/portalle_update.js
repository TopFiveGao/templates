$().ready(function(){
	// machen();
	$("#dataForm").initDic({successHandler: function(){
		formDataBinding();
	}});
	
	$("input[name='systemid']").val(getUrlParam("systemid"));
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
		            // rangelength:"菜单名称不得超过66字",
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
		}
	});
});

function machen() {
	let param = {};
	param.systemid = getUrlParam("systemid");
	let datas = {
		"optid": "gl_update_select_a",
		"param": param
	}
	let mydata = JSON.stringify(datas);
	$.ajax({
		url: api_base + "/Common/Reader.i",
		type: 'post',
		dataType: "json",
		contentType: "application/json",
		data: mydata,
		success: function(data) {
			$("#dataForm").setForm(data);
		}
	})
}
var isHasImg = false;

function formDataBinding() {
	var param = {
		"systemid": getUrlParam("systemid")
	}
	getData(api_base + "/Common/Reader.i", "gl_update_select_a", param, function(date) {
		if (date.result[0].URL && date.result[0].URL.length > 0) {
			var innerHtml = '<a class="btn btn-primary active" onclick="window.open(\''+ api_img + date.result[0].URL +
				'\')">查看图标</a><a href="javascript:clean();" style="padding-left:5px;"><i class="fa fa-remove fa-lg"></i></a>';
			$('#imgfile').html(innerHtml);
			isHasImg = true;
		}
		console.log(date);
		delete date.result.URL;
		var murl = date.result[0].M_URL
		$("#url").val(murl)
		$("#dataForm").setForm(date);
		// $("#parentid").val(getUrlParam("parentid"));
		// $("#systemid").val(getUrlParam("id"));
	});
}

function mclose(){
	var index = window.parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
	parent.layer.close(index); //再执行关闭 
}

function clean() {
	var innerHtml = '<input id="img" name="img" type="file">';
	$('#imgfile').html(innerHtml);
}