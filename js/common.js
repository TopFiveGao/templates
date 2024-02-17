// /common/reader查询读取
// /common/writer写入
var activeProfile = "test";
var api_path, api_base, api_auth, api_img, api_www;
const hoststr = "http://172.17.0.191";
const hoststrww = "http://223.85.241.58";
const hoststrbs = "http://192.168.0.195";
const hoststrbd = "http://192.168.0.193";
if (window.location.href.indexOf(hoststr) != -1) {
    api_path = hoststr + ":9999/xcsb";
    api_base = hoststr + ":9999/base";
    api_auth = hoststr + ":9999";
    api_www = hoststr + ":9999/jwxtwbapi";
    api_img = hoststr + ":8001/file/ywsl/";
} else if (window.location.href.indexOf(hoststrww) != -1) {
    api_path = hoststrww + ":9999/xcsb";
    api_base = hoststrww + ":9999/base";
    api_auth = hoststrww + ":9999";
    api_www = hoststrww + ":9999/jwxtwbapi";
    api_img = hoststrww + ":8001/file/ywsl/";
} else if (window.location.href.indexOf(hoststrbs) != -1) {
    api_path = hoststrbs + ":9999/xcsb";
    api_base = hoststrbs + ":9999/base";
    api_auth = hoststrbs + ":9999";
    api_www = hoststrbs + ":9999/jwxtwbapi";
    api_img = hoststrbs + ":9525/file/ywsl/";
} else {
    api_path = hoststrbd + ":9999/xcsb"; //业务服务
    api_base = hoststrbd + ":9999/base"; //系统服务
    api_auth = hoststrbd + ":9999";
    api_www = "http://192.168.0.9:8084";
    api_img = "http://192.168.0.173:8080/ywsl/";
}
//重置chosen控件为初始化状态	
$('form').on("reset", function () {
    $(this).find("select").each(function (i, obj) {
        try {
            $(this).val('').trigger("chosen:updated");
        } catch (e) {
        }
    });
})
$(document).on("keypress", function (ev) {
    var ev = window.event || ev;
    var event = arguments.callee.caller.arguments[0] || window.event;
    if (event.target.form === undefined) {
        return true;
    }
    //屏蔽表单中的回车按钮只限于button和input两种
    if (ev.keyCode == 13 || ev.which == 13) {
        if (event.target.tagName.toUpperCase() == "BUTTON" || event.target.tagName.toUpperCase() == "INPUT") {
            return false;
        }
    }
});
let headers = {};

$(function () {
    let sessionStorage = window.sessionStorage;
    let tokenName = sessionStorage.getItem("username_zhzz_headerName");
    headers[tokenName] = sessionStorage.getItem("username_zhzz_token");
    // 设置jQuery Ajax全局的参数
    $.ajaxSetup({
        crossDomain: true, //跨域
        headers: headers,
        error: function (jqXHR, textStatus, errorThrown) {
            switch (jqXHR.status) {
                case (500):
                    parent.layer.alert("所访问得服务正在维护中，请稍后访问！", {
                        icon: 2,
                        title: '提示'
                    })
                    break;
                case (401):
                    parent.layer.alert("用户未登录!", {
                        icon: 2,
                        title: '提示'
                    })
                    break;
                case (403):
                    parent.layer.alert("无权限执行此操作!", {
                        icon: 2,
                        title: '提示'
                    })
                    break;
                case (408):
                    parent.layer.alert("请求超时!", {
                        icon: 2,
                        title: '提示'
                    })
                    break;
                case (10403):
                    alertInfor("无权访问数据!", null);
                    break;
                case (10404):
                    alertInfor("登录失效，请重新登录!", changePageToLogin);
                    break;
                case (10409): //token过期
                    alertInfor("登录失效，请重新登录!", changePageToLogin);
                    break;
                default:
                    parent.layer.alert("未知错误", {
                        icon: 2,
                        title: '提示'
                    })
            }
        }
    });
    //处理layerdate
    var layerdates = $("input[data-timetool='layerdate']");
    $.each(layerdates, function (index, obj) {
        //获取相关属性
        var elem_v = $(obj).attr("id") ? "#" + $(obj).attr("id") : $(obj).attr("name");
        var type_v = $(obj).data("timetype");
        var min_v = $(obj).data("timeminnow") ? getCruentDatestr() : null;
        var now_v = $(obj).data("timenow") ? getCruentDatestr() : null;
        // console.log("type:" + type_v + "min:" + min_v + "now:" + now_v);
        var theme_v = 'molv';
        var options = {
            elem: elem_v,
            theme: theme_v
        }
        if (min_v != null) {
            options.min = min_v
        }
        if (now_v != null) {
            options.value = now_v
        }
        if (type_v != null) {
            options.type = type_v
        }
        laydate.render(options)
    });
});


// 0 \显示 1/不显示
function dropdownMenu() { //更新数据 , 每一次点击的时候重新缓存
    let a = '';
    var selectObj = $(".dropdown-menu").find('input[type="checkbox"]');
    $.each(selectObj, function () {
        if ($(this).is(":checked")) {
            a += 0;
        } else {
            a += 1;
        }
    });
    setcoolieTable(a);
}

function setcoolieTable(a) { //缓存数据
    let date = new Date();
    let saveDays = 365; //缓存365天
    date.setTime(date.getTime() + saveDays * 24 * 3600 * 1000);
    document.cookie = "username_coolietable= " + a + "; expires= " + date.toGMTString();
}

function getCookieDate(cname) { //提取缓存数据
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function judge(i, x) { // i = 0; x = true
    const e = getCookieDate("username_coolietable");
    let t = true;
    if (x != undefined) t = x;
    if (e.length > 0) {
        t = e[i] == "0" ? true : false;
    }
    ;
    return t;
}


function changePageToLogin() {
    var w = window;
    var i = 0;
    var flag = false;
    while (true) {
        if (w.location.href.indexOf("/paxy/index.html") != -1) {
            flag = true;
            break;
        } else if (i == 10) {
            break;
        } else {
            w = w.parent;
        }
        i++;
    }
    if (flag) w.location.href = getRootPath() + '/paxy/login.html';
    sessionStorage.clear(); //清空所有缓存
}

//json数据绑定form
$.fn.setForm = function (jsonValue) {
    var obj = this;
    if (jsonValue.result.length > 0) {
        $.each(jsonValue.result[0], function (name, ival) {
            var $oinput = obj.find("input[name=" + name.toLocaleLowerCase() + "]");
            if ($oinput.attr("type") == "checkbox") {
                if (ival !== null) {
                    var checkboxObj = $("[name=" + name.toLocaleLowerCase() + "]");
                    var checkArray = ival.split(";");
                    for (var i = 0; i < checkboxObj.length; i++) {
                        for (var j = 0; j < checkArray.length; j++) {
                            if (checkboxObj[i].value == checkArray[j]) {
                                checkboxObj[i].click();
                            }
                        }
                    }
                }
            } else if ($oinput.attr("type") == "radio") {
                $oinput.each(function () {
                    var radioObj = $("[name=" + name.toLocaleLowerCase() + "]");
                    for (var i = 0; i < radioObj.length; i++) {
                        if (radioObj[i].value == ival) {
                            radioObj[i].click();
                        }
                    }
                });
            } else if ($oinput.attr("type") == "textarea") {
                obj.find("[name=" + name.toLocaleLowerCase() + "]").html(ival);
            } else {
                var $obj_ = obj.find("[name=" + name.toLocaleLowerCase() + "]");
                $obj_.val(ival);
                try {
                    $obj_.trigger("chosen:updated");
                } catch (e) {

                }
            }
        })
    }
};

//form序列化成json
$.fn.serializeJson = function (otherString) {
    var serializeObj = {},
        array = this.serializeArray();
    $(array).each(function () {
        if (serializeObj[this.name]) {
            serializeObj[this.name] += ';' + this.value;
        } else {
            serializeObj[this.name] = this.value;
        }
    });

    if (otherString != undefined) {
        var otherArray = otherString.split(';');
        $(otherArray).each(function () {
            var otherSplitArray = this.split(':');
            serializeObj[otherSplitArray[0]] = otherSplitArray[1];
        });
    }
    return serializeObj;
};

//form中字典初始化
$.fn.initDic = function (options) {
    var options = options || {};
    var successHandler = options.successHandler || (function () {
    });
    var selectObj = this.find('select[dic="dic"]');
    var numbere = 0;
    $.each(selectObj, function () {
        var selectObj_ = this;
        var param = {};
        if ($(this).attr("kind")) {
            param.kind = $(this).attr("kind");
        }
        //处理定义字典请求
        var optid = $(this).attr("optid") ? $(this).attr("optid") : "dictionary";
        var jsonde = $(this).attr("jsonde") ? true : false; //判断字典是否使用本地的json数据
        if (jsonde) {
            fetch(getRootPath() + '/jwxt/js/json/qgxzqh.json')
                .then((response) => response.json())
                .then((json) => {
                    var innerHtml = "<option value=\"\" hassubinfo=\"true\">----请选择----</option>";
                    if ($(selectObj_).attr("title") != "" && $(selectObj_).attr("title") !=
                        undefined) {
                        innerHtml = "<option value=\"\" hassubinfo=\"true\">----" + $(
                            selectObj_).attr("title") + "----</option>";
                    }

                    $.each(json, function (index, obj) {
                        innerHtml += "<option value=\"" + obj.CODE +
                            "\" hassubinfo=\"true\">" + obj.DETAIL + "</option>";
                    });
                    $(selectObj_).html(innerHtml);
                    $(selectObj_).chosen({
                        no_results_text: "正在查找该项"
                    });
                    if ($(selectObj_).attr("default")) {
                        try {
                            var code = $(selectObj_).attr("default").split(",")[0];
                            $(selectObj_).val(code);
                        } catch (e) {
                            alert(e.message);
                        }
                    }
                    $(selectObj_).trigger("chosen:updated");
                }).then(function () { //数据请求执行完成后在执行后面的代码
                numbere++; //每一次完成计数器自加
                if (numbere == selectObj.length) { //最后一次执行函数
                    eval(successHandler());
                }
            }, function () {
                console.log('执行错误')
            });
        } else {
            var url = (options.root ? api_path.substring(0, api_path.lastIndexOf('/')) + options.root : api_path) + "/Common/Reader.i"
            var postData = {
                "optid": optid,
                "page_index": "1",
                "page_size": "9999",
                "is_paging": "1",
                "is_couting": "1",
                "order": "",
                "param": param
            };
            $.ajax({
                type: "POST",
                url: url,
                // async: false, //设为同步，防止字典不能赋值
                async: true, //设为异步，防止页面反复刷新, 字典有可能不能赋值
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify(postData),
                success: function (result) {
                    var data = eval(result);
                    if (data.result_state == "0") {
                        var innerHtml = `<option value="" hassubinfo="true">----请选择----</option>`;
                        if ($(selectObj_).attr("title") != "" && $(selectObj_).attr("title") != undefined) {
                            innerHtml = `<option value="" hassubinfo="true">----${$(selectObj_).attr("title")}----</option>`;
                        }
                        if ($(selectObj_).attr("multiple") == "multiple") {
                            innerHtml = ""
                        }
                        $.each(data.result, function (index, obj) {
                            innerHtml += `<option value="${obj.CODE}" hassubinfo="true">${obj.DETAIL}</option>`;
                        });
                        $(selectObj_).html(innerHtml);
                        $(selectObj_).chosen({
                            no_results_text: "正在查找该项"
                        });
                        if ($(selectObj_).attr("default")) {
                            try {
                                var code = $(selectObj_).attr("default").split(",")[0];
                                $(selectObj_).val(code);
                            } catch (e) {
                                alert(e.message);
                            }
                        }
                        $(selectObj_).trigger("chosen:updated");
                        $(selectObj_).on('chosen:no_results', function (e, params) {
                            let id = params.chosen.container
                            console.log($(id + '>div>input').html())
                        });
                    } else {
                        parent.layer.alert("初始化字典失败");
                        return;
                    }
                }
            }).then(function () { //数据请求执行完成后在执行后面的代码
                numbere++; //每一次完成计数器自加
                if (numbere == selectObj.length) { //最后一次执行函数
                    eval(successHandler());
                }
            }, function () {
                console.log('执行错误')
            })
        }
    })
}

function getRootPath() {
    const location = window.document.location
    return `${location.protocol}//${location.host}`
}

function loadjs(script_filename) {
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', script_filename);
    script.setAttribute('id', 'coolshell_script_id');
    script_id = document.getElementById('coolshell_script_id');
    if (script_id) {
        document.getElementsByTagName('head')[0].removeChild(script_id);
    }
    document.getElementsByTagName('head')[0].appendChild(script);
}

$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

function submitFormData(url, optid, param) {
    var postData = {
        "optid": optid,
        "param": param
    };
    $.ajax({
        type: "POST",
        url: api_path + "/Common/Writer.i",
        contentType: "application/json",
        crossDomain: true, //跨域
        dataType: "json",
        data: JSON.stringify(postData),
        success: function (result) {
            mclose();
        },
        beforeSend: function () {
            layer.load();
        },
        complete: function () {
            layer.closeAll('loading');
        }
    });
}

function getForm(url, optid, param, mclose) { //数据提交或者获取\常用
    var postData = {
        "optid": optid,
        "param": param
    };
    $.ajax({
        type: "POST",
        url: url,
        contentType: "application/json",
        crossDomain: true, //跨域
        //	dataType: "json",
        data: JSON.stringify(postData),
        success: function (result) {
            var pares = JSON.parse(result)
            mclose(pares);
        },
        beforeSend: function (e) {
            layer.load();
        },
        complete: function (e) {
            layer.closeAll('loading');
        }
    });
}

function selectgetForm(url, optid, param, mclose) { //非字典数据获取\常用
    var postData = {
        "optid": optid,
        "page_index": "1",
        "page_size": "10000",
        "is_paging": "1",
        "is_couting": "1",
        "order": "",
        "param": param
    };
    $.ajax({
        type: "POST",
        url: url,
        contentType: "application/json",
        crossDomain: true, //跨域
        //	dataType: "json",
        data: JSON.stringify(postData),
        success: function (result) {
            var pares = JSON.parse(result)
            mclose(pares);
        },
        beforeSend: function (e) {
            layer.load();
        },
        complete: function (e) {
            layer.closeAll('loading');
        }
    });
}

function getUrlParam(name) {
    var url = window.location.search;
    // 正则筛选地址栏
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    // 匹配目标参数
    var result = url.substr(1).match(reg);
    //返回参数值
    return result ? decodeURIComponent(result[2]) : null;
};

function getUrlParambyURIComponent(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return decodeURIComponent(r[2]);
    return null; //返回参数值
}

function saveData(url, optid, param, successHandler, async, type) {
    if (!async) {
        async = true
    }
    if (type) {
        const formData = new FormData()
        for (const [key, val] of Object.entries(param)) {
            formData.append(key, val)
        }
        $.ajax({
            type: "POST",
            url,
            crossDomain: true,
            async,
            data: formData,
            processData: false,
            contentType: false,
            success: successHandler,
            beforeSend: function () {
                layer.load();
            },
            complete: function () {
                layer.closeAll('loading');
            },
        })
    } else {
        const postData = {
            "optid": optid,
            "param": param
        }
        $.ajax({
            type: "POST",
            async,
            crossDomain: true,
            url: url,
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: JSON.stringify(postData),
            success: successHandler,
            beforeSend: function () {
                layer.load()
            },
            complete: function () {
                layer.closeAll('loading')
            }
        })
    }
}

function getData(url, optid, param, successHandler, async) {
    if (async == undefined) {
        async = true;
    }
    // crossDomain: true;//跨域
    var postData = {
        "optid": optid,
        "page_index": "1",
        "page_size": "1",
        "is_paging": "1",
        "is_couting": "1",
        "order": "",
        "param": param
    };
    $.ajax({
        type: "POST",
        async: async,
        url: url,
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(postData),
        success: successHandler,
        //	 		error:function(data){parent.layer.alert(data);},
        beforeSend: function () {
            layer.load();
        },
        complete: function () {
            layer.closeAll('loading');
        },
    });
}

function getDatas(url, optid, param, successHandler, pagesize) {
    var postData = {
        "optid": optid,
        "page_index": "1",
        "page_size": pagesize || "50000",
        "is_paging": "1",
        "is_couting": "1",
        "order": "",
        "param": param
    };
    $.ajax({
        type: "POST",
        url: url,
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(postData),
        success: successHandler,
        beforeSend: function () {
            layer.load();
        },
        complete: function () {
            layer.closeAll('loading');
        },
    });
}

function getDatasbyPage(url, optid, param, successHandler) {
    var postData = {
        "optid": optid,
        "page_index": param.pageIndex,
        "page_size": param.pageSize,
        "is_paging": "1",
        "is_couting": "1",
        "order": "",
        "param": param
    };
    $.ajax({
        type: "POST",
        url: url,
        contentType: "application/json",
        dataType: "json",
        crossDomain: true, //跨域,
        data: JSON.stringify(postData),
        success: successHandler,
        beforeSend: function () {
            layer.load();
        },
        complete: function () {
            layer.closeAll('loading');
        },
    });
}

function upDataForm(url, optid, param, successHandler) {
    var postData = {
        "optid": optid,
        "param": param
    };
    $.ajax({
        type: "POST",
        url: url, //修改Writer.i
        contentType: "application/json",
        dataType: "json",
        crossDomain: true, //跨域
        data: JSON.stringify(postData),
        success: successHandler,
        beforeSend: function (req) {
            layer.load();
        },
        complete: function () {
            layer.closeAll('loading');
        },
    });
}

// 获取人物的信息
function getLocalUser() {
    var user = {};
    var username = sessionStorage.getItem("username");
    var userData = sessionStorage.getItem("userData_" + username);
    var userObj = JSON.parse(userData);
    user.username = userObj.NAME;
    user.usercode = userObj.LOGINNAME;
    user.userid = userObj.SYSTEMID;
    user.deptcode = userObj.DEPT;
    user.name = username;
    user.dept = userObj.DEPTNAME;
    user.sfzh = userObj.IDCARDNO;
    return user;
}

// 判断是否含有optid
function optidJudge(optid) {
    let e = false;
    var username = sessionStorage.getItem("username");
    var optidname = sessionStorage.getItem("optid_" + username);
    let arre = optidname.split(',')
    if (arre.indexOf(optid) != -1) e = true
    return e;
}


/**
 *获取文件根目录
 */
function getFileRootPath() {
    return sessionStorage.getItem("imgrootpath");
}

function getFileRoot() {
    return sessionStorage.getItem("imgrootpath");
}

//layer弹窗
$(document).ready(function () {
    try {
        layer.config({
            extend: ["extend/layer.ext.js", "skin/moon/style.css"],
            skin: "layer-ext-moon"
        });
    } catch (e) {

    }
});

function getWsRootPath() {
    return getRootPath().replace("http", "ws");
}

/**
 * 对Date的扩展，将 Date 转化为指定格式的String
 * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * eg:
 * (new Date()).pattern("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 * (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04
 * (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04
 * (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04
 * (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
 */
Date.prototype.pattern = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    var week = {
        "0": "/u65e5",
        "1": "/u4e00",
        "2": "/u4e8c",
        "3": "/u4e09",
        "4": "/u56db",
        "5": "/u4e94",
        "6": "/u516d"
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") :
                "") +
            week[this.getDay() + ""]);
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k])
                .length)));
        }
    }
    return fmt;
}

function alertInfor(info, func) {
    parent.layer.alert(info, {
        icon: 2,
        title: '提示'
    }, func)
}

function msgAfterFun(type, info, func) {
    var type_v = type || 1;
    var target = window.parent || window;
    eval(func());
    target.layer.msg(info, {
        icon: type_v
    });
}

/**
 *字典树
 **/
$.fn.initDicTree = function () {
    var inputObjs = this.find("input[dicTree='dicTree']");
    $.each(inputObjs, function () {
        var obj = this;
        var valueName = $(this).attr("valueName") ? $(this).attr("valueName") : "name";
        var treeName = $(this).attr("treeName");
        //添加一个树元素f
        var treeNode = '<div id="' + treeName +
            '_menuContent" class="menuContent" style="display:none; position: absolute;z-index:1000;">' +
            '<ul id="' + treeName + '_treeDemo" class="ztree" style="margin-top:0; width:' + $(this)
                .width() +
            'px;background-color: white;"></ul></div>';
        $(document.body).append(treeNode);
        var sspcs = [];
        sspcs.push(getLocalUser().deptcode);
        //加载树
        var postData = {
            "optid": treeName,
            "page_index": "1",
            "page_size": "100",
            "is_paging": "1",
            "is_couting": "1",
            "order": "",
            "sspcs[]": [sspcs]
        };
        var setting = {
            view: {
                dblClickExpand: false
            },
            data: {
                simpleData: {
                    enable: true
                }
            },
            callback: {
                beforeClick: tree_validatorClick,
                onClick: function (e, treeId, treeNode) {
                    var zTree = $.fn.zTree.getZTreeObj(treeName + '_treeDemo'),
                        nodes = zTree.getSelectedNodes(),
                        c = "";
                    v = "";
                    nodes.sort(function compare(a, b) {
                        return a.id - b.id;
                    });
                    for (var i = 0, l = nodes.length; i < l; i++) {
                        //v += nodes[i].name + ",";
                        v += nodes[i][valueName] + ",";
                        c += nodes[i].id + ","
                    }
                    if (v.length > 0) {
                        v = v.substring(0, v.length - 1);
                        c = c.substring(0, c.length - 1);
                    }
                    //处理字典code
                    if ($('#' + $(obj).attr("id") + '_code').length > 0) {
                        $('#' + $(obj).attr("id") + '_code').attr('value', c);
                    } else {
                        $(obj).before('<input type="hidden" id="' + $(obj).attr("id") +
                            '_code" name="' + $(obj).attr("id") +
                            '_code" value="' + c + '"/>')
                    }

                    $(obj).val(v);
                    tree_Clickbefore(obj, c, v, treeNode);
                    hideMenu(treeName);
                }
            },
            async: {
                enable: true, //启用异步加载
                url: api_path + "/asynctree/dicTree.i", //调用的后台的方法
                contentType: "application/x-www-form-urlencoded",
                autoParam: ["id"], //向后台传递的参数
                otherParam: postData, //额外的参数
                dataType: "json"
            },
            view: {
                fontCss: {
                    "font-family": '"open sans","Helvetica Neue",Helvetica,Arial,sans-serif'
                },
                showIcon: true,
                showLine: true
            }
        };
        $.fn.zTree.init($('#' + treeName + '_treeDemo'), setting);
        //添加触发事件
        $(this).bind("click", function () {
            showMenu(this, treeName);
        });
    });
}
//添加树的权限
$.fn.initauthoritydicTree = function () {
    var inputObjs = this.find("input[dicTree='dicTree']");
    $.each(inputObjs, function () {
        var obj = this;
        var valueName = $(this).attr("valueName") ? $(this).attr("valueName") : "name";
        var treeName = $(this).attr("treeName");
        //添加一个树元素
        var treeNode = '<div id="' + treeName +
            '_menuContent" class="menuContent" style="display:none; position: absolute;z-index:1000;">' +
            '<ul id="' + treeName + '_treeDemo" class="ztree" style="margin-top:0; width:' + $(this)
                .width() +
            'px;background-color: white;"></ul></div>';
        $(document.body).append(treeNode);
        //加载树
        var sspcs = getUrlParam('djbm');
        var dept = $("#dept").val();
        var postData = {
            "optid": treeName,
            "page_index": "1",
            "page_size": "100",
            "is_paging": "1",
            "is_couting": "1",
            "order": "",
            /*"sspcs[]":[sspcs]*/
            //"param": /*{"ssss":"123"}*/{"sspcs":sspcs},
            "sspcs": sspcs,
            "dept": dept,
        };
        var setting = {
            view: {
                dblClickExpand: false
            },
            data: {
                simpleData: {
                    enable: true
                }
            },
            callback: {
                beforeClick: tree_validatorClick,

                onClick: function (e, treeId, treeNode) {
                    var zTree = $.fn.zTree.getZTreeObj(treeName + '_treeDemo'),
                        nodes = zTree.getSelectedNodes();
                    //alert(treeNode.depth);
                    c = "";
                    v = "";
                    nodes.sort(function compare(a, b) {
                        return a.id - b.id;
                    });
                    for (var i = 0, l = nodes.length; i < l; i++) {
                        //v += nodes[i].name + ",";
                        v += nodes[i][valueName] + ",";
                        c += nodes[i].id + ","
                    }
                    if (v.length > 0) {
                        v = v.substring(0, v.length - 1);
                        c = c.substring(0, c.length - 1);
                    }
                    //处理字典code
                    if ($('#' + $(obj).attr("id") + '_code').length > 0) {
                        $('#' + $(obj).attr("id") + '_code').attr('value', c);
                    } else {
                        $(obj).before('<input type="hidden" id="' + $(obj).attr("id") +
                            '_code" name="' + $(obj).attr("id") +
                            '_code" value="' + c + '"/>')
                    }
                    //$(obj).attr("value", v);
                    $(obj).val(v);
                    tree_Clickbefore(obj, c, v, treeNode);
                    hideMenu(treeName);
                }
            },
            async: {
                enable: true, //启用异步加载
                url: api_path + "/asynctree/authoritydicTree.i", //调用的后台的方法
                contentType: "application/x-www-form-urlencoded",
                autoParam: ["id", "depth"], //向后台传递的参数
                otherParam: postData, //额外的参数
                dataType: "json"
            },
            view: {
                fontCss: {
                    "font-family": '"open sans","Helvetica Neue",Helvetica,Arial,sans-serif'

                },
                showIcon: true,
                showLine: true
            }
        };

        $.fn.zTree.init($('#' + treeName + '_treeDemo'), setting);
        //添加触发事件
        $(this).bind("click", function () {
            //var zTree = $.fn.zTree.getZTreeObj(treeName+'_treeDemo')
            showMenu(this, treeName);
        });
    });
}

function tree_validatorClick(treeId, treeNode) {
    //var check = (treeNode && !treeNode.isParent);
    //if (!check) alert("只能选择城市...");
    return true;
}

function tree_Clickbefore(obj, c, v, treeNode) {

}

function showMenu(obj, menu_name) {
    var cityObj = $(obj);
    var cityOffset = $(obj).offset();

    $("#" + menu_name + "_menuContent").css({
        left: cityOffset.left + "px",
        top: cityOffset.top + cityObj.outerHeight() + "px"
    }).slideDown("fast");

    $("body").bind("mousedown", {
        "menu_name": menu_name
    }, onBodyDown);

}

function hideMenu(menu_name) {
    $("#" + menu_name + "_menuContent").fadeOut("fast");
    $("body").unbind("mousedown", onBodyDown);
}

function onBodyDown(event) {
    var menu_name = event.data.menu_name;
    if (!(event.target.id == (menu_name + "_menuContent") || $(event.target).parents("#" + menu_name + "_menuContent")
            .length >
        0)) {
        hideMenu(menu_name);
    }
}

String.prototype.endWith = function (endStr) {
    var d = this.length - endStr.length;
    return (d >= 0 && this.lastIndexOf(endStr) == d)
}
String.prototype.startWith = function (startStr) {
    var d = startStr.length;
    return (d >= 0 && this.indexOf(startStr) == 0)
}

Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : ((
            "00" + o[
                k]).substr(("" + o[k]).length)));
    return fmt;
}

String.prototype.replaceAll = function (FindText, RepText) {
    regExp = new RegExp(FindText, "gm");
    return this.replace(regExp, RepText);
}


function getDeptGxfw(code) {
    if (code) {
        var str = code.replaceAll("0+?$", '');
        if (str.length % 2 == 1) {
            str = str + "0";
        }
        return str;
    }
    return code;
}

//手机号校验
function checkPhone(phone) {
    //	     	    var phone = document.getElementById('phone').value;
    if (!(/^1(3|4|5|7|8)\d{9}$/.test(phone))) {
        //	     	        alert("手机号码有误，请重填");
        return false;
    } else {
        return true;
    }
}

//固定电话校验
function checkTel(tel) {
    //	     	  var tel = document.getElementById('tel').value;
    if (!/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(tel)) {
        //	     	 alert('固定电话有误，请重填');
        return false;
    } else {
        return true;
    }
}

//重置select下拉框
function onclear() {
    $("select").val("true"); //设置值
    $("select").trigger('chosen:updated');
}

//消息加载器
function msgLoad(data) {
    var state = data.result_state;
    if (state == 0) { //成功
        return "操作成功";
    } else if (state == 202) { //权限不足
        return "权限不足";
    } else { //其他原因
        return "操作失败";
    }
}

//列表请求错误消息处理
function tableErrorMsgHandler(status) {
    switch (status) {
        case 10403:
            alertInfor("无权访问数据!", null);
            break;
        case '10403':
            alertInfor("无权访问数据!", null);
            break;
        case 10404:
            alertInfor("登录失效，请重新登录!", function () {
                changePageToLogin();
            });
            break;
        case '10404':
            alertInfor("登录失效，请重新登录!", function () {
                changePageToLogin();
            });
            break;
        default:
            // alertInfor("数据加载失败!", null);
            break;
    }
}

//树加载请求错误消息处理
function treeErrorMsgHandler(event, treeId, treeNode, XMLHttpRequest, textStatus, errorThrown) {
    switch (XMLHttpRequest.status) {
        case 10403:
            alertInfor("无权访问数据!", null);
            break;
        case 10404:
            alertInfor("登录失效，请重新登录!", function () {
                changePageToLogin();
            });
            break;
        default:
            alertInfor("数据加载失败!", null);
            break;
    }
}


function getCruentDatestr() {
    return new Date().format("yyyy-MM-dd hh:mm:ss");
}

Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k])
                .length)));
        }
    }
    return fmt;
}

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
        " " + date.getHours() + seperator2 + date.getMinutes() +
        seperator2 + date.getSeconds();
    return currentdate;
}

//监听下拉框的输入
function adds(i) {

}

// 获取当前时间
function getNowTime() {
    let dateTime;
    let yy = new Date().getFullYear();
    let mm = new Date().getMonth() + 1;
    let dd = new Date().getDate();
    let hh = new Date().getHours();
    let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() :
        new Date().getMinutes();
    let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() :
        new Date().getSeconds();
    dateTime = yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mf + ':' + ss;
    return dateTime;
};

function Timeyyer() {
    let dateTime;
    let yy = new Date().getFullYear();
    let mm = new Date().getMonth() + 1;
    let dd = new Date().getDate();
    let hh = new Date().getHours();
    let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() :
        new Date().getMinutes();
    let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() :
        new Date().getSeconds();
    dateTime = yy + '.' + mm + '.' + dd;
    return dateTime;
};


function totalNum() {
    let val = $(this).val();
    //匹配非数字
    let reg = new RegExp("([^0-9]*)", "g");
    let ma = val.match(reg);
    //如果有非数字，替换成""
    if (ma.length > 0) {
        for (var k in ma) {
            if (ma[k] != "") {
                val = val.replace(ma[k], "");
            }
            ;
        }
        ;
    }
    ;
    //可以为0，但不能以0开头
    if (val.startsWith("0") && val.length > 1) {
        val = val.substring(1, val.length);
    }
    ;
    $(this).val(val);
}