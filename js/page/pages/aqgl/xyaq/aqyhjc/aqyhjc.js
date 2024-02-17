let treeType = {};
$(document).ready(function() {
	initTable();
	$("#zs").clone();
	$("#searchForm").initDic();
	$("#button_search").click(refreshTable);
	$('#button_add').click(add);
});

function initTable() {
	var data_table = $("#data_table");
	data_table.bootstrapTable({
		method: 'post', //请求类型
		contentType: "application/json",
		dataType: "json",
		url: api_path + "/Common/Reader.i", //请求地址
		pageSize: 10, //每页显示数
		striped: true,
		idField: "SYSTEMID",
		pageNumber: 1, //页码
		pageList: [10, 50, 100, 200, 500, 1000,5000],
		sortOrder: "name",
		pagination: true,
		sidePagination: "server",
		showColumns: true, //选择是否显示
		toolbar: "#searchForm",
		search: false, //搜索框
		height: "550",
		queryParamsType: "undefined",
		clickToSelect: true, //点击行选中
		onLoadSuccess: function() {},
		onLoadError: tableErrorMsgHandler,
		queryParams: function(params) {
			var param = {};
			if ($("#jcsj").val() != "") {
				param.jcsja = $("#jcsj").val().split(" ~ ")[0];
				param.jcsjb = $("#jcsj").val().split(" ~ ")[1];
			};			
			if ($("#jcbm").val() != "") {
				param.jcbm = $("#jcbm").val();
			};
			if ($("#fzr").val() != "") {
				param.fzr = $("#fzr").val();
			};

			if ($("#zs").val() != "") {
				param.zs = $("#zs").val();
			};
			
			var postData = {
				"optid": "aqgl_aqyh_select",
				"page_index": params.pageNumber,
				"page_size": params.pageSize,
				"is_paging": "1",
				"is_couting": "1",
				"order": "",
				"param": param
			};
			return postData;
		},
		columns: [{
				title: '序号',
				formatter: function(value, row, index) {
					return index + 1;
				},
				align: 'center',
				valign: 'middle',
				visible: judge(0,true)
			},
			{
				title: '学期',
				field: 'SSXQ_V',
				align: 'center',
				valign: 'middle',
				visible: judge(1,true)
			},
			{
				title: '周期类型',
				field: 'ZQLX_V',
				align: 'center',
				valign: 'middle',
				visible: judge(2,true)
			},
			{
				title: '检查部门',
				field: 'JCBM_V',
				align: 'center',
				valign: 'middle',
				visible: judge(3,true)
			},
			{
				title: '负责人',
				field: 'FZR_V',
				align: 'center',
				valign: 'middle',
				visible: judge(4,true)
			},
			{
				title: '联系电话',
				field: 'LXDH',
				align: 'center',
				valign: 'middle',
				visible: judge(5,true)
			},
			
			{
				title: '检查人',
				field: 'JCR_V',
				align: 'center',
				valign: 'middle',
				visible: judge(5,true)
			},
			{
				title: '检查时间',
				field: 'JCSJ_V',
				align: 'center',
				valign: 'middle',
				visible: judge(5,true)
			},
			{
				title: '操作',
				field: 'SYSTEMID',
				align: 'center',
				visible: judge(6,true),
				formatter: function(value, row, index) {
					var innerhtml = `
					<a class="a-col-font1" href="javascript:see('${row.SYSTEMID}')" title="查看"><i class="fa fa-search"></i></a>
					<a class="a-col-font1" href="javascript:update('${row.SYSTEMID}')" title="修改"><i class="fa fa-pencil-square-o"></i></a>
						<a class="a-col-font1" href="javascript:del('${row.SYSTEMID}')" title="删除"><i class="fa fa-trash"></i></a>
					`;
					return innerhtml;
				}
				
			}
		]
	});
	$(".dropdown-menu li label input").click(dropdownMenu);
}

function refreshTable() {
	var data_table = $("#data_table");
	data_table.bootstrapTable("refresh");
}
//删除
function del(systemid) {
	parent.layer.confirm('您是否要删除该条数据？', {
		skin: 'layui-layer-molv',
		btn: ['是', '否'], // 按钮
		shade: false
		// 不显示遮罩
	}, function() {
		var param = {
			"systemid": systemid
		}
		saveData(api_path + "/Common/Writer.i", "aqgl_aqyh_delete", param,
			function() {
				refreshTable();
			});
		parent.layer.msg('已删除', {
			icon: 1
		});
	}, function() {
		parent.layer.msg('已放弃', {
			icon: 2
		});
	});
}
//新增
function add() {
	parent.layer.open({
		type: 2,
		title: '安全隐患检查新增',
		shade: 0.8,
		area: ['1300px', '750px'],
		content: getRootPath() + '/jwxt/pages/aqgl/aqyhjc/aqyhjc_add.html?bjbh='+treeType.id,
		end: refreshTable
	});
}
//修改
function update(id) {
	parent.layer.open({
		type: 2,
		title: '安全隐患检查修改',
		shade: 0.8,
		area: ['1300px', '750px'],
		content: getRootPath() + '/jwxt/pages/aqgl/aqyhjc/aqyhjc_update.html?systemid=' + id,
		end: refreshTable
	});
}
//查看
function see(id) {
	parent.layer.open({
		type: 2,
		title: '安全隐患检查查看',
		shade: 0.8,
		area: ['1300px', '750px'],
		content: getRootPath() + '/jwxt/pages/aqgl/aqyhjc/aqyhjc_see.html?systemid=' + id,
		end: refreshTable
	});
}