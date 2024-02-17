const URL_READER = api_path + "/Common/Reader.i"
const URL_WRITER = api_path + "/Common/Writer.i"


const OPTID_SELECT = 'paxy_bjrz_select'
const OPTID_DELETE = 'paxy_bjrz_delete'


$(document).ready(function () {
    $("#searchForm").initDic()
    $("#button_search").click(refreshTable)
    $("#button_add").click(addData)
    initTable()
})

function initTable() {
    const data_table = $("#data_table")
    data_table.bootstrapTable({
        method: 'post', //请求类型
        contentType: "application/json",
        dataType: "json",
        url: URL_READER,
        pageSize: 10, //每页显示数
        striped: true,
        idField: "SYSTEMID",
        pageNumber: 1, //页码
        pageList: [10, 50, 100, 200, 500, 1000, 5000],
        pagination: true,
        sidePagination: "server",
        showColumns: true,
        toolbar: "#searchForm",
        search: false, //搜索框
        height: "650",
        queryParamsType: "undefined",
        clickToSelect: false, //点击行选中
        onLoadSuccess: function () {
        },
        onLoadError: tableErrorMsgHandler,
        queryParams: function (params) {
            const filterParams = {}
            const userDeptCode = getLocalUser().deptcode
            if (userDeptCode) {
                filterParams.createdeptcode = userDeptCode
            }
            const bjsj = $('#bjsj').val()
            if (bjsj !== "") {
                const arr = bjsj.split(' ~ ')
                if(arr.length === 2){
                    filterParams.bjsja = arr[0]
                    filterParams.bjsjb = arr[1]
                }
            }
            const bjzt = $('#bjzt').val()
            if (bjzt !== "") {
                filterParams.bjzt = bjzt
            }
            const bjlx = $('#bjlx').val()
            if (bjlx !== "") {
                filterParams.bjlx = bjlx
            }
            return {
                optid: OPTID_SELECT,
                page_index: params.pageNumber,
                page_size: params.pageSize,
                is_paging: "1",
                is_couting: "1",
                order: "",
                param: filterParams
            }
        },
        columns: [
            {
                title: '序号',
                formatter: function (value, row, index) {
                    return index + 1
                },
                align: 'center',
                valign: 'middle'
            },
            {
                title: '报警编号',
                field: 'BJBH',
                align: 'center',
                valign: 'middle'
            },
            {
                title: '报警类型',
                field: 'BJLX_V',
                align: 'center',
                valign: 'middle'
            },
            {
                title: '设备编号',
                field: 'SBBH',
                align: 'center',
                valign: 'middle'
            },
            {
                title: '设备类型',
                field: 'SBLX_V',
                align: 'center',
                valign: 'middle'
            },
            // {
            //     title: '照片地址',
            //     field: 'ZPDZ',
            //     align: 'center',
            //     valign: 'middle'
            // },
            {
                title: '报警描述',
                field: 'MS',
                align: 'center',
                valign: 'middle'
            },
            {
                title: '报警时间',
                field: 'BJSJ',
                align: 'center',
                valign: 'middle'
            },
            {
                title: '接收时间',
                field: 'JSSJ',
                align: 'center',
                valign: 'middle'
            },
            {
                title: '报警状态',
                field: 'BJZT_V',
                align: 'center',
                valign: 'middle'
            },
            {
                title: '短信发送状态',
                field: 'DXFSZT_V',
                align: 'center',
                valign: 'middle'
            },
            {
                title: '处置时间',
                field: 'CZSJ',
                align: 'center',
                valign: 'middle'
            },
            {
                title: '情况描述',
                field: 'QKMS',
                align: 'center',
                valign: 'middle'
            },
            {
                title: '操作',
                field: 'SYSTEMID',
                align: 'center',
                formatter: function (value, row, index) {
                    // <span>&nbsp;</span>
                    // <a class="a-col-font1" href="javascript:updateData('${row.SYSTEMID}')" title="编辑"><i class="fa fa-pencil-square-o"></i></a>
                    return `
                        <div style="width: 130px;margin: auto;">
                            <a class="a-col-font1" href="javascript:seePic('${row.SYSTEMID}')" title="查看"><i class="fa fa-eye"></i></a>
                            <span>&nbsp;</span>
                            <a class="a-col-font1" href="javascript:deleteData('${row.SYSTEMID}')" title="删除"><i class="fa fa-trash"></i></a>
                        </div>
			`
                }
            }
        ]
    })
}

function refreshTable() {
    const data_table = $("#data_table")
    data_table.bootstrapTable("refresh")
}

function seeData(systemid) {
    parent.layer.open({
        type: 2,
        title: `报警日志查看`,
        shade: 0.8,
        area: ['1050px', '580px'],
        content: `${location.href.substring(0, location.href.lastIndexOf('.'))}_see.html?id=${systemid}`,
    })
}

function seePic(systemid) {
    parent.layer.open({
        type: 2,
        title: `报警日志查看`,
        shade: 0.8,
        area: ['1050px', '810px'],
        content: `${location.href.substring(0, location.href.lastIndexOf('.'))}_see_pic.html?id=${systemid}`,
    })
}

function addData() {
    parent.layer.open({
        type: 2,
        title: `报警日志新增`,
        shade: 0.8,
        area: ['1050px', '580px'],
        content: `${location.href.substring(0, location.href.lastIndexOf('.'))}_add.html?`,
        end: refreshTable
    })
}

function updateData(systemid) {
    parent.layer.open({
        type: 2,
        title: `报警日志修改`,
        shade: 0.8,
        area: ['1050px', '580px'],
        content: `${location.href.substring(0, location.href.lastIndexOf('.'))}_update.html?id=${systemid}`,
        end: refreshTable
    })
}

function deleteData(systemid) {
    parent.layer.confirm('您是否要删除该条数据？', {
        skin: 'layui-layer-molv',
        btn: ['是', '否'],
        shade: false
    }, function () {
        del(systemid)
    })
}

function del(systemid) {
    const param = {
        "systemid": systemid,
    }
    saveData(URL_WRITER, OPTID_DELETE, param, function (datas) {
        if (datas.result_state === 0 || datas.result_state === "0") {
            parent.layer.msg('已删除', {
                icon: 1
            })
        } else {
            parent.layer.msg('删除失败', {
                icon: 2
            })
        }
        refreshTable()
    })
}
