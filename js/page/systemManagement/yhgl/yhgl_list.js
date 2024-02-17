var zhname;
$(document).ready(function() {
	$("#button_add").click(addData);
	$("#button_update").click(updateData);
	$("#button_del").click(deleteData);
	$("#button_to_role").click(gljs);
	$("#button_search").click(search);
	
	$("#searchForm").initDic();
	inittable()
});

function inittable(){
	$("#data_table").bootstrapTable({
		method : 'post', // 请求类型
		contentType : "application/json",
		dataType : "json",
		url : api_base + "/Common/Reader.i", // 请求地址
		pageSize : 10, // 每页显示数
		striped : true,
		idField : "SYSTEMID",
		pageNumber : 1, // 页码
		pageList : [ 15, 50, 100, 200, 500 ],
		sortOrder : "name",
		pagination : true,
		sidePagination : "server",
		showColumns : true,
		toolbar : "#searchForm",
		search : false, // 搜索框
		height : "550",
		queryParamsType : "undefined",
		clickToSelect : true, // 点击行选中
		onLoadSuccess : function() {
			permissionContorller();
		},
		// ajaxOptions:{
		// 	headers:{"P_token":sessionStorage.getItem("p_token")}
		// },
		onLoadError : tableErrorMsgHandler,
		queryParams : function(params) {
		var param = {};
		if ($("#param_loginname").val() != "") {
			param.loginname = $("#param_loginname").val().split("|")[0];
		}
		if ($("#param_dept").val() != "") {
			// var dept_num = check_param($("#param_dept").val().split("|")[0]);
			// if (dept_num == undefined) {
			// 	dept_num = $("#param_dept").val();
			// }
			// param.dept = dept_num;
			param.dept = $("#param_dept").val();
		}
		if ($("#gzdw").val() != "") {
			param.deptname = $("#gzdw").val();
		}
		if ($("#param_name").val() != "") {
			param.name = $("#param_name").val();
		}
		if ($("#param_idcardno").val() != "") {
				param.idcardno = $("#param_idcardno").val();
		}
		var postData = {
			"optid" : "sys_user_query",
			"page_index" : params.pageNumber,
			"page_size" : params.pageSize,
			"is_paging" : "1",
			"is_couting" : "1",
			"order" : "",
			"param" : param
		}
		return postData;
	},
	columns : [
		{
			title : '序列',
			formatter : function(value, row,
					index) {
				return index + 1;
			},
			align : 'center',
			valign : 'middle'
		},
		{
			title : '登录名',
			field : 'LOGINNAME',
			align : 'center',
			valign : 'middle'
		},
		{
			title : '姓名',
			field : 'NAME',
			align : 'center',
			valign : 'middle',
		},
		{
			title : '部门名称',
			field : 'DEPT_V',
			align : 'center'
		},
		{
			title : '身份证号码',
			field : 'IDCARDNO',
			align : 'center',
		},
		{
			title : '手机号码',
			field : 'SJHM',
			align : 'center',
		},
		{
			title : '使用状态',
			field : 'ALLOWABLE',
			align : 'center',
			formatter : function(value, row,
					index) {
				return value == 0 ? "正常" : "停用";
			}
		},
		{
			title : '操作',
			field : 'systemid',
			align : 'center',
			formatter : function(value, row,index) {
				var innerhtml = `
					<a class="a-col-font1" href="javascript:updateData('${row.SYSTEMID}')" title="修改用户"><i class="fa fa-pencil-square-o"></i></a>
					<a class="a-col-font1" href="javascript:deleteData('${row.SYSTEMID}')" title="删除用户"><i class="fa fa-trash"></i></a>
					<a class="a-col-font1" href="javascript:gljs('${row.SYSTEMID}')" title="用户关联角色"><i class="fa fa-group"></i></a>
					<a class="a-col-font1" href="javascript:mmcz('${row.SYSTEMID}')" title="密码重置"><i class="fa fa-refresh"></i></a>
				`;
				return innerhtml;
			}
		}]
	});
}

// 点击新增
function addData() {
	var parames = $("#param_dept").val()
	parent.layer.open({
		type : 2,
		title : '新增用户',
		shade : 0.8,
		area : [ '900px', '500px' ],
		content : getRootPath() + '/jwxt/systemManagement/yhgl/yhgl_add.html?param='+ parames +'&zhname=' + zhname, // iframe的url
		closeBtn : [ 1 ],
		end : refreshTable
	});
}
function refreshTable() {
	$('#data_table').bootstrapTable('refreshOptions', {pageNumber:1});
}
// 点击修改
function updateData(systemid) {
	parent.layer.open({
		type : 2,
		title : '修改用户',
		shade : 0.8,
		area : [ '900px', '500px' ],
		content : getRootPath() + '/jwxt/systemManagement/yhgl/yhgl_update.html?systemid='
				+ systemid,
		end : refreshTable
	});
}
// 点击修改
function deleteData(systemid) {
	parent.layer.confirm('您是否要删除该条数据？', {
		skin : 'layui-layer-molv',
		btn : [ '是', '否' ], // 按钮
		shade : false
	// 不显示遮罩
	}, function() {
		del("注销", systemid, getLocalUser().userid);
	});
}
// 删除用户
function del(zxyy, systemid, lastupdatedby) {
	var param = {
		"zxyy" : zxyy,
		"systemid" : systemid,
		"lastupdatedby" : lastupdatedby
	}
	saveData(api_base + "/Common/Writer.i", "sys_user_cancel", param,function(datas) {
		if(datas.result_state==0){
			parent.layer.msg('已删除',{icon:1});
		}else{
			parent.layer.msg('删除失败',{icon:2});
		}
		refreshTable();
	});
}
// 关联角色
function gljs(systemid) {
	parent.layer.open({
		type : 2,
		title : '用户关联角色',
		shade : 0.8,
		area : [ '800px', '500px' ],
		content : getRootPath() + '/jwxt/systemManagement/yhgl/yhgl_gljs.html?systemid='
				+ systemid, // iframe的url
		end : refreshTable
	});
}
function search() {
	$("#param_loginname").val($("#loginname").val());
	$("#param_name").val($("#name").val());
	$("#param_idcardno").val($("#idcardno").val());
	refreshTable();
}

// 查询树地址本级及下级
function check_param(num) {
	while (true) {
		if (num.substr(num.length - 1) == "0") {
			num = num.substr(0, num.length - 1);
		} else {
			break;
		}
	}
	if (num.length % 2 == 1) {
		num += "0";
	}
	return num;
}

function mmcz(systemid) {
	parent.layer.confirm('您是否要重置该用户密码？', {
		skin : 'layui-layer-molv',
		btn : [ '是', '否' ], // 按钮
		shade : false
	// 不显示遮罩
	}, function() {
		var param = {
			"systemid" : systemid,
		}
		saveData(api_base + "/Common/Writer.i", "mmcz", param, refresh);
		parent.layer.msg('已重置', {
			icon : 1
		});
	}, function() {
		parent.layer.msg('已放弃', {
			icon : 6
		});
	});
}

function refresh() {
	refreshTable();
}