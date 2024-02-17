const URL_WRITER = api_path + "/Common/Writer.i"
const URL_READER = api_path + "/Common/Reader.i"


const OPTID_SELECT = 'paxy_jcrz_select'
const OPTID_DELETE = 'paxy_jcrz_delete'


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
            if(userDeptCode){
                filterParams.createdeptcode = userDeptCode
            }
            const fjbh = $('#fjbh').val()
            if(fjbh !== ""){
                filterParams.fjbh = fjbh
            }
            const xm = $('#xm').val()
            if(xm !== ""){
                filterParams.xm = xm
            }
            const sbbh = $('#sbbh').val()
            if(sbbh !== ""){
                filterParams.sbbh = sbbh
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
                title: '寝室编号',
                field: 'FJBH',
                align: 'center',
                valign: 'middle'
            },
            {
                title: '姓名',
                field: 'XM',
                align: 'center',
                valign: 'middle'
            },
            {
                title: '身份证号',
                field: 'SFZH',
                align: 'center',
                valign: 'middle'
            },
            // {
            //     title: '图片地址',
            //     field: 'TPDZ',
            //     align: 'center',
            //     valign: 'middle'
            // },
            {
                title: '是否比中',
                field: 'SFBZ_V',
                align: 'center',
                valign: 'middle'
            },
            {
                title: '监测时间',
                field: 'CREATETIME',
                align: 'center',
                valign: 'middle'
            },
            {
                title: '位置',
                field: 'SBWZ',
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
                title: '操作',
                field: 'SYSTEMID',
                align: 'center',
                formatter: function (value, row, index) {
                    // <span>&nbsp;</span>
                    // <a class="a-col-font1" href="javascript:updateData('${row.SYSTEMID}')" title="编辑"><i class="fa fa-pencil-square-o"></i></a>
                    return  `
                        <div style="width: 130px;margin: auto;">
                            <a class="a-col-font1" href="javascript:seeData('${row.SYSTEMID}')" title="查看"><i class="fa fa-eye"></i></a>
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
        title: `监测日志查看`,
        shade: 0.8,
        area: ['1050px', '855px'],
        content: `${location.href.substring(0, location.href.lastIndexOf('.'))}_see.html?id=${systemid}`,
    })
}

function addData() {
    parent.layer.open({
        type: 2,
        title: `监测日志新增`,
        shade: 0.8,
        area: ['1050px', '855px'],
        content: `${location.href.substring(0, location.href.lastIndexOf('.'))}_add.html?`,
        end: refreshTable
    })
}

function updateData(systemid) {
    parent.layer.open({
        type: 2,
        title: `监测日志修改`,
        shade: 0.8,
        area: ['1050px', '855px'],
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
