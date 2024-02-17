let selectNodeId = '-1';
$(document).ready(function() {
	initTree();
	formDataBinding();
	$("#button_searchxj").click(add);
	$("#button_searchxg").click(usop);
	$("#button_del").click(del);
});
function initTree() {
	var postData = {
		"optid": "dept_tree_querys",
		"param": {
			// "parentid" : -1
		}
	};
	$.ajax({
		type: "POST",
		url: api_path + "/Common/Reader.i",
		contentType: "application/json",
		dataType: "json",
		data: JSON.stringify(postData),
		success: function(data) {
			if (data.result_state != "0") {
				alertInfor('加载菜单树失败', null);
				return;
			}
			var tree = data.result;
			// var treeData = [{
			// 	"name": "四川省成都市中和职业中学",
			// 	"id": "-1",
			// 	"pId": "0",
			// 	"parentid" : "",
			// 	"open": true,
			// 	'systemid' : '-1'
			// }];
			var treeData = [];
			for (let i = 0, len = tree.length; i < len; i++) {
				
				console.log(tree[i].PARENTID)
				
				let obj = {
					'name': tree[i].DEPTNAME,
					'id': tree[i].DEPTCODE,
					'pId': tree[i].PARENTID,
					'deptcode': tree[i].DEPTCODE,
					'systemid' : tree[i].SYSTEMID,
					'open': tree[i].SYSTEMID == "-1" ? true : false,
					// 'isParent': true
				};
				treeData.push(obj);
			};
			const ajaxDataFilter = (treeId, parentNode, responseData)=>{
				let attr = [];
				if (responseData.result) {
					for(var i =0; i < responseData.result.length; i++) {
						let obj = {
							name: responseData.result[i].NAME,
							id: responseData.result[i].ID,
							pId: responseData.result[i].PID,
							isParent: true
						};
						attr.push(obj);
					}
				}
			    return attr;
			};
			var setting = {
				view: {
					showIcon: true,
					selectedMulti: false
				},
				async: {
					//启用异步加载节点
					enable: true,
					url:api_path + "/Common/Reader.i",
					otherParam: {},
					contentType: "application/json; charset=UTF-8",
					dataFilter: ajaxDataFilter //防止undefined节点 bug
				},
				callback: {
					// beforeAsync: function(event, treeId, treeList){
					// 	if(treeId.id.length == 1){
					// 		zTree.setting.async.otherParam = {"optid":"ssgl_supercode_select","param": {"supercode" : treeId.id}};
					// 	}else{
					// 		zTree.setting.async.otherParam = {"optid":"ssgl_ssbh_select","param": {"ssbh" : treeId.id}};
					// 	}
						
					// },
					onClick: function(event, treeId, treeList) {
						
						
						if(treeList.systemid == "-1"){
							$(".ibox-tools").addClass("hide")
						}else{
							$(".ibox-tools").removeClass("hide")
						}
						
						
						selectNodeId = treeList.systemid
						formDataBinding();	
					}
				},
				check: {
					enable: false
				},
				data: {
					simpleData: {
						enable: true
					},
					pIdKey: 'pId', //父节点的ID
				},
				edit: {
					enable: false
				}
			};
			$.fn.zTree.init($("#permitTree"), setting, treeData);
			fuzzySearch('permitTree', '#key', true, false, true); //初始化时添加模糊查询
			var zTree = $.fn.zTree.getZTreeObj("permitTree");
			var nodes = zTree.getNodes();
			zTree.selectNode(nodes[0])
		},
		beforeSend: function() {
			layer.load();
		},
		complete: function() {
			layer.closeAll('loading');
		},
	});
}
function add() {
	parent.layer.open({
		type: 2,
		title: '新增机构',
		shade: 0.8,
		area: ['900px', '500px'],
		content: getRootPath() + '/jwxt/systemManagement/jggl/jggl_add.html', // iframe的url
		end: function() {
			initTree();
		}
	});
}
function usop() {
	if(selectNodeId != "-1"){
		parent.layer.open({
			type: 2,
			title: '修改机构',
			shade: 0.8,
			area: ['900px', '500px'],
			content: getRootPath() + '/jwxt/systemManagement/jggl/jggl_update.html?id=' + selectNodeId, // iframe的url
			end: function() {
				initTree();
				formDataBinding();
			}
		});
	}else{
		parent.layer.msg('根节点不能修改', {
			icon: 0
		});
	}
}
/*optid单条信息查询*/
function formDataBinding(){
	var param = {
		"systemid": selectNodeId
	}
	getData(api_path+"/Common/Reader.i", "dept_yc_select", param, function(result) {
		$(".col-sm-8>input").val("");
		$("#bz").val("");
		$("#dataForm").setForm(result);
	});
}
function del() {
	if(selectNodeId != "-1"){
		parent.layer.confirm('您是否要删除该条数据？', {
			skin: 'layui-layer-molv',
			btn: ['是', '否'], // 按钮
			shade: false // 不显示遮罩
		}, function() {
			
			
			// deleteSelectDetp()
			
			
			
			var param = {
				"systemid": selectNodeId,			
			}
			saveData(api_path + "/Common/Writer.i", "dept_yc_delete", param, function(datas) {
				if (datas.result_state == '0') {
					parent.layer.msg('已删除', {
						icon: 1
					});
				}else if(datas.result_state == '400'){
					parent.layer.msg('当前部门有下级部门或有在职人员！', {
						icon: 0
					});
				}else{
					parent.layer.msg('删除失败', {
						icon: 2
					});
				}
				initTree();
				formDataBinding();
			});
		});
	}else{
		parent.layer.msg('根节点不能删除', {
			icon: 0
		});
	}
}
// function deleteSelectDetp(){
// 	getData(api_path+"/Common/Reader.i", "dept_delete_selectdetp", {"systemid": selectNodeId}, function(result) {
// 		console.log(result)
// 	});
// }

