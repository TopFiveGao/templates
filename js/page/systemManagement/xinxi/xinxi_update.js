let sds;
$().ready(function() {
	$(".nav-tabs>li>a").click(tabre);
	inpurt();
	inittable();
	$("#dataForm").initDic();
	sds = getUrlParam("id")
	$("#systemid").val(getUrlParam("id"));	
	$("#t").val(getUrlParam("lamu"));	
	var e = "<i class='fa fa-times-circle'></i> ";
	$("#dataForm").validate({
		rules: {
			bt:{
				required:true,//必填项
				rangelength:[1,200]//字数长度
			},
			zy:{
				required:true,
				rangelength:[1,200],
			}					
		},
		messages: {
			bt:{
				required:e+"必填",
				rangelength:e+"标题不得超过200字",
			},
			zy:{
		        required:e+"必填",
		        rangelength:e+"摘要不得超过200字",
		    }
		},
		submitHandler: function(form) {
			$("#dataForm").attr("action", api_path + "/sync/Writer.i");
			$("#zwwb").val(editor.getText());
			$("#zwhtml").val(editor.getHtml());
			var options = {
				success: function(data) {
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
function tabre(){
	if($(this).attr("class") != "nav-tabscolor"){
		$(".nav-tabs>li>a").attr("class","");
		$(this).attr("class","nav-tabscolor");
	}
	// $(".nav-tabs>li>a").toggleClass("nav-tabscolor")//有就移除。没有就添加
}
function getUrlParam(name) {
	var url = window.location.search;
	// 正则筛选地址栏
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	// 匹配目标参数
	var result = url.substr(1).match(reg);
	//返回参数值
	return result ? decodeURIComponent(result[2]) : null;
}
function mclose() {
	var index = window.parent.parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
	parent.parent.layer.close(index); //再执行关闭 
}
function inpurt() {
	let param = {
		'systemid': getUrlParam("id")
	};
	let datas = {
		"optid": "info_select_update",
		"param": param
	}
	let mydata = JSON.stringify(datas);
	$.ajax({
		url: api_path + "/Common/Reader.i",
		type: 'post',
		dataType: "json",
		contentType: "application/json",
		data: mydata,
		success: function(data) {
			$("#dataForm").setForm(data);
			editor.dangerouslyInsertHtml(data.result[0].ZWHTML);
			$("#imgsrm").attr("src",api_img + data.result[0].BTTPDZ);
		}
	});
};
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
		height: "550",
		queryParamsType: "undefined",
		clickToSelect: true, // 点击行选中
		onLoadSuccess: function() {},
		onLoadError: tableErrorMsgHandler,
		queryParams: function(params) {
			var param = {
				'systemid': getUrlParam("id")
			};			
			var postData = {
				// "optid": "info_select_file",
				"optid": "info_select_file",
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
					innerhtml += '<li><a href="javascript:del(\'' + row.SYSTEMID + '\')">删除</a></li>';
					innerhtml += '</ul></div></div></div>';
					return innerhtml;
				}
			}
		]
	});
}
function del(id) {
	parent.layer.confirm('您是否要删除该条数据？', {
		skin: 'layui-layer-molv',
		btn: ['是', '否'], // 按钮
		shade: false // 不显示遮罩
	}, function() {
		var param = {
			"systemid": id,
			"lastupdatedby": getLocalUser().userid
		}
		saveData(api_path + "/Common/Writer.i", "info_delete_file1", param, function(datas) {
			if (datas.result_state == 0) {
				parent.layer.msg('已删除', {
					icon: 1
				});
				// delTreeNodesById(id);
			} else {
				parent.layer.msg('删除失败', {
					icon: 2
				});
			}
			refreshTable();
		});
	});
}
function refreshTable() {
	var data_table = $("#data_table");
	$('#data_table').bootstrapTable('refreshOptions', {
		pageNumber: 1,
		crossDomain: true,
	}, );
}
function addsd() {
	parent.layer.open({
		type: 2,
		title: '上传附件',
		shade: 0.8,
		area: ['1100px', '700px'],
		content: getRootPath() + '/jwxt/systemManagement/uploader/uploader.html?id='+ sds ,
		end: function() {
			refreshTable();
		}
	});
}