$(document).ready(function() {
	$("#button_add").click(getNodes);
	initTree();
});

function initTree() {
	var postData = {
		"optid": "query_menu_byrole",
		"page_index": "1",
		"page_size": "1",
		"is_paging": "0",
		"is_couting": "0",
		"order": "",
		"param": {roleid:getUrlParam("systemid")}
	};
	$.ajax({
		type: "POST",
		url: api_base +"/Common/Reader.i",
		contentType: "application/json",
		dataType: "json",
		data: JSON.stringify(postData),
		success: function(data){
			if(data.result_state!="0"){
					parent.layer.alert('加载菜单树失败');
					return;
				}
				var setting = {
					view: {
						selectedMulti: false
					},
					check: {
						enable: true,
						chkboxType: {
							"Y": "ps",
							"N": "ps"
						}
					},
					data: {
						simpleData: {
							enable: true
						}
					},
					callback: {
						beforeCheck: beforeCheck,
						onCheck: onCheck
					}
				}
				$.fn.zTree.init($("#permitTree"), setting, data.result);
				zTree = $.fn.zTree.getZTreeObj("permitTree");
				var nodes = zTree.getNodes();
				zTree.selectNode(nodes[0])	
				// $.fn.zTree.getZTreeObj("permitTree").expandAll(true) //默认展开所有节点
		},
		//error:function(data){parent.layer.alert(data);},
		beforeSend: function() {
			layer.load();
		},
		complete: function() {
			layer.closeAll('loading');
		},
	});
}
function beforeCheck() {}
function onCheck(event, treeId, treeNode) {
	//$.fn.zTree.getZTreeObj("permitTree").checkNode(treeNode, !treeNode.checked, true)
}
function getNodes() {
	var zTree = $.fn.zTree.getZTreeObj("permitTree");
	var changedNodes = zTree.getChangeCheckedNodes();
	var addData = [];
	var delData = [];
	for (var i = 0; i < changedNodes.length; i++) {
		var treeNode = changedNodes[i];
		if (treeNode.checked) {
			addData.push(treeNode.SYSTEMID);
		} else {
			delData.push(treeNode.SYSTEMID);
		}
	}
	if(addData.length!= 0){
		//保存添加
		saveData(api_base + "/Common/Writer.i", "sys_roletomenu_add", {
			"menuids": addData,
			"roleid": getUrlParam("systemid"),
			"creator": getLocalUser().userid
		}, function(data) {
			if (data.result_state == "0") {
			if(delData.length !=0){
				saveData(api_base + "/Common/Writer.i", "sys_roletomenu_del", {
					"menuids": delData,
					"roleid": getUrlParam("systemid")
				}, function(data_) {
					if (data_.result_state == "0") {
						parent.layer.alert('保存成功');
						initTree();
					} else {
						parent.layer.alert('保存失败');
					}
				});
				}else{
					parent.layer.alert('保存成功');
						initTree();
				}
			} else {
				parent.layer.alert('保存失败');
			}
		});
	}else{
		if(delData.length !=0){
		saveData(api_base + "/Common/Writer.i", "sys_roletomenu_del", {
				"menuids": delData,
				"roleid": getUrlParam("systemid")
			}, function(data_) {
				if (data_.result_state == "0") {
					parent.layer.alert('保存成功');
					initTree();
				} else {
					parent.layer.alert('保存失败');
				}
			});
			}
	}
}

function mclose() {
	var index = window.parent.parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
	parent.parent.layer.close(index); //再执行关闭 
}