const ROOT_PATH = '/xcsb'
const URL_READER = api_path.substring(0, api_path.lastIndexOf('/')) + ROOT_PATH + "/Common/Reader.i"
const URL_WRITER = api_path.substring(0, api_path.lastIndexOf('/')) + ROOT_PATH  + "/Common/Writer.i"


const OPTID_SELECT = 'paxy_bjrz_select'
const OPTID_DELETE = 'paxy_bjrz_delete'
const OPTID_UPDATE = 'paxy_bjrz_update'

const e = "<i class='fa fa-times-circle'></i>"

$(function () {
    tabFun()
    initdczbjTable()
    validateForm1()
    validateForm2()
    $('#refreshTab1').click(dczbjTablerefresh)
    $('#refreshTab2').click(wdczbjTablerefresh)
    // $("input[name='iswc']").on("click", function () {
    //     wdczbjTablerefresh();
    // });
    // initFromValidaotr();
    // if (hasPermission("bjxx_rybgxx_listquery")) {
    // 	$("#mybgli").removeClass("hide");
    // }
    // $(".qdancgrwxzd").click(addData)
    // $(".qdancgrwxzdjz").click(addData)

})

// 点击新增
function addData() {
    console.log('12342135')
    parent.layer.open({
        type: 2,
        title: '新增任务',
        shade: 0.8,
        area: ['1200px', '700px'],
        content: getRootPath() + '/hth5/task/task/task_add.html', // iframe的url
        end: function () {

        }
    });
}


/**
 * tab操作
 * dczbj 待处置报警
 * wdczbj 我的处置报警
 * bjczrybg 报警处置人员变更
 */
function tabFun() {
    //dczbj
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        // 获取已激活选项卡的名称
        const activeTab = $(e.target).attr("name")
        // 获取先前选项卡的名称
        const previousTab = $(e.relatedTarget).attr("name")
        if (previousTab === "dczbj") { //待处置
            const btnSee = $('#form1').find("span[id='btnSeeForm1']")  // 隐藏查看按钮
            btnSee.css('visibility', 'hidden')
            // clearInterval(dczbj_num)
        } else if (previousTab === "wdczbj") {
            const btnSee = $('#form2').find("span[id='btnSeeForm2']")
            btnSee.css('visibility', 'hidden')
            // clearInterval(wddczbj_num)
        } else if (previousTab === "bjczrybg") {

        }
        if (activeTab === "dczbj") { //待处置
            initdczbjTable()
            $("#form1")[0].reset()
            $("#form1 button:not(#btnSeeForm1)").addClass("hide")
            // renderLayDateTime('XDRQ01')
        } else if (activeTab === "wdczbj") {
            initwdczbjTable()
            $("#form2")[0].reset()
            $("#form2 button:not(#btnSeeForm2)").addClass("hide")
            // renderLayDateTime('XDRQ02')
        } else if (activeTab === "bjczrybg") {
            initbjczrbgTable()
            $("#form3")[0].reset()
            $("#form3 button:not(#btnSeeForm3)").addClass("hide")
            // $("#form3 .hehgvdfdf").addClass("hide")
        }
    })
}

function openrwzl(formid, bjid) {
    layer.open({
        type: 2,
        title: '新增指令',
        shade: 0.5,
        area: ['800px', '520px'],
        content: getRootPath() + '/jsp/dpzs/bjcz/xdzl.jsp?formid=' + formid + "&bjid=" + bjid //iframe的url
        //		    end:refreshTable
    });
}

//-------------------------------------------------------------------------------------------------------------
//---------------------------抢单报警操作--------------------------------
//-------------------------------------------------------------------------------------------------------------

/**
 * 自动刷新待处置报警表单
 * @returns
 */
function dczbjTablerefresh() {
    $('#dczbj_data').bootstrapTable('refreshOptions', {
        pageNumber: 1
    })
}

/**
 * 初始化待处置报警
 * @returns
 */
function initdczbjTable() {
    // dczbj_num = window.setInterval(dczbjTablerefresh, 1000 * 10)
    //先销毁表格
    $('#dczbj_data').bootstrapTable('destroy')
    //初始化表格,动态从服务器加载数据
    $("#dczbj_data").bootstrapTable({
        method: "post",
        contentType: "application/json",
        dataType: "json",
        url: URL_READER,
        striped: true,
        pagination: true,
        pageSize: 15,
        pageNumber: 1,
        pageList: [15, 50, 100, 200, 500],
        search: false,
        //  showColumns: true,  //显示下拉框勾选要显示的列
        // showRefresh: true,  //显示刷新按钮
        sidePagination: "server", //表示服务端请求
        //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder
        //设置为limit可以获取limit, offset, search, sort, order
        queryParamsType: "undefined",
        queryParams: function queryParams(params) { //设置查询参数
            const param = {}
            param.userid = getLocalUser().userid
            param.bjzt = '0'
            return {
                "optid": OPTID_SELECT,
                "page_index": params.pageNumber,
                "page_size": params.pageSize,
                "is_paging": "1",
                "is_couting": "1",
                "order": "",
                "param": param
            }
        },
        onLoadSuccess: function () {
        },
        onLoadError: tableErrorMsgHandler,
        rowStyle: function (row, index) {
            if (row.YJDJ === "01") { //红色
                return {
                    css: {
                        "color": "#FF0033"
                    }
                }
            } else if (row.YJDJ === "02") {
                return {
                    css: {
                        "color": "orange"
                    }
                }
            } else if (row.YJDJ === "03") {
                return {
                    css: {
                        "color": "#f1c232"
                    }
                }
            } else if (row.YJDJ === "04") {
                return {
                    css: {
                        "color": "#33ff00"
                    }
                }
            } else {
                return '';
            }
        },
        columns: [
            {
                // title: '报警编号',
                field: 'BJBH',
                align: 'center',
                valign: 'middle',
                visible: true
            },
            {
                // title: '报警类型',
                field: 'BJLX_V',
                align: 'center',
                valign: 'middle',
                visible: true
            },
            {
                // title: '报警时间',
                field: 'BJSJ',
                align: 'center',
                valign: 'middle',
                visible: true
            },
            {
                // title:'报警描述'
                field: 'MS',
                align: 'center',
                valign: 'middle',
                visible: true
            },
            {
                // title: '报警状态',
                field: 'BJZT_V',
                align: 'center',
                valign: 'middle',
                visible: true
            },
            {
                // title: '操作',
                field: 'SYSTEMID1',
                align: 'center',
                valign: 'middle',
                visible: true,
                formatter: function (value, row, index) {
                    return '<a href="javascript:void(0)" onclick="qdxx(\''
                        + row.SYSTEMID + '\''
                        + ',\'' + row.BJBH + '\''
                        + ',\'' + row.BJLX_V + '\''
                        + ',\'' + row.BJSJ + '\''
                        + ',\'' + row.BJZT + '\''
                        + ',\'' + row.SBLX_V + '\''
                        + ',\'' + row.SBBH + '\''
                        + ',\'' + row.JSSJ + '\''
                        + ',\'' + row.CZSJ + '\''
                        + ',\'' + row.MS + '\''
                        + ',\'' + row.QKMS + '\''
                        + ',\'' + row.ZPDZ + '\''
                        + ')" title="更新"><span class="glyphicon glyphicon-share" aria-hidden="true"></span></a>'
                }
            }
        ]
    })
    $("#form1").initDic({
        root:ROOT_PATH,
        successHandler: function () {
            // $("#form1 select[id='czzt'] option[value='00']").remove()
            $("#form1 select[name='bjzt']").trigger("chosen:updated")
        }
    })
}

function renderLayDateTime(id) {
    laydate.render({
        elem: `#${id}`,
        type: 'datetime',
        min: getCruentDatestr(),
        theme: 'molv',
        value: getCruentDatestr()
    })
}

/**
 * 抢单
 * @param systemid
 * @returns
 */
function qdxx(systemid, bjbh, bjlx_v, bjsj, bjzt, sblx_v, sbbh, jssj,czsj, ms, qkms, zpdz) {
    // var param = {}
    // param.systemid = systemid
    // param.bjzt = "01"
    // getDatas(api_path + "/qdxx/qd.i", "bjxx_dczbjcx_bjxx_update", param, function (result) {
    //     if (result.result_state == '0') {
    //         alertInfor("抢单成功!请在我的报警信息查看！", null);
    //         initqdData(systemid);
    //     } else {
    //         alertInfor(result.result_msg, null);
    //     }
    //     $('#dczbj_data').bootstrapTable('refresh');
    // });
    renderLayDateTime('XDRQ01')
    const form1 = $("#form1")
    form1.setForm({
        result: [
            {
                systemid: systemid !== 'undefined' ? systemid : '',
                bjbh: bjbh !== 'undefined' ? bjbh : '',
                bjlx_v: bjlx_v !== 'undefined' ? bjlx_v : '',
                bjsj: bjsj !== 'undefined' ? bjsj : '',
                bjzt: bjzt !== 'undefined' ? bjzt : '',
                sblx_v: sblx_v !== 'undefined' ? sblx_v : '',
                sbbh: sbbh !== 'undefined' ? sbbh : '',
                jssj: jssj !== 'undefined' ? jssj : getCurrentTime(),
                czsj: czsj !== 'undefined' ? czsj : getCurrentTime(),
                ms: ms !== 'undefined' ? ms : '',
                qkms: qkms !== 'undefined' ? qkms : '',
                zpdz: zpdz !== 'undefined' ? zpdz : '',
            }
        ]
    })
    const btnSee = form1.find("span[id='btnSeeForm1']")
    btnSee.css('visibility', 'visible')
    btnSee.off('click').on('click', () => {
        parent.layer.open({
            type: 2,
            title: `报警信息查看`,
            shade: 0.8,
            area: ['1050px', '810px'],
            content: getRootPath() + `/jwxt/pages/aqgl/bjrz/bjrz_see_pic.html?id=${systemid}`,
        })
    })
    const btn = form1.find("button[type='submit']")
    btn.removeClass('hide')
}

function qdxxTab2(systemid, bjbh, bjlx_v, bjsj, bjzt, sblx_v, sbbh, jssj,czsj, ms, qkms, zpdz) {
    renderLayDateTime('XDRQ02')
    const form2 = $("#form2")
    form2.setForm({
        result: [
            {
                systemid: systemid !== 'undefined' ? systemid : '',
                bjbh: bjbh !== 'undefined' ? bjbh : '',
                bjlx_v: bjlx_v !== 'undefined' ? bjlx_v : '',
                bjsj: bjsj !== 'undefined' ? bjsj : '',
                bjzt: bjzt !== 'undefined' ? bjzt : '',
                sblx_v: sblx_v !== 'undefined' ? sblx_v : '',
                sbbh: sbbh !== 'undefined' ? sbbh : '',
                jssj: jssj !== 'undefined' ? jssj : getCurrentTime(),
                czsj: czsj !== 'undefined' ? czsj : getCurrentTime(),
                ms: ms !== 'undefined' ? ms : '',
                qkms: qkms !== 'undefined' ? qkms : '',
                zpdz: zpdz !== 'undefined' ? zpdz : '',
            }
        ]
    })
    const btnSee = form2.find("span[id='btnSeeForm2']")
    btnSee.css('visibility', 'visible')
    btnSee.off('click').on('click', () => {
        parent.layer.open({
            type: 2,
            title: `报警信息查看`,
            shade: 0.8,
            area: ['1050px', '810px'],
            content: getRootPath() + `/jwxt/pages/aqgl/bjrz/bjrz_see_pic.html?id=${systemid}`,
        })
    })
    const btn = form2.find("button[type='submit']")
    if(bjzt !== '4'){
        btn.removeClass('hide')
        $('#XDRQ02').prop('disabled',false)
        $('#qkms').prop('disabled',false)
    }else{
        btn.addClass('hide')
        $('#XDRQ02').prop('disabled',true)
        $('#qkms').prop('disabled',true)
    }
}

function getCurrentTime() {
    const now = new Date()
    const year = now.getFullYear()
    const month = (now.getMonth() + 1).toString().padStart(2, '0')
    const day = (now.getDate()).toString().padStart(2, '0')
    const hours = (now.getHours()).toString().padStart(2, '0')
    const minutes = (now.getMinutes()).toString().padStart(2, '0')
    const seconds = (now.getSeconds()).toString().padStart(2, '0')
    return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
}

/**
 * 加载被抢成功数据
 **/
function initqdData(systemid) {
    var param = {};
    param.systemid = systemid;
    getDatas(URL_READER, "bjxx_dczbjcx_qdxx", param, function (result) {
        if (result.result_state == '0') {
            $("#form1").setForm(result);
            $("#form1 button").removeClass("hide");
            $(".qdancgrwxzd").removeClass("hide");
        } else {
            alertInfor(result.result_msg, null);
            $("#form1 button").addClass("hide");
            $(".qdancgrwxzd").addClass("hide");
        }

    });
}

function validateForm1() {
    const dataForm = $('#form1')
    dataForm.validate({
        rules: {
            bjzt: {
                required: true,
                rangelength: [1, 100]
            },
            czsj: {
                required: true,
                rangelength: [1, 100]
            },
            // ms: {
            //     required: true,
            //     rangelength: [1, 100]
            // },
            qkms: {
                required: true,
                rangelength: [1, 100]
            },
        },
        messages: {
            bjzt: {
                required: e + "必填",
                rangelength: e + "不得超过100字",
            },
            czsj: {
                required: e + "必填",
                rangelength: e + "不得超过100字",
            },
            // ms: {
            //     required: e + "必填",
            //     rangelength: e + "不得超过100字",
            // },
            qkms: {
                required: e + "必填",
                rangelength: e + "不得超过100字",
            },
        },
        submitHandler: function (form) {
            const formJson = dataForm.serializeJson()
            saveData(URL_WRITER, OPTID_UPDATE, formJson, function (res) {
                if (res.result_state === 0 || res.result_state === '0') {
                    msgAfterFun(1, "保存成功", mClose)
                    // 清除表单，隐藏按钮
                    resetForm1()
                } else {
                    msgAfterFun(2, "保存失败", mClose)
                }
            })
        }
    })
}

function resetForm1() {
    dczbjTablerefresh()
    const form = $('#form1')
    form.resetForm()
    form.setForm({
        result: [
            {
                systemid: '',
                zpdz: '',
            }
        ]
    })
    form.find("button[type='submit']").addClass("hide")
    $('#btnSeeForm1').css('visibility', 'hidden')
    $('#XDRQ01').val(getCruentDatestr())
}


function validateForm2() {
    const dataForm = $('#form2')
    dataForm.validate({
        rules: {
            bjzt: {
                required: true,
                rangelength: [1, 100]
            },
            czsj: {
                required: true,
                rangelength: [1, 100]
            },
            // ms: {
            //     required: true,
            //     rangelength: [1, 100]
            // },
            qkms: {
                required: true,
                rangelength: [1, 100]
            },
        },
        messages: {
            bjzt: {
                required: e + "必填",
                rangelength: e + "不得超过100字",
            },
            czsj: {
                required: e + "必填",
                rangelength: e + "不得超过100字",
            },
            // ms: {
            //     required: e + "必填",
            //     rangelength: e + "不得超过100字",
            // },
            qkms: {
                required: e + "必填",
                rangelength: e + "不得超过100字",
            },
        },
        submitHandler: function (form) {
            const formJson = dataForm.serializeJson()
            saveData(URL_WRITER, OPTID_UPDATE, formJson, function (res) {
                if (res.result_state === 0 || res.result_state === '0') {
                    msgAfterFun(1, "保存成功", mClose)
                    // 清除表单，隐藏按钮
                    resetForm2()
                } else {
                    msgAfterFun(2, "保存失败", mClose)
                }
            })
        }
    })
}

function resetForm2() {
    wdczbjTablerefresh()
    const form = $('#form2')
    form.resetForm()
    form.setForm({
        result: [
            {
                systemid: '',
                zpdz: '',
            }
        ]
    })
    form.find("button[type='submit']").addClass("hide")
    $('#btnSeeForm2').css('visibility', 'hidden')
    $('#XDRQ02').val(getCruentDatestr())
}

/**
 * 验证数据
 * @returns
 */
function initFromValidaotr(form) {
    // $.validator.setDefaults({
    //     submitHandler: function (form) {
    //         $(form).attr("action", api_path + "/sync/Writer.i");
    //         var options = {
    //             success: function (data) {
    //                 var jsonData = $.parseJSON(data);
    //                 if (jsonData.result_state == 0) {
    //                     console.log(jsonData);
    //                     alertInfor("保存成功!", null);
    //                     $(form).find("button[type='submit']").addClass("hide");
    //                     // $(form).find(".qdancgrwxzd").addClass("hide");
    //                     // $(form).find(".qdancgrwxzdjz").addClass("hide");
    //                     if ($(form).attr("id") == "form2") {
    //                         $('#wdczbj_data').bootstrapTable('refreshOptions', {
    //                             pageNumber: 1
    //                         });
    //                         $("#form2 #czzt").val(" ");
    //                         $("#form2 #czzt").trigger("chosen:updated");
    //                     } else if ($(form).attr("id") == "form3") {
    //                         $('#bjczrbg_data').bootstrapTable('refreshOptions', {
    //                             pageNumber: 1
    //                         });
    //                         $("#form3 #xczr").val(" ");
    //                         $("#form3 #xczr").trigger("chosen:updated");
    //                     } else if ($(form).attr("id") == "form1") {
    //                         $('#dczbj_data').bootstrapTable('refreshOptions', {
    //                             pageNumber: 1
    //                         });
    //                         $("#form1 #czzt").val(" ");
    //                         $("#form1 #czzt").trigger("chosen:updated");
    //                     }
    //                     if ($(form).find("input[name='XDRW']:checked").val() == "") { //下达指令
    //                         openrwzl($(form).attr("id"), $(form).find("input[name='systemid']")
    //                             .val());
    //                     }
    //                     $(form)[0].reset();
    //
    //                 } else {
    //                     alertInfor(jsonData.result_msg, null);
    //                 }
    //             }
    //         };
    //         if ($(form).attr("id") == "form3") {
    //             if ($("#xczr").val() == "") {
    //                 layer.alert("请选择现处置人!");
    //                 return;
    //             }
    //             if ($("#xczr option:selected").text() == $("#form3 input[name='qdr_v']").val()) {
    //                 layer.alert("处置人和现处置人不能是同一人!");
    //                 return;
    //             }
    //         }
    //         if ($(form).attr("id") == "form2") { //
    //             if ($("#form2 select[name='czzt'] option:selected").text() == "未处置") {
    //                 layer.alert("当前状态不允许选择!!");
    //                 return;
    //             }
    //         }
    //         if ($(form).attr("id") == "form1") { //
    //             if ($("#form1 select[name='czzt'] option:selected").text() == "未处置") {
    //                 layer.alert("当前状态不允许选择!!");
    //                 return;
    //             }
    //         }
    //         $(form).ajaxSubmit(options);
    //     }
    // });

    // $("#form1").validate();
    // $("#form2").validate();
    // $("#form3").validate();
}


//-------------------------------------------------------------------------------------------------------------
//----------------------------我的处置报警操作--------------------------------
//-------------------------------------------------------------------------------------------------------------

function wdczbjTablerefresh() {
    $('#wdczbj_data').bootstrapTable('refreshOptions', {
        pageNumber: 1
    })
}

function initwdczbjTable() {
    //   wddczbj_num = setInterval(wdczbjTablerefresh,1000*10);

    //先销毁表格
    $('#wdczbj_data').bootstrapTable('destroy')
    //初始化表格,动态从服务器加载数据
    $("#wdczbj_data").bootstrapTable({
        method: "post", //使用get请求到服务器获取数据
        contentType: "application/json",
        dataType: "json",
        url: URL_READER,
        striped: true, //表格显示条纹
        pagination: true, //启动分页
        pageSize: 15, //每页显示的记录数
        pageNumber: 1, //当前第几页
        pageList: [5, 10, 15, 20, 25], //记录数可选列表
        search: false, //是否启用查询
        //  showColumns: true,  //显示下拉框勾选要显示的列
        // showRefresh: true,  //显示刷新按钮
        sidePagination: "server", //表示服务端请求
        //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder
        //设置为limit可以获取limit, offset, search, sort, order
        queryParamsType: "undefined",
        queryParams: function queryParams(params) { //设置查询参数
            var param = {}
            // if ($("input[name='iswc']:checked").val() == "wwc") {
            //     param.wccbj = $("input[name='iswc']:checked").val();
            // } else if ($("input[name='iswc']:checked").val() == "ywc") {
            //     param.jwcbj = $("input[name='iswc']:checked").val();
            // }
            param.userid = getLocalUser().userid
            param.bjzt = '0'
            param.exclude = true
            return {
                "optid": OPTID_SELECT,
                "page_index": params.pageNumber,
                "page_size": params.pageSize,
                "is_paging": "1",
                "is_couting": "1",
                "order": "",
                "param": param
            }
        },
        onLoadSuccess: function () {
        },
        onLoadError: tableErrorMsgHandler,
        rowStyle: function (row, index) {
            if (row.YJDJ === "01") { //红色
                return {
                    css: {
                        "color": "#FF0033"
                    }
                }
            } else if (row.YJDJ === "02") {
                return {
                    css: {
                        "color": "orange"
                    }
                }
            } else if (row.YJDJ === "03") {
                return {
                    css: {
                        "color": "#f1c232"
                    }
                }
            } else if (row.YJDJ === "04") {
                return {
                    css: {
                        "color": "#33ff00"
                    }
                }
            } else {
                return '';
            }
        },
        columns: [
            {
                // title: '报警编号',
                field: 'BJBH',
                align: 'center',
                valign: 'middle',
                visible: true
            },
            {
                // title: '报警类型',
                field: 'BJLX_V',
                align: 'center',
                valign: 'middle',
                visible: true
            },
            {
                // title: '报警时间',
                field: 'BJSJ',
                align: 'center',
                valign: 'middle',
                visible: true
            },
            {
                // title:'报警描述'
                field: 'MS',
                align: 'center',
                valign: 'middle',
                visible: true
            },
            {
                // title: '报警状态',
                field: 'BJZT_V',
                align: 'center',
                valign: 'middle',
                visible: true
            },
            {
                // title: '操作',
                field: 'SYSTEMID1',
                align: 'center',
                valign: 'middle',
                visible: true,
                formatter: function (value, row, index) {
                    return '<a href="javascript:void(0)" onclick="qdxxTab2(\''
                        + row.SYSTEMID + '\''
                        + ',\'' + row.BJBH + '\''
                        + ',\'' + row.BJLX_V + '\''
                        + ',\'' + row.BJSJ + '\''
                        + ',\'' + row.BJZT + '\''
                        + ',\'' + row.SBLX_V + '\''
                        + ',\'' + row.SBBH + '\''
                        + ',\'' + row.JSSJ + '\''
                        + ',\'' + row.CZSJ + '\''
                        + ',\'' + row.MS + '\''
                        + ',\'' + row.QKMS + '\''
                        + ',\'' + row.ZPDZ + '\''
                        + ')" title="更新"><span class="glyphicon glyphicon-share" aria-hidden="true"></span></a>'
                }
            }
            //     {
            //         // title: '操作',
            //         field: 'SYSTEMID1',
            //         align: 'center',
            //         valign: 'middle',
            //         visible: true,
            //         formatter: function (value, row, index) {
            //             // return '<button type="button" class="btn btn-xs  btn-success" onclick="initqdData2(\''+row.SYSTEMID+'\');" >处置</button>';
            //             return '<a href="javascript:void(0)" onclick="initqdData2(\'' + row.SYSTEMID +
            //                 '\');"><span class="glyphicon glyphicon-share" aria-hidden="true"></span></a>';
            //         }
            //     }
        ]
    })
    $("#form2").initDic({
        root: ROOT_PATH,
        successHandler: function () {
            $("#form2 select[name='bjzt']").trigger("chosen:updated")
        }
    })
}

/**
 * 数据加载
 **/
function initqdData2(systemid) {
    $('#form2')[0].reset();
    $("#form2 button").removeClass("hide");
    $(".qdancgrwxzdjz").removeClass("hide");
    var param = {};
    param.systemid = systemid;
    getDatas(URL_READER, "bjxx_dczbjcx_qdxx", param, function (result) {
        if (result.result_state == '0') {
            $("#form2").setForm(result);
            //	console.log(result);
        } else {
            alertInfor(result.result_msg, null);
        }

    });
}

//-------------------------------------------------------------------------------------------------------------
//----------------------------我的处置人修改--------------------------------
//-------------------------------------------------------------------------------------------------------------


function initbjczrbgTable() {
    //   wddczbj_num = setInterval(wdczbjTablerefresh,1000*10);

    //先销毁表格
    $('#bjczrbg_data').bootstrapTable('destroy');
    //初始化表格,动态从服务器加载数据
    $("#bjczrbg_data").bootstrapTable({
        method: "post", //使用get请求到服务器获取数据
        contentType: "application/json",
        dataType: "json",
        url: URL_READER,
        striped: true, //表格显示条纹
        pagination: true, //启动分页
        pageSize: 15, //每页显示的记录数
        pageNumber: 1, //当前第几页
        pageList: [5, 10, 15, 20, 25], //记录数可选列表
        search: false, //是否启用查询
        //  showColumns: true,  //显示下拉框勾选要显示的列
        // showRefresh: true,  //显示刷新按钮
        sidePagination: "server", //表示服务端请求
        //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder
        //设置为limit可以获取limit, offset, search, sort, order
        queryParamsType: "undefined",
        queryParams: function queryParams(params) { //设置查询参数
            const param = {}
            param.userid = getLocalUser().userid;
            return {
                "optid": OPTID_SELECT,
                "page_index": params.pageNumber,
                "page_size": params.pageSize,
                "is_paging": "1",
                "is_couting": "1",
                "order": "",
                "param": param
            }
        },
        onLoadSuccess: function () {
        },
        onLoadError: tableErrorMsgHandler,
        rowStyle: function (row, index) {

            if (row.YJDJ === "01") { //红色
                return {
                    css: {
                        "color": "#FF0033"
                    }
                }
            } else if (row.YJDJ === "02") {
                return {
                    css: {
                        "color": "orange"
                    }
                }
            } else if (row.YJDJ === "03") {
                return {
                    css: {
                        "color": "#f1c232"
                    }
                }
            } else if (row.YJDJ === "04") {
                return {
                    css: {
                        "color": "#33ff00"
                    }
                }
            } else {
                return '';
            }
        },
        columns: [
            {
                // title: '报警编号',
                field: 'BJBH',
                align: 'center',
                valign: 'middle',
                visible: true
            },
            {
                // title: '报警类型',
                field: 'BJLX_V',
                align: 'center',
                valign: 'middle',
                visible: true
            },
            {
                // title: '报警时间',
                field: 'BJSJ',
                align: 'center',
                valign: 'middle',
                visible: true
            },
            {
                // title:'报警描述',
                field: 'MS',
                align: 'center',
                valign: 'middle',
                visible: true
            },

            {
                // title: '报警状态',
                field: 'BJZT_V',
                align: 'center',
                valign: 'middle',
                visible: true
            },
            {
                // title: '操作',
                field: 'SYSTEMID1',
                align: 'center',
                valign: 'middle',
                visible: true,
                formatter: function (value, row, index) {
                    return '<a href="javascript:void(0)" onclick="initqdData3(\'' + row.SYSTEMID +
                        '\');"><span class="glyphicon glyphicon-share" aria-hidden="true"></span></a>';

                }
            }
        ]
    })
    laydate.render({
        elem: '#bgrq',
        type: 'datetime',
        min: getCruentDatestr(),
        theme: 'molv'
    })
    $("#form3").initDic({root:ROOT_PATH})
}

function initqdData3(systemid) {
    $('#form3')[0].reset()
    $("#form3 button").removeClass("hide")
    var param = {}
    param.systemid = systemid
    getDatas(URL_READER, "bjxx_rybgxx_listquery", param, function (result) {
        if (result.result_state == '0') {
            $("#form3").setForm(result)
            //	console.log(result);
        } else {
            alertInfor(result.result_msg, null)
        }
    })
}

/**
 * 联系客户
 * @param obj 表单编号
 * @returns
 */
function lxkh(num) {
    var khid = $("form:eq(" + num + ") input[name='khsystemid']").val();
    /* if(khid ==""){
         layer.alert("客户不存在在。");
         return;
     }*/
    layer.open({
        type: 2,
        title: '联系客户',
        shade: 0.5,
        area: ['350px', '370px'],
        content: getRootPath() + '/hth5/dpzs/bjcz/khlxdh.html?khid=' + khid //iframe的url
        //		    end:refreshTable
    });

}

function mClose() {
    const index = window.parent.parent.layer.getFrameIndex(window.name)
    parent.parent.layer.close(index)
}
