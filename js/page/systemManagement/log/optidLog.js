$(document).ready(function() {
	
	initTable();
	$("#searchForm").initDic();
	$("#button_search").click(refreshTable);
	$('#button_new').click(add);
});
function initTable() {
	var data_table = $("#data_table");
	data_table.bootstrapTable({
		method: 'post', //请求类型
		contentType: "application/json",
		dataType: "json",
		url: api_base + "/Common/Reader.i", //请求地址
		pageSize: 10, //每页显示数
		striped: true,
		idField: "SYSTEMID",
		pageNumber: 1, //页码
		pageList: [10, 50, 100, 200, 500, 1000,5000],
		sortOrder: "name",
		pagination: true,
		sidePagination: "server",
		toolbar: "#searchForm",
		search: false, //搜索框
		height: "550",
		queryParamsType: "undefined",
		clickToSelect: true, //点击行选中
		onLoadSuccess: function() {},
		onLoadError: tableErrorMsgHandler,
		queryParams: function(params) {
			var param = {};
			if ($("#ip").val() != "") {
				param.ip = $("#ip").val();
			}
			if ($("#starttime").val() != "") {
				param.starttime = $("#starttime").val();
			}
			if ($("#endtime").val() != "") {
				param.endtime = $("#endtime").val();
			}
			if ($("#username").val() != "") {
				param.username = $("#username").val();
			}
			if ($("#lx").val() != "") {
				param.lx = $("#lx").val();
			}
			var postData = {
				"optid": "get_log_list",
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
				title: '时间',
				field: 'SJ',
				align: 'center',
				valign: 'middle'
			},
			{
				title: '用户名',
				field: 'USERNAME',
				align: 'center',
				valign: 'middle'
			},

			{
				title: '请求地址',
				field: 'OPERATION',
				align: 'center',
				valign: 'middle'
			},
			{
				title: 'IP',
				field: 'IP',
				align: 'center',
				valign: 'middle'
			},

			{
				title: '操作类型',
				field: 'LX_V',
				align: 'center',
				valign: 'middle'
			},

			{
				title: '操作描述',
				field: 'REQUESTPARAM',
				align: 'center',
				valign: 'middle',
				formatter: function (value, row, index) {
					let textSpan = row.REQUESTPARAM,
						innerhtml = '';
					if(row.REQUESTPARAM.length > 50){
						textSpan = `${row.REQUESTPARAM.substring(0,100)}...`;
						innerhtml = `<div>${textSpan}</div>`;
					}else{
						innerhtml = `<div>${row.REQUESTPARAM}</div>`;
					}
				    return innerhtml;
				}
			}
		]
	});
}

function refreshTable() {
	var data_table = $("#data_table");
	data_table.bootstrapTable("refresh");
}
//查看详细
function sc(systemid, ip) {
	parent.layer.confirm('您是否要删除该条数据？', {
		skin: 'layui-layer-molv',
		btn: ['是', '否'], // 按钮
		shade: false
		// 不显示遮罩
	}, function() {
		var param = {
			"systemid": systemid,
			'ip': ip
		}
		saveData(api_base + "/Common/Writer.i", "bmdgl_del", param,
			function() {
				refreshTable();
			});
		parent.layer.msg('已删除', {
			icon: 1
		});
	}, function() {
		parent.layer.msg('已放弃', {
			icon: 6
		});
	});
}
function add() {
	layer.open({
		type: 2,
		title: '新增',
		shade: 0.8,
		area: ['800px', '400px'],
		content: getRootPath() + '/jwxt/bmdgl/bmdgl_add.html',
		closeBtn: [1],
		end: refreshTable
	});
}
