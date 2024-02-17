const URL_WRITER = api_path + "/Common/Writer.i"
const URL_READER = api_path + "/Common/Reader.i"

const OPTID_SELECT = 'paxy_jcrz_select'
const OPTID_UPDATE = 'paxy_jcrz_update'


$(document).ready(function () {
    handleSelectStyleError()
    const paramId = getUrlParam('id')
    const dataForm = $("#dataForm")
    dataForm.initDic({
        successHandler: function () {
            formDataBinding(OPTID_SELECT, paramId)
        }
    })   
    const e = "<i class='fa fa-times-circle'></i>"
    dataForm.validate({
        rules: {
            qsbh: {
                required: true,
                rangelength: [1, 100]
            },
            xm: {
                required: true,
                rangelength: [1, 100]
            },
            sfzh: {
                required: true,
                rangelength: [1, 100]
            },
            tpdz: {
                required: true,
                rangelength: [1, 100]
            },
            sfbz: {
                required: true,
                rangelength: [1, 100]
            },
            jcsj: {
                required: true,
                rangelength: [1, 100]
            },
            wz: {
                required: true,
                rangelength: [1, 100]
            },
            sbbh: {
                required: true,
                rangelength: [1, 100]
            },
        },  
        messages: {
            qsbh: {
                required: e + "必填",
                rangelength: e + "不得超过100字",
            },
            xm: {
                required: e + "必填",
                rangelength: e + "不得超过100字",
            },
            sfzh: {
                required: e + "必填",
                rangelength: e + "不得超过100字",
            },
            tpdz: {
                required: e + "必填",
                rangelength: e + "不得超过100字",
            },
            sfbz: {
                required: e + "必填",
                rangelength: e + "不得超过100字",
            },
            jcsj: {
                required: e + "必填",
                rangelength: e + "不得超过100字",
            },
            wz: {
                required: e + "必填",
                rangelength: e + "不得超过100字",
            },
            sbbh: {
                required: e + "必填",
                rangelength: e + "不得超过100字",
            },
        },
        submitHandler: function (form) {
            const formJson = $("#dataForm").serializeJson()
            
            formJson.systemid = paramId             // 正确添加 systemId
            
            if(!handleDisabledInput(formJson)){     // 处理 disabled input 
                return
            }
            
            if(!validateIdCard(formJson.sfzh)){     // 校验身份证
                checkFieldAlert('身份证号')
                return
            }
            
            saveData(URL_WRITER, OPTID_UPDATE, formJson, function (res) {
                if (res.result_state === 0 || res.result_state === '0') {
                    msgAfterFun(1, "更新成功", mClose)
                } else {
                    msgAfterFun(2, "更新失败", mClose)
                }
            })
        }
    })
})

function formDataBinding(optid, systemid) {
    getData(URL_READER, optid, {systemid}, function (result) {
        $("#dataForm").setForm(result)
    })
}

function checkFieldAlert(name) {
    parent.layer.alert(`请输入正确的${name}！`, {
        title: '提示',
        icon: 0,
    }, function (index) {
        parent.layer.close(index)
    })
}

function handleSelectStyleError() {
    const selectIds = ['sf']
    for (const select of selectIds) {
        $(`#${select}`).change(function () {
            $(this).parent().parent().removeClass('has-success').removeClass('has-error')
            $(`#${select}-error`).hide()
        })
    }
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

function mClose() {
    const index = window.parent.parent.layer.getFrameIndex(window.name)
    parent.parent.layer.close(index)
}
