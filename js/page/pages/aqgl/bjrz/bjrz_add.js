const URL_WRITER = api_path + "/Common/Writer.i"

const OPTID_INSERT = 'paxy_bjrz_insert'


$(document).ready(function () {
    handleSelectStyleError()
    const dataForm = $("#dataForm")
    dataForm.initDic()   
    const e = "<i class='fa fa-times-circle'></i>"
    dataForm.validate({
        rules: {
            bjbh: {
                required: true,
                rangelength: [1, 100]
            },
            bjlx: {
                required: true,
                rangelength: [1, 100]
            },
            sbbh: {
                required: true,
                rangelength: [1, 100]
            },
            zpdz: {
                required: true,
                rangelength: [1, 100]
            },
            ms: {
                required: true,
                rangelength: [1, 100]
            },
            bjsj: {
                required: true,
                rangelength: [1, 100]
            },
            jssj: {
                required: true,
                rangelength: [1, 100]
            },
            bjzt: {
                required: true,
                rangelength: [1, 100]
            },
            dxfszt: {
                required: true,
                rangelength: [1, 100]
            },
            czsj: {
                required: true,
                rangelength: [1, 100]
            },
            qkms: {
                required: true,
                rangelength: [1, 100]
            },
        },  
        messages: {
            bjbh: {
                required: e + "必填",
                rangelength: e + "不得超过100字",
            },
            bjlx: {
                required: e + "必填",
                rangelength: e + "不得超过100字",
            },
            sbbh: {
                required: e + "必填",
                rangelength: e + "不得超过100字",
            },
            zpdz: {
                required: e + "必填",
                rangelength: e + "不得超过100字",
            },
            ms: {
                required: e + "必填",
                rangelength: e + "不得超过100字",
            },
            bjsj: {
                required: e + "必填",
                rangelength: e + "不得超过100字",
            },
            jssj: {
                required: e + "必填",
                rangelength: e + "不得超过100字",
            },
            bjzt: {
                required: e + "必填",
                rangelength: e + "不得超过100字",
            },
            dxfszt: {
                required: e + "必填",
                rangelength: e + "不得超过100字",
            },
            czsj: {
                required: e + "必填",
                rangelength: e + "不得超过100字",
            },
            qkms: {
                required: e + "必填",
                rangelength: e + "不得超过100字",
            },
        },
        submitHandler: function (form) {
            const formJson = $("#dataForm").serializeJson()
            // 处理 disabled input 
            if(!handleDisabledInput(formJson)){
                return
            }
            // 校验身份证
            if(!validateIdCard(formJson.sfzh)){
                checkFieldAlert('身份证号')
                return
            }
            saveData(URL_WRITER, OPTID_INSERT, formJson, function (res) {
                if (res.result_state === 0 || res.result_state === '0') {
                    msgAfterFun(1, "保存成功", mClose)
                } else {
                    msgAfterFun(2, "保存失败", mClose)
                }
            })
        }
    })
})

function handleSelectStyleError() {
    const selectIds = ['bjzt', 'bjlx', 'dxfszt']
    for (const select of selectIds) {
        $(`#${select}`).change(function () {
            $(this).parent().parent().removeClass('has-success').removeClass('has-error')
            $(`#${select}-error`).hide()
        })
    }
}

function bindStudentInfo() {
    const select = $("#xsxm option:selected")
    // 其他表单项绑定当前选中的 select 的数据，一定要配合自己重写字典初始化方法
    $("#sfzh").empty().val(select.val())
    $("#xh").empty().val(select.data('xh'))
    $("#bj").empty().val(select.data('bj'))
    $("#nj").empty().val(select.data('nj'))
}

function validateIdCard(idCard) {
    const pattern = /^\d{6}(\d{4})(\d{2})(\d{2})\d{3}(\d|X|x)$/;
    if (pattern.test(idCard)) {
        const year = parseInt(RegExp.$1)
        const month = parseInt(RegExp.$2)
        const day = parseInt(RegExp.$3)
        const date = new Date(year, month - 1, day)
        if (
            date.getFullYear() === year &&
            date.getMonth() === month - 1 &&
            date.getDate() === day
        ) {
            return true
        }
    }
    return false
}

function checkFieldAlert(name) {
    parent.layer.alert(`请输入正确的${name}！`, {
        title: '提示',
        icon: 0,
    }, function (index) {
        parent.layer.close(index)
    })
}

function handleDisabledInput(formJson){
    const _xxmc = $("#xxmc").val()
    if (_xxmc === "") {
        checkFieldAlert("学校名称")
        return false
    }
    formJson.xxmc = _xxmc
    return true
}

function mClose() {
    const index = window.parent.parent.layer.getFrameIndex(window.name)
    parent.parent.layer.close(index)
}

// 重写字典，接收后端发送的所有值
$.fn.initDic = function (options) {
    var options = options || {}
    var successHandler = options.successHandler || (function () {
    })
    var selectObj = this.find('select[dic="dic"]')
    var numbere = 0
    $.each(selectObj, function () {
        var selectObj_ = this
        var param = {}
        if ($(this).attr("kind")) {
            param.kind = $(this).attr("kind")
        }
        //处理定义字典请求
        var optid = $(this).attr("optid") ? $(this).attr("optid") : "dictionary"
        var jsonde = $(this).attr("jsonde") ? true : false; //判断字典是否使用本地的json数据
        if (jsonde) {
            fetch(getRootPath() + '/sjcj/js/json/qgxzqh.json')
                .then((response) => response.json())
                .then((json) => {
                    var innerHtml =
                        "<option value=\"\" hassubinfo=\"true\">----请选择----</option>"
                    if ($(selectObj_).attr("title") != "" && $(selectObj_).attr("title") !=
                        undefined) {
                        innerHtml = "<option value=\"\" hassubinfo=\"true\">----" + $(
                            selectObj_).attr("title") + "----</option>"
                    }
                    $.each(json, function (index, obj) {
                        innerHtml += "<option value=\"" + obj.CODE +
                            "\" hassubinfo=\"true\" >" + obj.DETAIL + "</option>"
                    })
                    $(selectObj_).html(innerHtml)
                    $(selectObj_).chosen({
                        no_results_text: "正在查找该项"
                    })
                    if ($(selectObj_).attr("default")) {
                        try {
                            var code = $(selectObj_).attr("default").split(",")[0]
                            $(selectObj_).val(code)
                        } catch (e) {
                            alert(e.message)
                        }
                    }
                    $(selectObj_).trigger("chosen:updated")
                }).then(function () { //数据请求执行完成后在执行后面的代码
                numbere++ //每一次完成计数器自加
                if (numbere == selectObj.length) { //最后一次执行函数
                    eval(successHandler())
                }
            }, function () {
                console.log('执行错误')
            })
        } else {
            var url = optid == "dictionary" ? api_base + "/Common/Reader.i" : api_path + "/Common/Reader.i"
            var postData = {
                "optid": optid,
                "page_index": "1",
                "page_size": "9999",
                "is_paging": "1",
                "is_couting": "1",
                "order": "",
                "param": param
            }
            $.ajax({
                type: "POST",
                url: url,
                async: true, //设为异步，防止页面反复刷新, 字典有可能不能赋值
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify(postData),
                success: function (result) {
                    var data = eval(result);
                    if (data.result_state == "0") {
                        var innerHtml = ''
                        if (!$(selectObj_).attr("multiple")) {
                            innerHtml =
                                "<option value=\"\" hassubinfo=\"true\">----请选择----</option>"
                            if ($(selectObj_).attr("title") != "" && $(selectObj_).attr("title") !=
                                undefined) {
                                innerHtml = "<option value=\"\" hassubinfo=\"true\">----" + $(
                                    selectObj_).attr("title") + "----</option>"
                            }
                        }
                        $.each(data.result, function (index, obj) {
                            innerHtml += "<option value=\"" + obj.CODE +
                                "\" hassubinfo=\"true\"  data-bj=\"" + obj.BJ + "\" data-nj=\"" + obj.NJ + "\" data-xh=\"" + obj.XH + "\" >" + obj.DETAIL + "</option>"
                        })
                        $(selectObj_).html(innerHtml)
                        $(selectObj_).chosen({
                            no_results_text: "正在查找该项"
                        })
                        if ($(selectObj_).attr("default")) {
                            try {
                                var code = $(selectObj_).attr("default").split(",")[0]
                                $(selectObj_).val(code)
                            } catch (e) {
                                alert(e.message)
                            }
                        }
                        $(selectObj_).trigger("chosen:updated")
                        $(selectObj_).on('chosen:no_results', function (e, params) {
                            let id = params.chosen.container
                            console.log($(id + '>div>input').html())
                        })
                    } else {
                        parent.layer.alert("初始化字典失败")
                        return
                    }
                }
            }).then(function () { //数据请求执行完成后在执行后面的代码
                numbere++; //每一次完成计数器自加
                if (numbere == selectObj.length) { //最后一次执行函数
                    eval(successHandler())
                }
            }, function () {
                console.log('执行错误')
            })
        }
    })
}
