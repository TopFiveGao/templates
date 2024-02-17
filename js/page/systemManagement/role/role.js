$(document).ready(function(){
		var data_table = $("#data_table");
		var param_dept ="";
		data_table.bootstrapTable({
	    	method: 'post', //请求类型
	        contentType: "application/json",
	        dataType: "json",
	        url: api_base+"/Common/Reader.i", //请求地址
	        pageSize: 10, //每页显示数
	        striped: true,
	        idField:"SYSTEMID",
	        pageNumber:1, //页码
	        pageList: [10, 50, 100, 200, 500, 1000,5000],
	        sortOrder:"name",
	        pagination: true,
	        sidePagination: "server",
	        showColumns:true,
	        toolbar:"#searchForm",
	        //showRefresh:true,
	        search:false, //搜索框
	        height:"550",
	        //showColumns:true,
	        // showToggle:true,
			// ajaxOptions:{
			// 	headers:{"P_token":sessionStorage.getItem("p_token")}
			// },
	        queryParamsType:"undefined",
	        clickToSelect:true, //点击行选中
	        onLoadSuccess:function(){
	        },
	        onLoadError: tableErrorMsgHandler,
	        queryParams:function(params){
	        	var param = {};
	        	if($("#param-name").val() != ""){
	        		param.name = $("#param-name").val();
	        	}
	        	var postData = {
					"optid": "sys_role_query",
					"page_index": params.pageNumber,
					"page_size": params.pageSize,
					"is_paging": "1",
					"is_couting": "1",
					"order": "",
					"param":param
	        	}
	        	return postData;
	        },
	        columns: [
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
	                      title: '角色名',
	                      field: 'NAME',
	                      align: 'center',
	                      valign: 'middle'
	             }, 
	                  {
	                      title: '创建人',
	                      field: 'CREATOR',
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
	                      field: 'SYSTEMID1',
	                      align: 'center',
	                      formatter:function(value,row,index){
							var innerhtml = `
							<div style="width: 200px;">
								<a class="a-col-font1" href="javascript:updateData('${row.SYSTEMID}')" title="修改角色"><i class="fa fa-pencil-square-o"></i></a>
								<a class="a-col-font1" href="javascript:deleteData('${row.SYSTEMID}')" title="角色注销"><i class="fa fa-trash"></i></a>
								<a class="a-col-font1" href="javascript:gluser('${row.SYSTEMID}')" title="关联用户"><i class="fa fa-group"></i></a>
								<a class="a-col-font1" href="javascript:roleqx('${row.SYSTEMID}')" title="角色授权权限"><i class="fa fa-sitemap"></i></a>
								<a class="a-col-font1" href="javascript:roleqxs('${row.SYSTEMID}')" title="容器管理权限"><i class="fa fa-newspaper-o"></i></a>
							</div>
							`;
							return innerhtml;
								// <a class="a-col-font1" href="javascript:roleqxs('${row.SYSTEMID}')"><i class="fa fa-newspaper-o"></i> portallet权限管理</a>
	                      }
	                  }
	              ]
	      });
		});
 $(document).ready(function() {
 	$("#button_add").click(addData);
 	$("#button_update").click(updateData);
 	$("#button_del").click(deleteData);
 	$("#button_search").click(search);
 	$("#button_gluser").click(gluser);
 	$("#button_roleqx").click(roleqx);
 });
//点击新增
function addData(){
	parent.layer.open({
		type: 2,
		title: '新增角色',
		shade: 0.8,
		area: ['900px', '400px'],
		content: getRootPath()+'/jwxt/systemManagement/role/role_add.html', //iframe的url
		end:refreshTable
	});
}
function refreshTable(){
	var data_table = $("#data_table");
	data_table.bootstrapTable("refresh");
}
//点击修改
function updateData(systemid1){
	var data_table = $("#data_table");
	var selects = data_table.bootstrapTable('getSelections');
	var selected = selects[0];
	parent.layer.open({
		    type: 2,
		    title: '修改角色',
		    shade: 0.8,
		    area: ['900px', '400px'],
		    content: getRootPath()+'/jwxt/systemManagement/role/role_update.html?systemid='+systemid1, //iframe的url
		    end:refreshTable
	});
}
//点击修改
function deleteData(systemid){
	parent.layer.confirm('您是否要删除该条数据？', {
		skin: 'layui-layer-molv',
    btn: ['是','否'], //按钮
    shade: false //不显示遮罩
	}, function(){
		del("注销",systemid,"admin");
	});
}
//删除用户
function del(zxyy, systemid, lastupdatedby) {
	var param = {
		"systemid": systemid,
		"lastupdatedby": lastupdatedby
	}
	saveData(api_base+"/Common/Writer.i", "sys_role_cancel", param, function(datas) {
		if(datas.result_state==0){
			parent.layer.msg('已删除', {icon: 1});
		}else{
			parent.layer.msg('删除失败', {icon: 2});
		}
		refreshTable();
	});
}
//关联用户
function gluser(systemid1) {
	parent.layer.open({
		type : 2,
		title : '关联用户',
		shade : 0.8,
		area : [ '1000px', '720px' ],
		content : getRootPath() + '/jwxt/systemManagement/role/role_gluser.html?systemid='+ systemid1, // iframe的url
		end : refreshTable
	});
}
// 授权
function roleqx(systemid1) {
	parent.layer.open({
				type : 2,
				title : '角色授权',
				shade : 0.8,
				area : [ '800px', '600px' ],
				content : getRootPath() + '/jwxt/systemManagement/role/role_sq.html?systemid='
						+ systemid1, // iframe的url
				end : refreshTable
	});
}
function roleqxs(systemid1) {
	parent.layer.open({
				type : 2,
				title : '角色portallet授权',
				shade : 0.8,
				area : [ '800px', '600px' ],
				content : getRootPath() + '/jwxt/systemManagement/role/role_sqs.html?systemid='
						+ systemid1, // iframe的url
				end : refreshTable
	});
}
//测试
function search(){
		$("#param_name").val($("#name").val());
		refreshTable();
}