var zTree, selectNodeId;
$(document).ready(function() {
	initTree();
	$("#button_search").click(refreshTable);
	inittable();
});

function initTree(motPoe) {
	// 加载数据
	getDatas(api_base + "/Common/Reader.i", "cd_query", {}, function(data) {
		if (data.result_state != "0") {
			alertInfor('加载菜单树失败', null);
			return;
		};
		var setting = {
			view: {
				selectedMulti: false,
			},
			callback: {
				onClick: function(event, treeId, treeNode) {
					selectNodeId = treeNode.SYSTEMID;
					setTimeout(refreshTable, 200);
				}
			},
			check: {
				enable: false
			},
			data: {
				simpleData: {
					enable: true
				}
			},
			edit: {
				enable: false
			}
		};	
		for (var iio = 0; iio < data.result.length ;iio++) {
			if(data.result[iio].name == motPoe){
				data.result[iio].open = true;
			}
		}
		var treeData = [{
			"name": "菜单",
			"SYSTEMID": "-1",
			"url": "",
			"type": "",
			"parentid": "",
			open: true,
			children: data.result
		}];
		$.fn.zTree.init($("#permitTree"), setting, treeData);
		zTree = $.fn.zTree.getZTreeObj("permitTree");		
		var nodes = zTree.getNodes();
		zTree.selectNode(nodes[0])		
	});
}
function add(id, type, url) {
	var selectnodes = zTree.getSelectedNodes();	
	var motPoe = selectnodes[0].name
	if (selectnodes.length < 1) {
		alertInfor("请选择树节点!", null);
		return
	}
	var node = selectnodes[0];
	if (node.type == "03") {
		alertInfor("不能再添加下一级", null);
		return;
	};

	parent.layer.open({
		type: 2,
		title: '新增菜单',
		shade: 0.8,
		area: ['900px', '400px'],
		content: getRootPath() + '/jwxt/systemManagement/menu/menu_add.html?id=' + escape(node.SYSTEMID), // iframe的url
		// end:refreshTable
		end: function() {
			initTree(motPoe);
			refreshTable();			
		}
	});
}
function mclose() {
	var index = window.parent.parent.layer.getFrameIndex(window.name); // 先得到当前iframe层的索引
	parent.parent.layer.close(index); // 再执行关闭
}

function update(id, parentid) {
	var selectnodes = zTree.getSelectedNodes();
	var motPoe = selectnodes[0].name
	parent.layer.open({
		type: 2,
		title: '修改菜单',
		shade: 0.8,
		area: ['900px', '400px'],
		content: getRootPath() + '/jwxt/systemManagement/menu/menu_update.html?id=' + id + "&parentid=" + parentid, // iframe的url
		end: function() {
			refreshTable();			
			initTree(motPoe);
		}
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
		saveData(api_base + "/Common/Writer.i", "cd_delete", param, function(datas) {
			if (datas.result_state == 0) {
				parent.layer.msg('已删除', {
					icon: 1
				});
				delTreeNodesById(id);
			} else {
				parent.layer.msg('删除失败', {
					icon: 2
				});
			}
			refreshTable();
		});
	});
}

function addData() {
	parent.layer.open({
		type: 2,
		title: '新增机构',
		shade: 0.8,
		area: ['900px', '400px'],
		content: getRootPath() + '/jwxt/jggl/jggl_add.html?parentid=' + escape($('#param_dept').val()), //iframe的url		
		end: function() {
			initTree();
			refreshTable();
		}
	});
}

function delTreeNodesById(id) {
	var node = zTree.getSelectedNodes()[0];
	for (var i = 0; i < node.children.length; i++) {
		var children = node.children[i];
		if (children.SYSTEMID == id) {
			zTree.removeNode(children);
		}
	}
}
function inittable() {
	var data_table = $("#data_table");
	data_table.bootstrapTable({
		method: 'post', // 请求类型
		dataType: "json",
		url: api_base + "/Common/Reader.i", // 请求地址
		pageSize: 10, // 每页显示数
		crossDomain: true,//跨域
		striped: true,
		idField: "systemid",
		pageNumber: 1, // 页码
		pageList: [10, 50, 100, 200, 500, 1000,5000],
		sortOrder: "name",
		pagination: true,
		sidePagination: "server",
		showColumns: true,
		toolbar: "#searchForm",
		search: false, // 搜索框
		height: "550",		
		queryParamsType: "undefined",
		clickToSelect: true, // 点击行选中
		onLoadSuccess: function() {},
		onLoadError: tableErrorMsgHandler,
		// ajaxOptions:{
		// 	// headers:{"P_token":sessionStorage.getItem("p_token")}
		// },
		queryParams: function(params) {
			var param = {};

			
			
			if (selectNodeId) {
				param.parentid = selectNodeId;
			}
			if ($("#name").val() != "") {
				param.name = $("#name").val();
			}
			var postData = {
				"optid": "cd_query_siple",
				"page_index": params.pageNumber,
				"page_size": params.pageSize,
				"is_paging": "1",
				"is_couting": "1",
				"order": "",
				"param": param,				
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
				title: '菜单名称',
				field: 'NAME',
				align: 'center',
				valign: 'middle'
			}, {
				title: '类型',
				field: 'TYPE_V',
				align: 'center',
				valign: 'middle',
			}, {
				title: '排序',
				field: 'ORDERBY',
				align: 'center',
				valign: 'middle',
			}, {
				title: 'URL',
				field: 'M_URL',
				align: 'center',
				valign: 'middle',
			}, {
				title: '父菜单',
				field: 'PARENTNAME',
				align: 'center',
				valign: 'middle',
			},
			{
				title: '创建时间',
				field: 'CRTIME',
				align: 'center'
			},
			{
				title: '操作',
				field: 'SYSTEMID',
				align: 'center',
				formatter: function(value, row, index) {
					var innerhtml = `
						<a class="a-col-font1" href="javascript:update('${row.SYSTEMID}','${row.PARENTID}')" title="修改"><i class="fa fa-pencil-square-o"></i></a>
						<a class="a-col-font1" href="javascript:del('${row.SYSTEMID}')" title="删除"><i class="fa fa-trash"></i></a>
					`;
					if (row.TYPE == 03) {
						innerhtml += `<a class="a-col-font1" href="javascript:gloptid('${row.SYSTEMID}')" title="关联OPTID"><i class="fa fa-sitemap"></i> </a>`;
					}
					return innerhtml;
				}
			}
		]
	});
}

function gloptid(systemid) {
	parent.layer.open({
		type: 2,
		title: '关联OPTID',
		shade: 0.8,
		area: ['1000px', '720px'],
		content: getRootPath() + '/jwxt/systemManagement/menu/optidtomenu.html?menuid=' + systemid, // iframe的url
	});
}
function refreshTable() {
	$('#data_table').bootstrapTable('refreshOptions', {		
		pageNumber: 1,
		crossDomain: true,
	});
}
