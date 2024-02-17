const OPTID_SELECT_HQJC = "paxy_hqjczt_select"
const OPTID_SELECT_GY = "ssgl_sss_select"
const OPTID_SELECT_LC = "ssgl_supercode_select"

const ROOT_PATH = '/xcsb'
const URL_READER = api_path.substring(0, api_path.lastIndexOf('/')) + ROOT_PATH + "/Common/Reader.i"
const URL_WRITER = api_path.substring(0, api_path.lastIndexOf('/')) + ROOT_PATH + "/Common/Writer.i"

// 分页渲染的数据源
const dataList = [
    {
        BZDZ: "1公寓1楼101",
        QSBM: "yf101",
        SYSTEMID: "001",
        WGRS: '10',
        MATES: [
            {NAME: "张三", SYSTEMID: 'zs', STATE: '未归'},
            {NAME: "李四", SYSTEMID: 'ls', STATE: '正常'},
            {NAME: "王老五", SYSTEMID: 'ww', STATE: '正常'},
            {NAME: "迪丽热巴", SYSTEMID: 'dlrb', STATE: '请假'},
        ]
    },
]

$(document).ready(function () {
    // 初始化顶部 表单字典
    initSelect()
    paintLegendCanvas()
    // 初始化页面数据源
    initPageData(1, 18)
    // 添加事件：筛选查询: 表单字段：[ 'sbbh', 'dkbh', '' ]
    $("#button_search").click(() => filterSearch(1, 18))

})

function getItemBgc(state) {
    switch (state) {
        case '1': // 晚归
            return 'orange'
        case '2': // 请假
            return '#009ACD'
        case '3': // 未归
            return 'red'
        default:  // 正常
            return '#18a689'
    }
}

function paintLegendCanvas() {
    const canvas = document.getElementById('legend')
    const ctx = canvas.getContext('2d')
    const legendItems = [
        {
            color: '#18a689',
            text: '正常'
        },
        {
            color: 'orange',
            text: '晚归'
        },
        {
            color: '#009ACD',
            text: '请假'
        },
        {
            color: 'red',
            text: '未归'
        }
    ]
    let x = 8
    let y = 2
    const itemWidth = 15
    const itemHeight = 15
    const gap = 15

    legendItems.forEach(function (item, index) {
        ctx.fillStyle = item.color
        ctx.fillRect(x + (itemWidth + gap) * (index % 2), y + (itemHeight + gap) * Math.floor(index / 2), itemWidth, itemHeight)
        ctx.fillStyle = 'black'
        ctx.font = "bold 10px Arial"
        ctx.fillText(item.text, x + (itemWidth + gap) * (index % 2) + itemWidth + 10, y + (itemHeight + gap) * Math.floor(index / 2) + itemHeight / 2 + 4)
        if (index % 2 === 0) {
            x += 40
        } else {
            x = 8
        }
    })
}

// 初始化页面数据源
function initPageData(pageIndex, pageSize) {
    selectDb(OPTID_SELECT_HQJC, pageIndex, pageSize, {})
}

function renderPagination(pageIndex, totalNums) {
    $('#pagination').jqPaginator({

        pageSize: 18,                               // 设置每页显示的条目数量

        totalPages: Math.ceil(totalNums / 18),    // 分页的总页数

        visiblePages: 18,                           // 设置组件显示的页码按钮数量

        currentPage: pageIndex || 1,                // 当前页

        first: '<li class="first"><a href="javascript:void(0);">首页</a></li>',
        last: '<li class="last"><a href="javascript:void(0);">尾页</a></li>',

        prev: '<li class="prev"><a href="javascript:void(0);">上一页</a></li>',

        next: '<li class="next"><a href="javascript:void(0);">下一页</a></li>',


        page: '<li class="page"><a href="javascript:void(0);">{{page}}</a></li>',

        onPageChange: function (num, type) {
            $('#text').html('当前第' + num + '页')
            if (type === 'change') {
                selectDb(OPTID_SELECT_HQJC, num, 18, {})
            }
        }

    });
}

// 查询筛选：后续可抽象出一个方法 通过接收一个参数 { id (dom元素id值) : filed ( 后端定义的筛选参数名 ) }
function filterSearch(pageIndex, pageSize) {
    const filterParam = {}
    // 公寓号数
    const fjbhsxa = $("#gyhs").val()
    if (fjbhsxa !== "") {
        filterParam.fjbhsxa = fjbhsxa
    }
    // 楼层
    const fjbhsxb = $("#gylc").val()
    if (fjbhsxb !== "") {
        filterParam.fjbhsxb = fjbhsxb
    }
    selectDb(OPTID_SELECT_HQJC, pageIndex, pageSize, filterParam)
}


function delReport(deleteOptId, systemid) {
    parent.layer.confirm('您是否要删除该条数据？', {
        skin: 'layui-layer-molv',
        btn: ['是', '否'], //按钮
        shade: false //不显示遮罩
    }, function () {
        /** ============================ 删除请求 ============================ */
        $.ajax({
            url: api_path + "/Common/Writer.i", //请求地址
            type: 'POST',
            contentType: "application/json",    // 必须显示声明，否则后端不识别不会正确响应
            dataType: 'json',                   // 返回数据的类型
            data: JSON.stringify({        // data 必须要序列化
                optid: deleteOptId,
                param: {
                    systemid,
                },
            }),
            success: function (result) {
                if (result.result_state === 0 || result.result_state === '0') {
                    parent.layer.msg('已删除', {
                        icon: 1
                    });
                    // 数据库更新后重新请求页面数据
                    initPageData(1, 4)
                } else {
                    parent.layer.msg('删除失败', {
                        icon: 2
                    });
                }
            },
            error: function (xhr, status, error) {
                dataList.length = 0
            }
        });
    });
}

/**
 * 视图相关页面，显示不对就来这里
 * @param pageIndex 当前查询页码
 * @param totalNums 数据总量
 */
function renderPage(pageIndex, totalNums) {
    const dataHtml = $("#dataHtml")
    dataHtml.empty()
    if (dataList.length < 1) {
        dataHtml.css({
            "text-align": "center",
            "display": "flex",
            "justify-content": "center",
            "align-items": "center"
        }).text("没有找到匹配的记录");
        return
    } else {
        dataHtml.css({
            "text-align": "",
            "display": "",
            "justify-content": "",
            "align-items": ""
        }).text("");
    }
    for (let i = 0; i < dataList.length; i++) {
        const row = dataList[i]
        const mates = row.MATES
        let str = `
			<div class="col-lg-2 col-md-3 col-sm-4 col-xs-6" style="width: 180px;height: 248px; margin-top: 20px;">
				<div class="viewText" style="width: 165px;height: 100%;overflow:hidden;">
					<div style="display: flex;justify-content: space-between;">
						<span style="color: #40E0D0; font-weight: bold;font-size: 10px;letter-spacing: 2px;">${row.BZDZ ? row.BZDZ : ''}</span>
						<span style="color: #999999; font-size: 10px;">
						    未归
						    <span style="color: orange; font-size: 10px; font-weight: bold;">${row.WGRS ? row.WGRS : '0'}</span>
						    人
						</span>
					</div>
					<div style=" border-top: 1px solid #ddd;margin: 10px -10px 10px -10px;"></div>
                    <!-- 寝室容器, 能显示 10 个人 -->
					<div id='qs_${row.QSBM}' style="display: flex;flex-wrap: wrap;gap:10px;max-height: 190px; overflow-y: auto; flex-grow: 1; flex-basis: 0;">
		`;
        if (mates && mates.length > 0) {
            const m = mates.map(item => ({NAME: item.XM ? item.XM : '未填写', SYSTEMID: item.XSID, STATE: item.ZT}))
            for (let j = 0; j < m.length; j++) {
                str += `
                    <div style="padding: 1px;">
                        <div id="btn_${row.QSBM}_${m[j].SYSTEMID}" data-xsid="${m[j].SYSTEMID}"  data-xsxm="${m[j].NAME}" class="my-btn" style="background-color: ${getItemBgc(m[j].STATE)};padding: 2px;margin: 2px;">
                            <span style="color: white; font-weight: bold;font-size: 10px;">${m[j].NAME}</span>
                        </div>
                    </div>
                `
            }
        }
        str += `            </div>
                        </div>
                    </div>`
        dataHtml.append(str)
        for (const mate of mates) {
            const btnItem = $(`#btn_${row.QSBM}_` + mate.XSID)
            btnItem.click(function () { // 注意es6
                parent.layer.msg(`你好，我是${$(this).data('xsxm')}`, {icon: 1})
            })
        }
    }
    // 有数据就渲染分页组件
    renderPagination(pageIndex, totalNums)
}

function mClose() {
    const index = window.parent.parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
    parent.parent.layer.close(index); //再执行关闭
}

function updateDb(optid, systemid, forms) {
    const formData = new FormData()
    formData.append('systemid', systemid);
    formData.append('optid', optid);
    const formEntries = Object.entries(forms)
    for (const [key, val] of formEntries) {
        formData.append(key, val)
    }
    /** ============================ 更新请求 ============================ */
    $.ajax({
        url: api_path + "/sync/Writer.i",
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response.result_state === 0 || response.result_state === '0') {
                msgAfterFun(1, "保存成功", mClose);
                // 数据库更新后重新请求页面数据
                initPageData(1, 4)
            } else {
                msgAfterFun(2, "保存失败", mClose);
            }
        },
        error: function (xhr, status, error) {
            msgAfterFun(2, "保存失败", mClose);
        }
    });

}

/**
 * ajax 获取接口数据
 * @param optid 用于查询判断的字段
 * @param pageIndex 获取数据的当前页码
 * @param pageSize 一次获取多少页数据
 * @param options 用于定义一些查询筛选字段参数，后端识别后会返回筛选后的数据
 */
function selectDb(optid, pageIndex, pageSize, options = {}) {
    /** ============================ 分页查询请求 ============================ */
    $.ajax({
        url: URL_READER,
        type: 'POST',
        contentType: "application/json",
        dataType: 'json', // 返回数据的类型
        data: JSON.stringify({
            optid,
            param: options,
            "page_index": pageIndex,
            "page_size": pageSize,
            "is_paging": "1",
            "is_couting": "1",
            "order": "",
        }),
        success: function (result) {
            if (result.result_state === 0 || result.result_state === '0') {
                dataList.length = 0
                const r = result.result.map(item => ({BZDZ: item.BZDZ, QSBM: item.SYSTEMID, MATES: item.xsxx}))
                const row = r.map(item => {
                    if (item.MATES && item.MATES.length > 0) {
                        item.WGRS = item.MATES.filter(i => i.ZT === '3').length
                    } else {
                        item.WGRS = 0
                    }
                    return item
                })
                dataList.push(...row)
                // 拿到数据后渲染页面 pageIndex: 页码索引； totalNums: 数据库总量
                renderPage(pageIndex, result.total_number ? result.total_number : 90) // 防止返回数据出 bug ，默认分 5 页
            }
        },
        error: function (xhr, status, error) {
            dataList.length = 0
        }
    })
}

function initDictGy(domId, optId) {
    let selectObj_ = `#${domId}`
    getDatas(api_path + "/Common/Reader.i", optId, {}, function (result) {
        if (result.result_state === '0') {
            let innerHtml = "<option value=\"\" hassubinfo=\"true\">----公寓号数----</option>"
            $.each(result.result, function (index, obj) {
                innerHtml += `<option value="${obj.supercode}" hassubinfo="true">${obj.name}</option>`
            })
            $(selectObj_).html(innerHtml)
            $(selectObj_).chosen({
                no_results_text: "正在查找该项"
            })
            $(selectObj_).trigger("chosen:updated")
        }
    })
}

function initDictLc(domId, optId, supercode) {
    let selectObj_ = `#${domId}`
    getDatas(api_path + "/Common/Reader.i", optId, {supercode}, function (result) {
        if (result.result_state === '0') {
            let innerHtml = "<option value=\"\" hassubinfo=\"true\">----楼层----</option>"
            $.each(result.result, function (index, obj) {
                innerHtml += `<option value="${obj.ID}" hassubinfo="true">${obj.NAME}</option>`
            })
            $(selectObj_).html(innerHtml)
            $(selectObj_).chosen({
                no_results_text: "正在查找该项"
            })
            $(selectObj_).trigger("chosen:updated")
        }
    })
}

function generateLc(value) {
    if (value) {
        initDictLc('gylc', OPTID_SELECT_LC, value)
		$('#gylc_chosen').css('visibility', 'visible')
    }
}

function hqReset(){
	$('#gylc_chosen').css('visibility', 'hidden')
}

function initSelect() {
    initDictGy('gyhs', OPTID_SELECT_GY)
}
