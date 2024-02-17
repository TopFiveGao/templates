$(document).ready(function() {
	$("#searchForm").initDic();
	var data_table = $("#data_table");
	data_table.bootstrapTable({
		method : 'post', // 请求类型
		contentType : "application/json",
		dataType : "json",
		url : api_base + "/Common/Reader.i", // 请求地址
		pageSize : 10, // 每页显示数
		striped : true,
		idField : "DICTIONARYID",
		pageNumber : 1, // 页码
		pageList : [ 10, 50, 100, 200, 500 ],
		sortOrder : "kind",
		pagination : true,
		sidePagination : "server",
		showColumns : true,
		toolbar : "#searchForm",
		search : false, // 搜索框
		height : "550",
		queryParamsType : "undefined",
		// 添加token
		// ajaxOptions:{headers:sessionStorage.getItem("p_token");},
		
		clickToSelect : true, // 点击行选中
		onLoadSuccess : function() {
		},
		// ajaxOptions:{
		// 	headers:{"P_token":sessionStorage.getItem("p_token")}
		// },
		onLoadError :tableErrorMsgHandler,
		queryParams : function(params) {		
			var param = {};
			if ($("#optid_name").val() != "") {
				param.optid = $("#optid_name").val();			
			}
			if ($("#lx").val() != "" ) {
				param.lx=$("#lx").val();				
			}
			if ($("#info").val() != "" ) {
				param.info=$("#info").val();			
			}
			var postData = {
				"optid" : "optid_query",
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
          		title: '序号',
          		formatter: function (value, row, index) {  
                    return index+1;  
                },
                align: 'center',
                valign: 'middle'
            },
		{
			title : 'optid',
			field : 'OPTID',
			align : 'center',
			valign : 'middle',
			//visible : false
		}, {
			title : '描述',
			field : 'INFO',
			align : 'center',
			valign : 'middle'
		}, {
			title : '操作类型',
			field : 'LX_V',
			align : 'center',
			valign : 'middle',
		},
		{
			title : '更改时间',
			field : 'LASTUPDATEDATE',
			align : 'center',
			valign : 'middle',
		},
		{
			title : '最后修改人',
			field : 'LASTUPDATEBY',
			align : 'center',
			valign : 'middle',
		},
        {
            title: '操作',
            field: 'SYSTEMID1',
            align: 'center',
            formatter:function(value,row,index){
				var innerhtml = `
					<a class="a-col-font1" href="javascript:updateData('${row.SYSTEMID}')" title="修改"><i class="fa fa-pencil-square-o"></i></a>
					<a class="a-col-font1" href="javascript:deleteData('${row.SYSTEMID}','${row.OPTID}')" title="删除"><i class="fa fa-trash"></i></a>
				`;
				return innerhtml;
			}
		}]
	});
});
$(document).ready(function() {
	$("#button_add").click(addData);
	$("#button_search").click(refreshTable);
});
// 点击新增
function addData() {
	parent.layer.open({
		type : 2,
		title : '新增optid',
		shade : 0.8,
		area : ['900px', '400px' ],
		content : getRootPath() + '/jwxt/systemManagement/optid/optid_add.html', // iframe的url
		end : refreshTable
	});
}
function refreshTable() {
	var data_table = $("#data_table");
	$('#data_table').bootstrapTable('refreshOptions',{pageNumber:1});
}
// 点击修改
function updateData(id) {
	parent.layer.open({
		type : 2,
		title : '修改optid',
		shade : 0.8,
		area : [ '900px', '400px' ],
		content : getRootPath() + '/jwxt/systemManagement/optid/optid_update.html?systemid='+id,
		end : refreshTable
	});
}
// 点击删除
function deleteData(systemid,optid) {
	parent.layer.confirm('您是否要删除该条数据？', {
		skin : 'layui-layer-molv',
		btn : [ '是', '否' ], // 按钮
		shade : false
	},function() {
		del(systemid,optid);
	});
}
function del(systemid,optid) {
	var param = {
		"systemid" : systemid,
		"optid_name":optid
	}
	saveData(api_base + "/Common/Writer.i", "optid_delete", param,function(datas){
		if(datas.result_state==0){
			parent.layer.msg('已删除',{icon:1});
		}else{
			parent.layer.msg('删除失败',{icon:2});
		}
		refreshTable();
	});
}