var zTree, selectNodeId,deptname,deptcodem,deptid; 
let cokelist;
$(".jiooig").hide()
$(document).ready(function() {
	laydate.render({
		elem: '#starttime',
		type: 'datetime'
	});
	initTree();
	$("#button_searchxj").click(add);
	$("#button_searchxg").click(usop);
	$("#button_search").click(initTree);
});
function initTree(){
	let param = {
		// 'parentid':-1
	};
	if ($("#dwmc").val() != "") {
		param.deptname = $("#dwmc").val();
	}else{
		param.parentid = -1
	}
	var datelist = [];
	getDatas(api_path + "/Common/Reader.i", "dept_tree_querys", param, function(data) {
		var tree = data.result;
		if (data.result_state != "0") {
			alertInfor('加载菜单树失败', null);
			return;
		}
		for(let i = 0; i < tree.length; i++){
			let list = {name:'',systemid:'',code:'',open: true,children:[],id:''};
			list.name = tree[i].DEPTNAME;
			list.systemid = tree[i].SYSTEMID;
			list.code = tree[i].DEPTCODE;
			list.id = tree[i].PARENTID;
			datelist.push(list);
		}
		var treeData = [{
			"name": "中和职中",
			"systemid": "-1",
			"url": "",
			"code":'',
			"type": "",
			"parentid": "",
			open: true,
			children: datelist
		}];	
		var setting = {
			view: {
				selectedMulti: false,
			},
			callback: {
				onClick: function(event, treeId, treeList) {
					$("#bz").val("");//重置备注内容
					if(treeList.children.length < 1){
						initTrees(treeList.code,function(res){
							var zTreeObj = $.fn.zTree.getZTreeObj(treeId);
							let listbeit = []
							for(let t = 0; t < res.length; t++){
								let liste = {name:'',systemid:'',code:'',open: true,children:[],id:''};
								liste.name = res[t].DEPTNAME;
								liste.systemid = res[t].SYSTEMID;
								liste.code = res[t].DEPTCODE;
								liste.id = res[t].PARENTID;
								listbeit.push(liste)
							}
							if(listbeit.length >= 1){
								treeList = zTreeObj.addNodes(treeList,listbeit, false);
							}
						})
					}
					deptname=treeList.name
					if(treeList.systemid){
						selectNodeId = treeList.systemid;
						deptcode = treeList.code;
						deptid = treeList.pid;
					}else{
						deptid = -1;
						selectNodeId=-1;
						deptcode =-1;
					}
					inpurt(selectNodeId);
					userid()
				}
			},
			check: {
				enable: false
			},
			data: {
				simpleData: {
					enable: true
				},
				pIdKey:'pid', //父节点的ID
			},
			edit: {
				enable: false
			}
		};
		$.fn.zTree.init($("#permitTree"), setting, treeData);
		zTree = $.fn.zTree.getZTreeObj("permitTree");
		var nodes = zTree.getNodes();
		zTree.selectNode(nodes[0])
	})
}
function initTrees(id,erdd) {
	let param = {
		"parentid":id
	};
	getDatas(api_path + "/Common/Reader.i", "dept_tree_querys", param, function(data) {
		erdd(data.result)
	})
};





function add(id, type, url) {
	// if(selectNodeId == undefined ){
	// 	parent.layer.msg('请选择上级机构', {
	// 		icon: 0
	// 	});
	// }else{
		parent.layer.open({
			type: 2,
			title: '新增机构',
			shade: 0.8,
			area: ['900px', '500px'],
			content: getRootPath() + '/jwxt/systemManagement/jggl/jggl_add.html?id=' + id +'&node='+selectNodeId+'&name='+deptname+'&deptcode='+deptcode, // iframe的url
			end: function() {
				initTree();
			}
		});
	// }
}
function usop() {
	parent.layer.open({
		type: 2,
		title: '修改机构',
		shade: 0.8,
		area: ['900px', '500px'],
		content: getRootPath() + '/jwxt/systemManagement/jggl/jggl_update.html?id=' + selectNodeId, // iframe的url
		end: function() {
			initTree();
			inpurt(sessionStorage.getItem("usernameid"));
			userid();
		}
	});
}
function mclose() {
	var index = window.parent.parent.layer.getFrameIndex(window.name); // 先得到当前iframe层的索引
	parent.parent.layer.close(index); // 再执行关闭
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
function inpurt(id,code) {
	let param = {};
	param.systemid = id;
	
	let datas = {
		"optid": "dept_yc_select",
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
			$("input").val('');		
			$("textarea").val('');		
			$("#searchForm").setForm(data);															
		}
	})
}
function del() {
	parent.layer.confirm('您是否要删除该条数据？', {
		skin: 'layui-layer-molv',
		btn: ['是', '否'], // 按钮
		shade: false // 不显示遮罩
	}, function() {
		var param = {
			"systemid": selectNodeId,			
		}
		saveData(api_path + "/Common/Writer.i", "dept_yc_delete", param, function(datas) {
			if (datas.result_state == 0) {
				parent.layer.msg('已删除', {
					icon: 1
				});
			}else if(datas.result_state == 5101){
				parent.layer.msg('当前部门有下级部门，请勿删除！', {
					icon: 2
				});
			}else if(datas.result_state == 5102){
				parent.layer.msg('当前部门有在职人员，请勿删除！', {
					icon: 2
				});
			}else{
				parent.layer.msg('删除失败', {
					icon: 2
				});
			}
			initTree();
		});
	});
}
function userid(id) {
	let param = {};
	param.parentid = deptid;
	let datas = {
		"optid": "dept_sj_select",
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
			if(data.result.length>=1){
			$("#name").val(data.result[0].NAME)
			}else{
				$("#name").val(" ")
			}
		}
	})
}