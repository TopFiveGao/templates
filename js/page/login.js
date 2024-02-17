var verifyCode;
$(document).ready(function () {
    verifyCode = new GVerify("v_container");
    document.getElementById("submit").onclick = function () {
        var yanzm = $("#code_input").val();
        var res = verifyCode.validate(document.getElementById("code_input").value);
        if (yanzm == "") {
            layer.alert("请输入验证码", {icon: 2, title: '提示'})
            return;
        } else {
            if (!res) {
                layer.alert("验证码错误", {icon: 2, title: '提示'})
                return;
            } else {
                login();
            }
        }
    };
    if ($.cookie("rmbUser") == "true") {
        $("#rmbUser").attr("checked", true);
        $("#usename").val($.cookie("username"));
        $("#password").val($.cookie("password"));
    }
    $('input:text:first').focus();
    $('#code_input').keypress(function (e) {
        if (e.which == 13) {
            login();
        }
    });
});
const key = CryptoJS.enc.Utf8.parse("cBssbHB3ZA==HKXT");

function aesDecode(encryptedStr) {
    var encryptedHexStr = CryptoJS.enc.Base64.parse(encryptedStr);
    var encryptedBase64Str = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    var decryptedData = CryptoJS.AES.decrypt(encryptedBase64Str, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return decryptedData.toString(CryptoJS.enc.Utf8);
}

function saveUserInfo() {
    if ($("#rmbUser").prop('checked')) {
        var username = $("#usename").val();
        var password = $("#password").val();
        $.cookie("rmbUser", "true", {
            expires: 30
        }); // 存储一个带30天期限的 cookie
        $.cookie("username", username, {
            expires: 30
        }); // 存储一个带30天期限的 cookie
        $.cookie("password", password, {
            expires: 30
        }); // 存储一个带30天期限的 cookie
    } else {
        $.cookie("rmbUser", "false", {
            expires: -1
        }); // 删除 cookie
        $.cookie("username", '', {
            expires: -1
        });
        $.cookie("password", '', {
            expires: -1
        });
    }
}

var token;

function login() {
    var username = $("#usename").val();
    var password = $("#password").val();
    $("#submit").attr('disabled', true);
    if (username == "" || password == "") {
        layer.alert("请填写用户名和密码", {icon: 2, title: '提示'})
        $("#submit").attr('disabled', false);
        return;
    }


    var yanzm = $("#code_input").val();
    var res = verifyCode.validate(document.getElementById("code_input").value);
    if (yanzm == "") {
        layer.alert("验证码错误", {icon: 2, title: '提示'})
        return;
    } else {
        if (!res) {
            layer.alert("验证码错误", {icon: 2, title: '提示'})
            return;
        }
    }
    var param = {
        "username": username,
        "password": password,
    };
    $.ajax({
        type: "POST",
        async: false,
        url: api_auth + "/auth/login",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(param),
        success: function (data) {
            if (data.result_state == "0") {
                if (!$.isEmptyObject(data.result)) {
                    saveUserInfo();
                    if (window.localStorage) {
                        var sessionStorage = window.sessionStorage;
                        let token = data.result.token;
                        let headerName = data.result.headerName;
                        sessionStorage.setItem("username_zhzz_headerName", headerName);
                        sessionStorage.setItem("username_zhzz_token", token);
                        userUserInfoAll();
                    } else {
                        layer.alert("请用新版本的浏览器", {icon: 2, title: '提示'})
                        $("#submit").removeAttr("disabled");
                        return;
                    }
                } else {
                    layer.alert("登录失败", {icon: 2, title: '提示'})
                    $("#submit").removeAttr("disabled");
                    return;
                }
            } else {

                verifyCode.refresh(); //生成验证码

                if (data.result_msg == "登录失败：无效令牌！") {
                    document.location.reload()
                    layer.alert("登录失效，请刷新页面后重试", {icon: 2, title: '提示'})

                } else if (data.result_msg == "没有找到相关用户信息") {
                    layer.alert("用户名或者密码错误，请重新输入！", {icon: 2, title: '提示'})
                    $("#submit").removeAttr("disabled");
                    return;
                }else {
                    alert(data.result_msg);
                }

                $("#submit").removeAttr("disabled");
                return;

            }
        },
        error: function (data) {
            console.log(data.responseJSON.result_msg)
            layer.alert(data.responseJSON.result_msg, {icon: 0, title: '警告'}, function () {
                document.location.reload();
            })
        },
        beforeSend: function (request) {
            request.setRequestHeader("loginToken", token);
            layer.load();
        },
        complete: function () {
            layer.closeAll('loading');
        },
    });
}

function userUserInfoAll() {
    let headers = {};
    let sessionStorage = window.sessionStorage;
    let tokenName = sessionStorage.getItem("username_zhzz_headerName");
    headers[tokenName] = sessionStorage.getItem("username_zhzz_token");
    $.ajax({
        type: "GET",
        async: false,
        url: api_auth + "/base/user/userInfoAll",
        dataType: "json",
        headers: headers,
        success: function (data) {

            if (!$.isEmptyObject(data[0])) {
                var userData = data[0].user;
                var menuData = data[0].menu;
                var optids = data[0].optid;
                if (window.localStorage) {
                    var username = userData.NAME;
                    var sessionStorage = window.sessionStorage;
                    sessionStorage.setItem("username", username);
                    sessionStorage.setItem("userData_" + username, JSON.stringify(userData));
                    sessionStorage.setItem("menuData_" + username, JSON.stringify(menuData));
                    sessionStorage.setItem("userimg_", userData.RYZHURL);
                    sessionStorage.setItem("optid_" + username, optids);
                    window.location.href = window.location.href.replace("login", "index");
                } else {
                    layer.alert("请用新版本的浏览器", {icon: 2, title: '提示'})
                    $("#submit").removeAttr("disabled");
                    return;
                }
            } else {
                layer.alert("登录失败", {icon: 2, title: '提示'})
                $("#submit").removeAttr("disabled");
                return;
            }

        },
        error: function (data) {
            console.log(data.responseJSON.result_msg)
            layer.alert(data.responseJSON.result_msg, {icon: 0, title: '警告'}, function () {
                document.location.reload();
            })
        },
        beforeSend: function (request) {
            request.setRequestHeader("loginToken", token);
            layer.load();
        },
        complete: function () {
            layer.closeAll('loading');
        },
    });
}
