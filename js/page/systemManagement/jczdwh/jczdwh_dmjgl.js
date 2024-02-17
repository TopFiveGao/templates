$(document).ready(function () {
    var data_table = $("#data_table");
    data_table.bootstrapTable({
        method: 'post', // 请求类型
        contentType: "application/json",
        dataType: "json",
        url: api_base + "/Common/Reader.i", // 请求地址
        pageSize: 10, // 每页显示数
        striped: true,
        idField: "SYSTEMID",
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
            if ($("#dmjmc").val() != "") {
                param.dmjmc = $("#dmjmc").val();
            }
            if ($("#lxbh").val() != "") {
                param.lxbh = $("#lxbh").val();
            }
            var postData = {
                "optid": "dmjgl_select",
                "page_index": params.pageNumber,
                "page_size": params.pageSize,
                "is_paging": "1",
                "is_couting": "1",
                "order": "",
                "param": param
            }
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
            }
            ,
            {
                title: '代码集名称',
                field: 'DMJMC',
                align: 'center',
                valign: 'middle',
				formatter: function (value, row, index) {
				    var innerhtml = '<div><a href="javascript:information(\'' + row.LXBH + '\',\'' +  row.DMJMC + '\')">'+ row.DMJMC +'</a></div>';
				    return innerhtml;
				}
            }
            , {
                title: '标准',
                field: 'DMJBZ',
                align: 'center',
                valign: 'middle',
            }
            , {
                title: '类型编号',
                field: 'LXBH',
                align: 'center',
                valign: 'middle',
            }
            , {
                title: '备注',
                field: 'BZ',
                align: 'center',
                valign: 'middle',
            }
            , {
                title: '操作',
                field: 'SYSTEMID',
                align: 'center',
                formatter: function (value, row, index) {
					var innerhtml = `
						<a class="a-col-font1" href="javascript:information('${row.LXBH}','${row.DMJMC}')" title="字典信息"><i class="fa fa-folder-open"></i></a>
						<a class="a-col-font1" href="javascript:updateData('${row.SYSTEMID}')" title="修改"><i class="fa fa-pencil-square-o"></i></a>
						<a class="a-col-font1" href="javascript:deleteData('${row.SYSTEMID}')" title="删除"><i class="fa fa-trash"></i></a>
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
    $("#dmjmc").val($("#dmjmc").val());
    $("#lxbh").val($("#lxbh").val());
    refreshTable();
}

// 点击新增
function addData() {
    parent.layer.open({
        type: 2,
        title: '新增代码集',
        shade: 0.8,
        area: ['900px', '400px'],
        content: getRootPath() + '/jwxt/systemManagement/jczdwh/jczdwh_addDmjgl.html', // iframe的url
        end: refreshTable
    });
}

function refreshTable() {
    $('#data_table').bootstrapTable('refreshOptions', {pageNumber: 1});
}

//点击信息跳转
function information(id,mc) {
    window.location.href= getRootPath() + '/jwxt/systemManagement/jczdwh/jczdwh_list.html?lxbh='+ escape(id)+"&mc="+ mc; // iframe的url
}

// 点击修改
function updateData(id) {
    console.log(id)
    parent.layer.open({
        type: 2,
        title: '修改代码集',
        shade: 0.8,
        area: ['900px', '400px'],
        content: getRootPath() + '/jwxt/systemManagement/jczdwh/jczdwh_dmjglUpdate.html?systemid='+ escape(id), // iframe的url
        end: refreshTable
    });
}

// 点击删除
function deleteData(id) {
    parent.layer.confirm('您是否要删除该条数据及以下的数据？', {
        skin: 'layui-layer-molv',
        btn: ['是', '否'], // 按钮
        shade: false
        // 不显示遮罩
    }, function () {
        del(id);
    });
}

function del(systemid) {
    var param = {
        "systemid": systemid
    }
    saveData(api_base + "/Common/Writer.i", "dmjgl_delete", param, function (datas) {
        if (datas.result_state == 0) {
            parent.layer.msg('已删除', {icon: 1});
        } else {
            parent.layer.msg('删除失败', {icon: 2});
        }
        refreshTable();
    });
}