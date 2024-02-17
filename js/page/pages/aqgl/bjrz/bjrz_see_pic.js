const URL_READER = api_path + "/Common/Reader.i"

const OPTID_SELECT = 'paxy_bjrz_select'


$(document).ready(function () {
    const dataForm = $("#dataForm")
    formDataBinding(dataForm)
})

function formDataBinding(formDom) {
    getData(URL_READER, OPTID_SELECT, { systemid: getUrlParam("id") }, function (result) {
        formDom.setForm(result)
        if(result.result_state === '0'){
            const zpdz = result.result[0].ZPDZ
            if(zpdz){
                $('#img').attr('src', zpdz )
            }
        }
    })
}

function mClose() {
    const index = window.parent.parent.layer.getFrameIndex(window.name)
    parent.parent.layer.close(index)
}
