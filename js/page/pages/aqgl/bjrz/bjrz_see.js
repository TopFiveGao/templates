const URL_READER = api_path + "/Common/Reader.i"

const OPTID_SELECT = 'paxy_bjrz_select'


$(document).ready(function () {
    const dataForm = $("#dataForm")
    formDataBinding(dataForm)
})

function formDataBinding(formDom) {
    getData(URL_READER, OPTID_SELECT, { systemid: getUrlParam("id") }, function (result) {
        formDom.setForm(result)
    })
}

function mClose() {
    const index = window.parent.parent.layer.getFrameIndex(window.name)
    parent.parent.layer.close(index)
}
