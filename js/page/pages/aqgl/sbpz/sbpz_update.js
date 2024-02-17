const URL_WRITER = api_path + "/Common/Writer.i"
const URL_READER = api_path + "/Common/Reader.i"

const OPTID_SELECT = 'paxy_sbpz_select'
const OPTID_UPDATE = 'paxy_sbpz_update'


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
            sbbh: {
                required: true,
                rangelength: [1, 100]
            },
            sbmc: {
                required: true,
                rangelength: [1, 100]
            },
            sbIP: {
                required: true,
                rangelength: [1, 100]
            },
            sbwz: {
                required: true,
                rangelength: [1, 100]
            },
            sblx: {
                required: true,
                rangelength: [1, 100]
            },
            sbzt: {
                required: true,
                rangelength: [1, 100]
            },
            azsj: {
                required: true,
                rangelength: [1, 100]
            },
            qysj: {
                required: true,
                rangelength: [1, 100]
            },
            // jd: {
            //     required: true,
            //     rangelength: [1, 100]
            // },
            // wd: {
            //     required: true,
            //     rangelength: [1, 100]
            // },
            bzzt: {
                required: true,
                rangelength: [1, 100]
            },
        },  
        messages: {
            sbbh: {
                required: e + "必填",
                rangelength: e + "不得超过100字",
            },
            sbmc: {
                required: e + "必填",
                rangelength: e + "不得超过100字",
            },
            sbIP: {
                required: e + "必填",
                rangelength: e + "不得超过100字",
            },
            sbwz: {
                required: e + "必填",
                rangelength: e + "不得超过100字",
            },
            sblx: {
                required: e + "必填",
                rangelength: e + "不得超过100字",
            },
            sbzt: {
                required: e + "必填",
                rangelength: e + "不得超过100字",
            },
            azsj: {
                required: e + "必填",
                rangelength: e + "不得超过100字",
            },
            qysj: {
                required: e + "必填",
                rangelength: e + "不得超过100字",
            },
            // jd: {
            //     required: e + "必填",
            //     rangelength: e + "不得超过100字",
            // },
            // wd: {
            //     required: e + "必填",
            //     rangelength: e + "不得超过100字",
            // },
            bzzt: {
                required: e + "必填",
                rangelength: e + "不得超过100字",
            },
        },
        submitHandler: function (form) {
            const formJson = $("#dataForm").serializeJson()
            formJson.id = paramId
            if($('#azsj').val() > $('#qysj').val()){
                checkFieldAlert('启用时间')
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
    getData(URL_READER, optid, {id:systemid}, function (result) {
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
    const selectIds = ['sblx', 'sbzt', 'bzzt']
    for (const select of selectIds) {
        $(`#${select}`).change(function () {
            $(this).parent().parent().removeClass('has-success').removeClass('has-error')
            $(`#${select}-error`).hide()
        })
    }
}

function mClose() {
    const index = window.parent.parent.layer.getFrameIndex(window.name)
    parent.parent.layer.close(index)
}
