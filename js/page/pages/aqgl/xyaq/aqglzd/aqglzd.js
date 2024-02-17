let treeType = {};
$(document).ready(function () {
    initTree();
    initTable();
    $("#searchForm").initDic();
    $("#button_search").click(refreshTable);
    $('#button_add').click(add);
});

function initTree() {
    var postData = {
        "optid": "xsxx_njbd_select",
        "param": {}
    };
    $.ajax({
        type: "POST",
        url: api_path + "/Common/Reader.i",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(postData),
        success: function (data) {
            if (data.result_state != "0") {
                alertInfor('加载菜单树失败', null);
                return;
            }
            const tree = data.result;
            let treeData = [{
                name: "四川省成都市中和职业中学",
                id: "0",
                pId: "-1",
                type: "1",
                open: true,
            }];
            for (let i = 0, len = tree.length; i < len; i++) {
                let obj = {
                    name: tree[i].SSNF + "级",
                    id: tree[i].SSNF,
                    pId: '0',
                    type: "2",
                    isParent: true
                };
                treeData.push(obj);
            }
            ;
            const ajaxDataFilter = (treeId, parentNode, responseData) => {
                let attr = [];
                if (responseData.result) {
                    for (var i = 0; i < responseData.result.length; i++) {
                        let obj = {
                            name: responseData.result[i].DETAIL,
                            id: responseData.result[i].CODE,
                            type: "3",
                            tname: responseData.result[i].BZRGH,
                            vname: responseData.result[i].BZRGH_V
                        };
                        attr.push(obj);
                    }
                }
                return attr;
            };
            const setting = {
                view: {
                    showIcon: true,
                    selectedMulti: false
                },
                async: {
                    //启用异步加载节点
                    enable: true,
                    url: api_path + "/Common/Reader.i",
                    otherParam: {},
                    contentType: "application/json; charset=UTF-8",
                    dataFilter: ajaxDataFilter //防止undefined节点 bug
                },
                callback: {
                    beforeAsync: function (event, treeId, treeList) {
                        zTree.setting.async.otherParam = {
                            "optid": "aqgl_aqzd_select",
                            "param": {
                                "ssnf": treeId.id,
                            }
                        };
                    },
                    onClick: function (event, treeId, treeList) {
                        treeType = treeList || {};
                        refreshTable();
                    }
                },
                check: {
                    enable: false
                },
                data: {
                    simpleData: {
                        enable: true
                    },
                    pIdKey: 'pId', //父节点的ID
                },
                edit: {
                    enable: false
                }
            };
            // $.fn.zTree.init($("#permitTree"), setting, treeData);
            // fuzzySearch('permitTree', '#key', true, false, true); //初始化时添加模糊查询
            // var zTree = $.fn.zTree.getZTreeObj("permitTree");
            // var nodes = zTree.getNodes();
            // zTree.selectNode(nodes[0])
        },
        beforeSend: function () {
            layer.load();
        },
        complete: function () {
            layer.closeAll('loading');
        },
    });
}

function initTable() {
    const data_table = $("#data_table");
    data_table.bootstrapTable({
        method: 'post', //请求类型
        contentType: "application/json",
        dataType: "json",
        url: api_path + "/Common/Reader.i", //请求地址
        pageSize: 10, //每页显示数
        striped: true,
        idField: "SYSTEMID",
        pageNumber: 1, //页码
        pageList: [10, 50, 100, 200, 500, 1000, 5000],
        sortOrder: "name",
        pagination: true,
        sidePagination: "server",
        showColumns: true, //选择是否显示
        toolbar: "#searchForm",
        search: false, //搜索框
        height: "550",
        queryParamsType: "undefined",
        clickToSelect: true, //点击行选中
        onLoadSuccess: function () {
        },
        onLoadError: tableErrorMsgHandler,
        queryParams: function (params) {
            const param = {}
            if (treeType.type) {
                if (treeType.type == '2') {
                    param.njdm = treeType.id
                }
                if (treeType.type == '3') {
                    param.bjdm = treeType.id
                }
            }
            const fbsj = $("#fbsj").val()
            if (fbsj !== "") {
                param.fbsja = fbsj.split("~")[0].replace(/\s+/g, '');
                param.fbsjb = fbsj.split("~")[1].replace(/\s+/g, '');
            }
            const zdmc = $("#zdmc").val()
            if (zdmc !== "") {
                param.zdmc = zdmc
            }
            return {
                "optid": "aqgl_aqzd_select",
                "page_index": params.pageNumber,
                "page_size": params.pageSize,
                "is_paging": "1",
                "is_couting": "1",
                "order": "",
                "param": param
            }
        },
        columns: [
            {
                title: '序号',
                formatter: function (value, row, index) {
                    return index + 1;
                },
                align: 'center',
                valign: 'middle',
                visible: judge(0, true)
            },
            {
                title: '制度名称',
                field: 'ZDMC',
                align: 'center',
                valign: 'middle',
                visible: judge(1, true)
            },
            {
                title: '类型',
                field: 'LX_V',
                align: 'center',
                valign: 'middle',
                visible: judge(2, true)
            },
            {
                title: '制定部门',
                field: 'ZDBM',
                align: 'center',
                valign: 'middle',
                visible: judge(3, true)
            },
            {
                title: '发布时间',
                field: 'FBSJ',
                align: 'center',
                valign: 'middle',
                visible: judge(4, true)
            },
            {
                title: '发布人',
                field: 'FBR',
                align: 'center',
                valign: 'middle',
                visible: judge(5, true)
            },


            {
                title: '操作',
                field: 'SYSTEMID',
                align: 'center',
                visible: judge(6, true),
                formatter: function (value, row, index) {
                    var innerhtml = `
					<a class="a-col-font1" href="javascript:update('${row.SYSTEMID}')" title="修改"><i class="fa fa-pencil-square-o"></i></a>
						<a class="a-col-font1" href="javascript:del('${row.SYSTEMID}')" title="删除"><i class="fa fa-trash"></i></a>
					`;
                    return innerhtml;
                }

            }
        ]
    });
    $(".dropdown-menu li label input").click(dropdownMenu);
}

function refreshTable() {
    var data_table = $("#data_table");
    data_table.bootstrapTable("refresh");
}

//删除
function del(systemid) {
    parent.layer.confirm('您是否要删除该条数据？', {
        skin: 'layui-layer-molv',
        btn: ['是', '否'], // 按钮
        shade: false
        // 不显示遮罩
    }, function () {
        var param = {
            "systemid": systemid
        }
        saveData(api_path + "/Common/Writer.i", "aqgl_aqzd_delete", param,
            function () {
                refreshTable();
            });
        parent.layer.msg('已删除', {
            icon: 1
        });
    }, function () {
        parent.layer.msg('已放弃', {
            icon: 2
        });
    });
}

//新增
function add() {
    parent.layer.open({
        type: 2,
        title: '安全制度新增',
        shade: 0.8,
        area: ['800px', '650px'],
        content: getRootPath() + '/paxy/pages/aqgl/xyaq/aqglzd/aqglzd_add.html?bjbh=' + treeType.id,
        end: refreshTable
    });
}

//修改
function update(id) {
    parent.layer.open({
        type: 2,
        title: '安全制度修改',
        shade: 0.8,
        area: ['800px', '650px'],
        content: getRootPath() + '/paxy/pages/aqgl/xyaq/aqglzd/aqglzd_update.html?systemid=' + id,
        end: refreshTable
    });
}
