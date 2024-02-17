var theRequest = new Object();
$(document).ready(function () {
	if(getUrlParam("mc")){
		$(".mingcheng").text(getUrlParam("mc"));
	};
    var data_table = $("#data_table");
    data_table.bootstrapTable({
        method: 'post', // 请求类型
        contentType: "application/json",
        dataType: "json",
        url: api_base + "/Common/Reader.i", // 请求地址
        pageSize: 10, // 每页显示数
        striped: true,
        idField: "DICTIONARYID",
        pageNumber: 1, // 页码
        pageList: [10, 50, 100, 200, 500, 1000,5000],
        sortOrder: "kind",
        pagination: true,
        sidePagination: "server",
        showColumns: true,
        toolbar: "#searchForm",
        // showRefresh:true,
        search: false, // 搜索框
        height: "550",
        // showColumns:true,
        // showToggle:true,
        // ajaxOptions: {
        //     headers: {"P_token": sessionStorage.getItem("p_token")}
        // },
        queryParamsType: "undefined",
        clickToSelect: true, // 点击行选中
        onLoadSuccess: function () {
        },
        onLoadError: tableErrorMsgHandler,
        queryParams: function (params) {
            var param = {};
            let url = window.location.search;
            if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                strs = str.split("&");
                for (var i = 0; i < strs.length; i++) {
                    theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
                }
            }
            param.kind=theRequest.lxbh;
            if ($("#param_code").val() != "") {
                param.code = $("#param_code").val();
            }
            if ($("#param_detail").val() != "") {
                param.detail = $("#param_detail").val();
            }
            var postData = {
                "optid": "dictionary",
                "page_index": params.pageNumber,
                "page_size": params.pageSize,
                "is_paging": "1",
                "is_couting": "1",
                "order": "",
                "param": param
            };
            return postData;
        },
        columns: [
            {
                title: '序号',
                formatter: function (value, row, index) {
                    return index + 1;
                },
                align: 'center',
                valign: 'middle'
            },
            	{
            	title : '字典类型',
            	field : 'KIND',
            	align : 'center',
            	valign : 'middle'
            },
            {
                title: '字典编码',
                field: 'CODE',
                align: 'center',
                valign: 'middle',
            },
            {
                title: '字典名称',
                field: 'DETAIL',
                align: 'center',
                valign: 'middle',
            },
			{
			    title: '状态',
			    field: 'ZT_V',
			    align: 'center',
			    valign: 'middle',
			},
			{
                title: '操作',
                field: 'SYSTEMID',
                align: 'center',
                formatter: function (value, row, index) {
					var innerhtml = `
						<a class="a-col-font1" href="javascript:updateData('${row.DICTIONARYID}')" title="修改"><i class="fa fa-pencil-square-o"></i></a>
						<a class="a-col-font1" href="javascript:deleteData('${row.DICTIONARYID}')" title="删除"><i class="fa fa-trash"></i></a>
					`;
                    return innerhtml;
                }
            }
        ]
    });
});
$(document).ready(function () {
    $("#button_add").click(addData);
    $("#button_search").click(searchData);
});

function searchData() {
    $("#param_code").val($("#code").val());
    $("#param_detail").val($("#detail").val());
    refreshTable();
}

// 点击新增
function addData() {
    parent.layer.open({
        type: 2,
        title: '新增字典',
        shade: 0.8,
        area: ['900px', '400px'],
        content: getRootPath() + '/jwxt/systemManagement/jczdwh/jczdwh_add.html?kind='+theRequest.lxbh +"&mc="+getUrlParam("mc"), // iframe的url
        end: refreshTable
    });
}

function refreshTable() {
    $('#data_table').bootstrapTable('refreshOptions', {pageNumber: 1});
}

// 点击修改
function updateData(id) {
    parent.layer.open({
        type: 2,
        title: '修改字典',
        shade: 0.8,
        area: ['900px', '400px'],
        content: getRootPath() + '/jwxt/systemManagement/jczdwh/jczdwh_update.html?dictionaryid='
            + escape(id), // iframe的url
        end: refreshTable
    });
}

// 点击删除
function deleteData(id) {
    parent.layer.confirm('您是否要删除该条数据？', {
        skin: 'layui-layer-molv',
        btn: ['是', '否'], // 按钮
        shade: false
        // 不显示遮罩
    }, function () {
        del(id);
    });
}

function del(dictionaryid) {
    var param = {
        "dictionaryid": dictionaryid
    }
    saveData(api_base + "/Common/Writer.i", "dictionary_del", param, function (datas) {
        if (datas.result_state == 0) {
            parent.layer.msg('已删除', {icon: 1});
        } else {
            parent.layer.msg('删除失败', {icon: 2});
        }
        refreshTable();
    });
}

//返回上一页面
function returnval() {
    window.location.href = getRootPath() + "/jwxt/systemManagement/jczdwh/jczdwh_dmjgl.html";
}