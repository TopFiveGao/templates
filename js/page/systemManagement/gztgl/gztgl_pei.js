$(document).ready(function() {
	updates()
	$("#dataForm").initDic();
	
	$("#id").val(getUrlParam("stmtgt"));
	var e = "<i class='fa fa-times-circle'></i> ";
	$("#dataForm").validate({
		rules: {
			mc:{
				
			},	
		},
		messages: {
			mc:{
				
			},
		},
		submitHandler:function(form){
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
		}
	});
})
function updates() {
	let param = {};
	param.userid = getUrlParam("id");
	let datas = {
		"optid": "pz_select",
		"param": param
	}
	let mydata = JSON.stringify(datas);
	$.ajax({
		url: api_path + "/Common/Reader.i",
		type: 'post',
		dataType: "json",
		contentType: "application/json",
		data: mydata,
		success: function(res) {
			let list = res.result;
			rqhz(list);
		}
	})	
}
function mclose() {
	var index = window.parent.parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
	parent.parent.layer.close(index); //再执行关闭 
}
function rqhz(i) {
	let lst = [];
	for(let e = 0; e < i.length; e++){
		lst.push(i[e].FLLX_V);
	};
	let sur = [...new Set(lst )];
	Buj(sur,i);
};
function Buj(b,i){
	let html = ''
	for(let e = 0; e < b.length; e++){
		html = '<div>' + b[e] + ' </div>'+
				'<div class="ibox-content">'+
					'<div class="bs-glyphicons">'+
						'<ul class="bs-glyphicons-list idfix'+e+'">'+
						'</ul>'+
					'</div>'+
				'</div>';
		$(".konhez").append(html);
		let htmls = '';
		for(let p = 0; p < i.length; p++){
			if(b[e] == i[p].FLLX_V){
				let image = '../../image/zwtp.png';
				// if(i[p].URL) image = api_img+i[p].URL;
				
				htmls += '<li class="no-list'+i[p].SYSTEMID+'" onclick="dilsxt(\''+i[p].SYSTEMID+'\')">'+
							'<img class="imgsizx" src="' + image + '" />'+
							'<span class="glyphicon-class ss'+i[p].SYSTEMID+'"> ' + i[p].MC + ' </span>'+
						'</li>';
			}
		}
		$(".idfix"+e).append(htmls)
	}
}
let si;//储存上一个选中的id
function dilsxt(i){//点击选中内容
	if(i != si){
		$(".no-list"+i).css({'border':'1px solid #23c6c8','color': '#23c6c8','background-color':'#eee'});
		$(".no-list"+si).css({'border':'1px solid #f9f9f9','color': '#676A6C','background-color':'#f9f9f9'});
		$(".ss"+si).removeClass("fa fa-check");
		$(".ss"+i).addClass("fa fa-check");
		$("#systemid").val(i);
		si = i;	
	}
}