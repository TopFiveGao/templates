let fil = {};
$().ready(function() {
	
	// $("#dataForm").initDic();
	// inittable();
	// setTimeout(()=>{
	// 	inpurt();	
	// }, 1000);
	// hesr();
	
	function getUrlParam(name){//解决url传参中文乱码问题
	    var url = window.location.search;
	    // 正则筛选地址栏
	    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	    // 匹配目标参数
	    var result = url.substr(1).match(reg);
	    //返回参数值
	    return result ? decodeURIComponent(result[2]) : null;
	};
	$("#mlid").val(getUrlParam("mi"));
	$("#t").val(getUrlParam("fumr"));	
	var e = "<i class='fa fa-times-circle'></i> ";
	$("#dataForm").validate({
		rules: {
			bt:{
				required:true,//必填项		
				rangelength:[1,50]//字数长度
			},			
			zy:{
				required:true,
				rangelength:[1,70],
			},
			bttpdz:{
				required:true,
			},
		},
		messages: {
			bt:{
				required:"必填",
				rangelength:"名称不得超过50字",
			},			
			
			zy:{
				required:"必填",
				rangelength:"设备得超过70字",			
			},
			bttpdz:{
				required:"必填",
			},
		},
		submitHandler:function(form){
			$("#dataForm").attr("action", api_path + "/sync/Writer.i");
			$("#zwwb").val(editor.getText());
			$("#zwhtml").val(editor.getHtml());
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
			$("#button").hide();	
		}
	});
});
function inpurt() {
	let datas = {
		"optid": "info_delete_file_by_a",		
	}
	let mydata = JSON.stringify(datas);
	$.ajax({
		url: api_path + "/Common/Reader.i",
		type: 'post',
		dataType: "json",
		contentType: "application/json",
		data: mydata,
		success: function(data) {
			refreshTable()
		}
	});
};
function inpurt() {
	let htmltext = $(".note-editable").text();
	let zwhtml = $(".note-editable").html();
	$("#zwwb").val(htmltext);
	$("#zwhtml").val(zwhtml);
	fil.bt = $("#bt").val()			
	fil.mlid = $("#mlid").val()			
	fil.zy = $("#zy").val()			
	fil.zwhtml = $("#zwhtml").val()			
	fil.zwwb = $("#zwwb").val()			
	fil.fbzt = $("#fbzt").val()			
	fil.bttpdz = $("#bttpdz").val()	
	let datas = {
		"optid": "info_insert",	
		"param":fil
	};
	let mydata = JSON.stringify(datas);
	$.ajax({
		url: api_path +"/common/writer",
		type: 'post',
		dataType: "json",
		contentType: "application/json",
		data: mydata,
		success: function(data) {		
			if(data.result_state == 0){
				msgAfterFun(1,"保存成功",mclose);
			}else{
				msgAfterFun(2,"保存失败",mclose);
			}		
		}
	});
};
function mclose() {
	var index = window.parent.parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
	parent.parent.layer.close(index); //再执行关闭 
}
$(function() {
	var options = {
		url: api_path + "/sync/Writer.i",
		success: function(data) {
		}
	};
	$("#dataForm").ajaxForm(options);
});
function hesr() {
	var ele
	getDatas(api_path + "/Common/Reader.i", "select_key", {}, function(data) {
		ele = data.result[0].SYSTEMID
		$("#systemid").val(ele)
	})
}
function addsd() {
	parent.layer.open({
		type: 2,
		title: '上传附件',
		shade: 0.8,
		area: ['800px', '650px'],
		content: getRootPath() + '/jwxt/systemManagement/xinxi/xinxi_addsdf.html',
		end: function() {
			refreshTable();
		}
	});
}


$(function() {
	var options = {
		url: api_path + "/sync/Writer.i",
		success: function(data) {
			var datas = JSON.parse(data)
		}
	};
	$("#form2").ajaxForm(options);
});

function inittable() {
	var data_table = $("#data_table");
	data_table.bootstrapTable({
		method: 'post', // 请求类型
		contentType: "application/json",
		dataType: "json",
		url: api_path + "/Common/Reader.i", // 请求地址
		pageSize: 15, // 每页显示数
		crossDomain: true, //跨域
		striped: true,
		idField: "systemid",
		pageNumber: 1, // 页码
		pageList: [10, 50, 100, 200, 500, 1000,5000],
		sortOrder: "name",
		pagination: true,
		sidePagination: "server",
		// showColumns: true,
		toolbar: "#searchForm",
		search: false, // 搜索框
		height: "350",
		queryParamsType: "undefined",
		clickToSelect: true, // 点击行选中
		onLoadSuccess: function(data) {
			let mog = fil.filesr = [];
			for (let i = 0; i < data.result.length ;i++) {
				let uiu = {
					"mc":data.result[i].MC,
					"lx":data.result[i].LX,
					"wjdz":data.result[i].WJDZ
				}
				mog.push(uiu)
			}
		},
		onLoadError: tableErrorMsgHandler,
		queryParams: function(params) {
			var param = {};
			var postData = {
				"optid": "info_select_file_by",
				"page_index": params.pageNumber,
				"page_size": params.pageSize,
				"is_paging": "1",
				"is_couting": "1",
				"order": "",
				"param": param
			}
			return postData;
		},
		columns: [{
				title: '序号',
				formatter: function(value, row, index) {
					return index + 1;
				},
				align: 'center',
				valign: 'middle'
			},
			{
				title: '名称',
				field: 'MC',
				align: 'center',
				valign: 'middle'
			}, {
				title: '创建人',
				field: 'CREATOR',
				align: 'center',
				valign: 'middle',
			}, {
				title: '类型',
				field: 'LX',
				align: 'center',
				valign: 'middle',
			},
			{
				title: '创建时间',
				field: 'CREATEDATE',
				align: 'center'
			},
			{
				title: '操作',
				field: 'SYSTEMID',
				align: 'center',
				formatter: function(value, row, index) {								
					var innerhtml =
						'<div><div class="input-group" ><div class="input-group-btn"><button data-toggle="dropdown" class="btn btn-success dropdown-toggle btn-xs" type="button">操作<span class="caret"></span></button><ul class="dropdown-menu pull-right">';
					// innerhtml += '<li><a href="javascript:update(\'' + row.SYSTEMID + '\',\'' + row.BT + '\',\'' + row.CREATOR +
					// 	'\',\'' + row.ZY + '\')">修改</a></li>';
					innerhtml += '<li><a href="javascript:del(\'' + row.ID + '\')">删除</a></li>';
					innerhtml += '</ul></div></div></div>';
					return innerhtml;
				}
			}
		]
	});
}
function refreshTable() {
	var data_table = $("#data_table");
	$('#data_table').bootstrapTable('refreshOptions', {
		pageNumber: 1,
		crossDomain: true,
	}, );
}
function del(id) {
	parent.layer.confirm('您是否要删除该条数据？', {
		skin: 'layui-layer-molv',
		btn: ['是', '否'], // 按钮
		shade: false // 不显示遮罩
	}, function() {
		var param = {
			"id": id,
			"lastupdatedby": getLocalUser().userid
		}
		saveData(api_path + "/Common/Writer.i", "info_delete_file_by", param, function(datas) {
			if (datas.result_state == 0) {
				parent.layer.msg('已删除', {
					icon: 1
				});
			} else {
				parent.layer.msg('删除失败', {
					icon: 2
				});
			}
			refreshTable();
		});
	});
}