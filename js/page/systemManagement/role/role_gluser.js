$(document).ready(function(){
		var data_table_unselect = $("#data_table_unselect");
		data_table_unselect.bootstrapTable({
	    	method: 'post', //请求类型
	        contentType: "application/json",
	        dataType: "json",
	        url: api_base+"/Common/Reader.i", //请求地址
	        pageSize: 15, //每页显示数
	        striped: true,
	        idField:"SYSTEMID",
	        pageNumber:1, //页码
	        pageList: [10, 50, 100, 200, 500, 1000,5000],
	        sortOrder:"name",
	        pagination: true,
	        sidePagination: "server",
	        toolbar:"#exampleTableEventsToolbar1",
	        search:false, //搜索框
	        height:"500",
	        queryParamsType:"undefined",
	        clickToSelect:true, //点击行选中
	        onLoadSuccess:function(){
	        },
			// ajaxOptions:{
			// 	headers:{"P_token":sessionStorage.getItem("p_token")}
			// },
	        onLoadError: tableErrorMsgHandler,
	        queryParams:function(params){
	        	var param = {};
	        	if($("#unselect_name").val()!=""){
	        		param.name=$("#unselect_name").val();
	        	}
	        	param.roleid =getUrlParam("systemid");
	        	var postData = {
					"optid": "query_user_by_unrole",
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
                    field: 'state',
                    checkbox: true
                },
	           {
	                      title: '姓名',
	                      field: 'NAME',
	                      align: 'center',
	                      valign: 'middle'
	                  }, 
	                  {
	                      title: '部门名称',
	                      field: 'DEPT',
	                      align: 'center'
	                  },
	                  {
	                      title: '身份证号码',
	                      field: 'IDCARDNO',
	                      align: 'center'
	                  }
	              ]
	      });
	      var data_table_select = $("#data_table_select");
			data_table_select.bootstrapTable({
	    	method: 'post', //请求类型
	        contentType: "application/json",
	        dataType: "json",
	        url: api_base+"/Common/Reader.i", //请求地址
	        pageSize: 15, //每页显示数
	        striped: true,
	        idField:"SYSTEMID",
	        pageNumber:1, //页码
	        pageList: [10, 50, 100, 200, 500, 1000,5000],
	        sortOrder:"name",
	        pagination: true,
	        sidePagination: "server",
	        toolbar:"#exampleTableEventsToolbar2",
	        search:false, //搜索框
	        height:"500",
	        queryParamsType:"undefined",
	        clickToSelect:true, //点击行选中
	        onLoadSuccess:function(){
	        },
	        onLoadError:tableErrorMsgHandler,
	        queryParams:function(params){
	        	var param = {};
	        	if($("#select_name").val()!=""){
	        		param.name=$("#select_name").val();
	        	}
	        	param.roleid =getUrlParam("systemid");
	        	var postData = {
					"optid": "query_user_by_role",
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
                    field: 'state',
                    checkbox: true
                },
	           {
	                      title: '姓名',
	                      field: 'NAME',
	                      align: 'center',
	                      valign: 'middle'
	                  }, 
	                  {
	                      title: '部门名称',
	                      field: 'DEPT',
	                      align: 'center'
	                  },
	                  {
	                      title: '身份证号码',
	                      field: 'IDCARDNO',
	                      align: 'center'
	                  }
	              ]
	      });
		});
 $(document).ready(function() {
 	$("#button_gl").click(gl);
 	$("#button_ungl").click(ungl);
 	$("#button_close").click(mclose);
 	$("#button_unselect_query").click(function(){
 		var data_table = $("#data_table_unselect");
		data_table.bootstrapTable("refresh");
 	});
 	$("#button_select_query").click(function(){
 		var data_table = $("#data_table_select");
		data_table.bootstrapTable("refresh");
 	});
 });
//关联
function gl(){
	var data_table = $("#data_table_unselect");
	var selects = data_table.bootstrapTable('getSelections');
	var selected = selects[0];
	if(selected==undefined){
		parent.layer.alert('你未选择数据');
		return;
	}
	var userids = [];
	$.each(selects,function(index,obj){
		userids.push(obj.SYSTEMID);
	});
	var param = {
		"roleid": getUrlParam("systemid"),
		"userids": userids,
		"creator":getLocalUser().userid
	};
	saveData(api_base+"/Common/Writer.i", "userrole_insert", param, function() {
		refreshTable();
	});
}
// 
function ungl(){
	var data_table = $("#data_table_select");
	var selects = data_table.bootstrapTable('getSelections');
	var selected = selects[0];
	if(selected==undefined){
		parent.layer.alert('你未选择数据');
		return;
	}
	var userids = [];
	$.each(selects,function(index,obj){
		userids.push(obj.SYSTEMID);
	});
	var param = {
		"roleid": getUrlParam("systemid"),
		"userids": userids,
		"creator": getLocalUser().userid
	};
	saveData(api_base+"/Common/Writer.i", "userrole_delete", param, function() {
		refreshTable();
	});
}
function refreshTable(){
	var data_table = $("#data_table_unselect");
	data_table.bootstrapTable("refresh");
	var data_table = $("#data_table_select");
	data_table.bootstrapTable("refresh");
}
function mclose(){
	var index = window.parent.parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
	parent.parent.layer.close(index); //再执行关闭 
}