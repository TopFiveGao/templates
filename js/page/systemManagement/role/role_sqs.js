let nums;
$(document).ready(function() {
	$("#button_add").click(getNodes);
	initTree();
});
function initTree() {
	let tateme = [];
	getDatas(api_base + "/Common/Reader.i", "dictionary", {kind: "fllx"},function(date){
		for(let i = 0,len = date.result.length; i < len; i++){
			let obj = {
				name : date.result[i].DETAIL,
				code : date.result[i].CODE,
				fllx : true,
				children : []
			};
			tateme.push(obj);
		};
		getDatas(api_base + "/Common/Reader.i", "qx_js_select", {jsid: getUrlParam("systemid")},function(sred){
			nums = sred.result
			
			getDatas(api_base + "/Common/Reader.i", "qx_insert_select", {jsid: getUrlParam("systemid")},function(res){
				for(let w = 0,o = tateme.length; w < o; w++){
					for(let s = 0,k = res.result.length; s < k; s++){
						if(tateme[w].code == res.result[s].FLLX){
							let list = {
								name : res.result[s].MC,
								systemid : res.result[s].SYSTEMID,
								checked : false
							};
							tateme[w].children.push(list);
						};	
					};
				};
				for (let p = 0; p < nums.length; p++) {
					for (let t = 0; t < tateme.length; t++) {
						for (let x = 0; x < tateme[t].children.length; x++) {
							if (nums[p].SYSTEMID == tateme[t].children[x].systemid) {
								tateme[t].children[x].checked = true;
							}
						}
					}
				}
				if (res.result_state != "0") {
					parent.layer.alert('加载菜单树失败');
					return;
				};
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
				};
				$.fn.zTree.init($("#permitTree"), setting, tateme);
				$.fn.zTree.getZTreeObj("permitTree").expandAll(true);
			})
			
			
			
			
		});
	})
}

function beforeCheck() {}

function onCheck(event, treeId, treeNode) {
	//$.fn.zTree.getZTreeObj("permitTree").checkNode(treeNode, !treeNode.checked, true)
}
function getNodes() {
	var zTree = $.fn.zTree.getZTreeObj("permitTree");
	var changedNodes = zTree.getChangeCheckedNodes();
	console.log(zTree)
	console.log(changedNodes)
	var addData = [];
	var delData = [];
	for (var i = 0; i < changedNodes.length; i++) {
		var treeNode = changedNodes[i];
		if (treeNode.checked && treeNode.systemid != null) {
			let ghnr = {};
			ghnr.rqid = treeNode.systemid;
			ghnr.jsid = getUrlParam("systemid");
			addData.push(ghnr);
		} else if (treeNode.systemid != null) {
			let ghnr = {};
			ghnr.rqid = treeNode.systemid;
			// ghnr.jsid = getUrlParam("systemid");
			delData.push(ghnr);
			// delData.push(treeNode.systemid);
		}
	}
	if (addData.length != 0) {
		//保存添加
		saveData(api_base + "/Common/Writer.i", "qx_insert", {
			"filesr": addData,
		}, function(data) {
			if (data.result_state == "0") {
				if (delData.length != 0) {
					saveData(api_base + "/Common/Writer.i", "qx_delete", {
						"filesr": delData,
						// "jsid": getUrlParam("systemid")
					}, function(data_) {
						if (data_.result_state == "0") {
							parent.layer.alert('保存成功');
							initTree();
						} else {
							parent.layer.alert('保存失败');
						}
					});
				} else {
					parent.layer.alert('保存成功');
					initTree();
				}
			} else {
				parent.layer.alert('保存失败');
			}
		});
	} else {
		if (delData.length != 0) {
			saveData(api_base + "/Common/Writer.i", "qx_delete", {
				"filesr": delData,
				// "roleid": getUrlParam("systemid")
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
