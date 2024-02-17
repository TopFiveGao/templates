$(document).ready(function(){
		var data_table = $("#data_table");
		data_table.bootstrapTable({
		method: 'get', // 请求方式
		striped:true, //表格显示条纹 
	    //url: "http://192.168.10.2:5000/bootH/jwxt/server/jsgl_list_server.jsp",  //请求地址
	    url: "../../jwxt/server/jsgl_list_server.jsp",
	    dataType: "json", //数据格式
	    pagination: true, //分页
	    singleSelect: false,
	    uniqueId: "id",  //每一行的唯一标识，一般为主键列  
	    //search: true, //显示搜索框
	    sidePagination: "server", //服务端处理分页
	    pageSize:5, //每页数量
	    pageNumber:1,
	    height:"300",
	    clickToSelect:true,
	    pageList: [5, 10, 20, 50, 100],
	    columns: [
	          	{
                    field: 'state',
                    radio: true
                }, 
	          		 {
	                      title: 'id',
	                      field: 'id',
	                      align: 'center',
	                      visible: false, 
	                      valign: 'middle'
	                  }, 
	                  {
	                      title: '角色名称',
	                      field: 'JSMC',
	                      align: 'center',
	                      valign: 'middle'
	                  }, 
	                  {
	                      title: '角色类型',
	                      field: 'JSLX',
	                      align: 'center',
	                      valign: 'middle',
	                  }, 
	                  {
	                      title: '角色描述',
	                      field: 'JSMS',
	                      align: 'center'
	                  },
	                  {
	                      title: '创建人',
	                      field: 'CJR',
	                      align: 'center'
	                  },
	                  {
	                      title: '创建部门',
	                      field: 'CJBM',
	                      align: 'center',
	                  },
	                  {
	                      title: '创建时间',
	                      field: 'CJSJ',
	                      align: 'center',
	                  }
	              ]
	      });
		});
function  updateData(){
	var data_table = $("#data_table");
	var selects = data_table.bootstrapTable('getSelections');
	var selected = selects[0];
	if(selected==undefined){
		parent.layer.alert('你未选择数据');
		//alert("你未选择数据");
		return;
	}
	parent.layer.alert("选中"+selects[0].JSMC);
}
function bdData(){
	var data_table = $("#data_table");
	var selects = data_table.bootstrapTable('getSelections');
	var selected = selects[0];
	if(selected==undefined){
		parent.layer.alert('你未选择数据');
		//alert("你未选择数据");
		return;
	}
	parent.layer.confirm('您是否要对该数据经行绑定？', {
    btn: ['是','否'], //按钮
    shade: false //不显示遮罩
	}, function(){
    	parent.layer.msg('对该数据进行绑定', {icon: 1});
	}, function(){
    	parent.layer.msg('不对该数据经行绑定', {icon: 6});
});
}