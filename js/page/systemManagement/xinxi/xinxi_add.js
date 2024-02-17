$().ready(function() {
	$("#dataForm").initDic();
	inittable();
	hesr();
	function getUrlParam(name){//解决url传参中文乱码问题
	    var url = window.location.search;
	    // 正则筛选地址栏
	    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	    // 匹配目标参数
	    var result = url.substr(1).match(reg);
	    //返回参数值
	    return result ? decodeURIComponent(result[2]) : null;
	};
	$("#mlid").val(getUrlParam("id"));
	$("#t").val(getUrlParam("fumr"));
	
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
		submitHandler:function(form){
			$("#dataForm").attr("action",api_path+"/sync/Writer.i");
			let htmltext = $(".note-editable").text();
			let zwhtml = $(".note-editable").html();
			
			$("#zwwb").val(htmltext);
			$("#zwhtml").val(zwhtml);
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
var ele
function hesr() {
	getDatas(api_path + "/Common/Reader.i", "select_key", {}, function(data) {
		ele = data.result[0].SYSTEMID	
	})
}
function addsd(ele) {
	parent.layer.open({
		type: 2,
		title: '上传附件',
		shade: 0.8,
		area: ['800px', '650px'],
		content: getRootPath() + '/jwxt/systemManagement/xinxi/xinxi_addsd.html?id=' + ele,
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
		onLoadSuccess: function() {},
		onLoadError: tableErrorMsgHandler,
		queryParams: function(params) {
			var param = {};
			var postData = {
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
					innerhtml += '<li><a href="javascript:update(\'' + row.SYSTEMID + '\',\'' + row.BT + '\',\'' + row.CREATOR +
						'\',\'' + row.ZY + '\')">修改</a></li>';
					innerhtml += '<li><a href="javascript:del(\'' + row.SYSTEMID + '\')">删除</a></li>';
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
