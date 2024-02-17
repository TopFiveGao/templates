var zTree, selectNodeId, datpp, ba,fumr;
ba = 0;
$(document).ready(function() {
	$("#searchForm").initDic();
	initTree();
	inittable();
	$("#button_search").click(refreshTable);
	$("#button_add").click(add);
});
function initTree(value) {
	// 加载数据
	getDatas(api_path + "/Common/Reader.i", "info_select_a", {}, function(res) {
		if (res.result_state != "0") {
			alertInfor('加载菜单树失败', null);
			return;
		}
		let datas = [];
		let children = [];
		for (let i = 0; i<res.result.length; i++) {
			if (res.result[i].PARENTID == '-1') {
				datas.push(res.result[i]);			
			}			
			res.result[i].name = res.result[i].MLMX;
			res.result[i].jdlx = res.result[i].SYSTEMID;
		}	
		for (let x = 0; x<datas.length; x++) {
			datas[x].children = [];
			for (let i = 0; i<res.result.length; i++) {
				if (res.result[i].PARENTID == datas[x].jdlx) {
					datas[x].children.push(res.result[i])
				}
			}
		}		
		var treeData = [{
			"name": "主栏目",
			"SYSTEMID": "-1",
			"url": "",
			"type": "",
			"parentid": "",
			open: true,
			children: datas
		}];		
		var setting = {
			view: {
				selectedMulti: false,
			},
			callback: {
				onClick: function(event, treeId, treeNode) {
					selectNodeId = treeNode.SYSTEMID;
					ba = selectNodeId;
					fumr = treeNode.MLMX;
					setTimeout(refreshTable, 200);
				}
			},
			check: {
				enable: false
			},
			data: {
				simpleData: {
					enable: true
				},
				pIdKey: 'pid', //父节点的ID
			},
			edit: {
				enable: false
			}
		};	
		$.fn.zTree.init($("#permitTree"), setting, treeData);
		if(!selectNodeId) fuzzySearch('permitTree', '#key', true, false, true);//初始化时添加模糊查询
		zTree = $.fn.zTree.getZTreeObj("permitTree");
		var nodes = zTree.getNodes();
		zTree.selectNode(nodes[0])
	});
}
function add(id, type, url) {
	if (ba <= '4') {
		parent.layer.msg('请选栏目', {
			icon: 0
		});
		return
	}
	parent.layer.open({
		type: 2,
		title: '新增信息',
		shade: 0.8,
		area: ['1200px', '800px'],
		content: getRootPath() + '/jwxt/systemManagement/xinxi/xinxi_add.html?ba=' + ba +"&fumr=" + fumr +"&mi=" + ba,// iframe的url     ?id=' + escape(node.SYSTEMID)
		end: function() {
			refreshTable();
		}
	});
}
function mclose() {
	var index = window.parent.parent.layer.getFrameIndex(window.name); // 先得到当前iframe层的索引
	parent.parent.layer.close(index); // 再执行关闭
}
function update(id,lamu) {
	parent.layer.open({
		type: 2,
		title: '修改菜单',
		shade: 0.8,
		area: ['1200px', '800px'],
		content: getRootPath() + '/jwxt/systemManagement/xinxi/xinxi_update.html?id=' + id + "&lamu=" + lamu , // iframe的url
		end: refreshTable
	});
}
function see(id,lamu) {
	parent.layer.open({
		type: 2,
		title: '预览查看',
		shade: 0.8,
		area: ['1100px', '800px'],
		content: getRootPath() + '/jwxt/systemManagement/xinxi/xinxi_see.html?id=' + id + "&lamu=" + lamu , // iframe的url
		end: refreshTable
	});
}
function honm() {
	getDatas(api_path + "/Common/Reader.i", "select_key",{}, function(data) {
	 	ele = data.result[0].SYSTEMID
	})
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
		saveData(api_path + "/Common/Writer.i", "info_delete", param, function(datas) {
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
function inittable() {
	var data_table = $("#data_table");
	data_table.bootstrapTable({
		method: 'post', // 请求类型
		contentType: "application/json",
		dataType: "json",
		url: api_path + "/Common/Reader.i", // 请求地址
		pageSize: 10, // 每页显示数
		crossDomain: true, //跨域
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
		queryParams: function(params) {
			var param = {};
			if(selectNodeId){
				param.id = selectNodeId;	
			};
			if($('#bt').val() != ''){
				param.bt = $('#bt').val();	
			};
			if($('#creator').val() != ''){
				param.creator = $('#creator').val();	
			};
			if($('#time').val() != ''){
				param.time = $('#time').val();	
			};
			if($('#times').val() != ''){
				param.times = $('#times').val();	
			};
			
			if($('#fbzt').val() != ''){
				param.fbzt = $('#fbzt').val();	
			};
			var postData = {
				"optid": "info_select",
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
				field: 'BT',
				align: 'center',
				valign: 'middle',
				formatter: function(value, row, index) {
					
					let textdata = ''
					if(row.BT.length < 15){
						textdata = row.BT;
					}else{
						textdata = row.BT.slice(0,15);
						textdata += '...'
					}
					
					
					var innerhtml = `<div title = "${row.BT}"> ${textdata} </div>`
					return innerhtml;
				}
			}, {
				title: '摘要',
				field: 'ZY',
				align: 'center',
				valign: 'middle',
				formatter: function(value, row, index) {
					
					let textdata = ''
					if(row.ZY.length < 15){
						textdata = row.ZY;
					}else{
						textdata = row.ZY.slice(0,15);
						textdata += '...'
					}
					
					var innerhtml = `<div title = "${row.ZY}"> ${textdata} </div>`
					return innerhtml;
				},
				visible : false
			}, {
				title: '栏目',
				field: 'MLMX',
				align: 'center',
				valign: 'middle',
			}, {
				title: '创建人',
				field: 'CREATOR',
				align: 'center',
				valign: 'middle',
			},
			{
				title: '创建时间',
				field: 'CREATETIME',
				align: 'center'
			},
			{
				title: '发布时间',
				field: 'FBSJ',
				align: 'center'
			},
			{
				title: '状态',
				field: 'FBZT_V',
				align: 'center',
				valign: 'middle',
			},
			{
				title: '操作',
				field: 'SYSTEMID',
				align: 'center',
				formatter: function(value, row, index) {
					
					
					var innerhtml = `<a class="a-col-font1" href="javascript:see('${row.SYSTEMID}')" title="查看"><i class="fa fa-folder-open"></i></a>`;
					
					if(row.FBZT != '02'){  //撤销
						innerhtml += `<a class="a-col-font1" href="javascript:update('${row.SYSTEMID}','${row.MLMX}')" title="修改"><i class="fa fa-pencil-square-o"></i></a>
							<a class="a-col-font1" href="javascript:del('${row.SYSTEMID}')" title="删除"><i class="fa fa-trash"></i></a>
							<a class="a-col-font1" href="javascript:dele('${row.SYSTEMID}','02')" title="发布"><i class="fa fa-send"></i></a>`;
					}else{
						innerhtml += `<span class="a-col-font1-none" title="修改"><i class="fa fa-pencil-square-o"></i></span>
							<span class="a-col-font1-none" title="删除"><i class="fa fa-trash"></i></span>
							<span class="a-col-font1-none" title="发布"><i class="fa fa-send"></i></span>`
					};
					
					if(row.FBZT == '02'){  //已发布
						innerhtml += `<a class="a-col-font1" href="javascript:dele('${row.SYSTEMID}','03')" title="撤销"><i class="fa fa-reply"></i></a>`;
					}else{
						innerhtml += `<span class="a-col-font1-none" title="撤销"><i class="fa fa-reply"></i></span>`
					}
					return innerhtml;
				}
			}
		]
	});
}
// 修改状态
function dele(id, maost) {
	var textsd;
	if (maost == '01') {
		textsd = '发布'
	};
	if (maost == '02') {
		textsd = '发布'
	};
	if (maost == '03') {
		textsd = '撤销'
	};
	parent.layer.confirm('即将' + textsd + '消息是否继续？', {
		skin: 'layui-layer-molv',
		btn: ['是', '否'], // 按钮
		shade: false // 不显示遮罩
	}, function() {
		var param = {
			"systemid": id,
			"fbzt": maost,
			"lastupdatedby": getLocalUser().userid
		}
		saveData(api_path + "/Common/Writer.i", "info_update_zt", param, function(datas) {
			if (datas.result_state == 0) {
				parent.layer.msg('已' + textsd, {
					icon: 1
				});
			} else {
				parent.layer.msg(textsd + '失败', {
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
};
