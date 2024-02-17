const sessionStorage = window.sessionStorage;
const fonticon = ['fa-book', 'fa-calendar-minus-o', 'fa-hourglass', 'fa-bar-chart', 'fa-briefcase', 'fa-cubes', 'fa-gears', 'fa-folder', 'fa-group', 'fa-industry', 'fa-object-group', 'fa-pencil-square', 'fa-share-alt-square', 'fa-tags', 'fa-ticket', 'fa-support', 'fa-sliders', 'fa-sort-amount-asc', 'fa-suitcase', 'fa-wrench'];
const username = sessionStorage.getItem("username");
let menuJson = sessionStorage.getItem("menuData_" + username);
try {
    menuJson = menuJson.replace(/\.jsp/g, '.html').replace(/\/jwxt\//g, '/paxy/')
} catch (e) {
    //TODO handle the exception
}
const data = $.parseJSON(menuJson)//.filter(item => item.NAME === 'aqgl')

$(document).ready(function () {
    $("#update-url").click(updatePwd);
    $("#logout-top").click(logOut);
    $("#updatePassword").click(updatePwd);
    $("#logout").click(logOut);

    //初始化值
    if (username === "" || username === "null" || username == null) {
        window.location.href = getRootPath();
    }
    $("#username").html("" + username + "");

    //加载顶部目录
    mulendAdd();
    batfonrone();
});

function mulendAdd() {
    let html = '';
    $.each(data, function (index, obj) {//加载顶部菜单
        if (obj.NAME != "门户管理") {
            html += `<li class="hidden-xs">
					<div onclick="batfonr('${obj.NAME}','${index}')" class="${index === 0 ? 'col-font-2' : ''}"><i class="fa ${fonticon[index]}"></i> ${obj.NAME}</div>
				</li>`
        }
    });
    $("#apptopmulu").html(html);
    $(".hidden-xs div").click(mulendTop);
}

function mulendTop() {
    $(".hidden-xs div").removeClass("col-font-2");
    $(this).addClass("col-font-2");
}

function logOut() {
    $.ajax({
        type: "post",
        url: api_auth + "/auth/logout",
        async: false, //设为同步
        contentType: "application/json",
        dataType: "json",
        crossDomain: true, //跨域
        data: null,
        success: function (result) {
            var data = eval(result);
            if (data.result_state == "0") {
                window.location.href = window.location.href.replace('index.html', 'login.html')
                sessionStorage.clear(); //清空所有缓存
            } else {
                layer.alert("退出失败", {icon: 2, title: '提示'})
            }
        }
    });
}

function batfonrone() {
    let html = '';
    try {
        if (data[0].nodes) {
            $.each(data[0].nodes, function (index, obj) {//加载左侧菜单
                var ioc = `<i class="fa ${fonticon[index]}"></i>`;
                if (obj.IMG) img = `<img class="img-circle" src="${api_img + obj.IMG}" width="14" height="14" />`;
                if (obj.TYPE == '02') {
                    if (obj.NAME != '大屏展示') {
                        html += `<li>
								<a class="J_menuItem" href="${getRootPath() + obj.URL}" data-index="${index}">${ioc} <span class="nav-label">${obj.NAME}</span></a>
							</li>`
                    } else {
                        html += `<li>
								<a href="${getRootPath()}/paxy/systemManagement/dpzs/index.html"  target="_blank">${ioc} <span class="nav-label">${obj.NAME}</span></a>
							</li>`
                    }
                } else if (obj.TYPE == '01') {
                    html += ` <li>
						<a href="#">
							${ioc}
							<span class="nav-label">${obj.NAME}</span>
							<span class="fa arrow"></span>
						</a>
						<ul class="nav nav-second-level">
							${obj.nodes ? loop(obj.nodes).toString().replace(/,/g, "") : ''}
						</ul>
					</li>`
                }
            })
        }
    } catch (e) {
        console.log(e)
    }
    $(window.parent.document).find("#side-menu").html(html);
    // $(window.parent.document).find("#side-menu").html(menucaidan(data));
    $("#side-menu").metisMenu();
    $(".right-sidebar-toggle").click(function () {
        $("#right-sidebar").toggleClass("sidebar-open");
    });
    LoadJS();
    $("#side-menu li a").click(colfontClick);
}

/** 加载一级菜单数据 */
function menucaidan(p) {
    let fontlen = 0
    let html = ''
    for (let i = 0; i < p.length; i++) {
        if (p[i].TYPE == '01') {
            if (p[i].NAME != '门户管理') {
                html += `
					<li>
					    <a href="#">
					        <i class="fa ${fonticon[fontlen]}"></i>
					        <span class="nav-label">${p[i].NAME}</span>
					        <span class="fa arrow"></span>
					    </a>
					    <ul class="nav nav-second-level">
					       ${loop(p[i].nodes).toString().replace(/,/g, "")}
					    </ul>
					</li>
				`
            }
        } else if (p[i].TYPE == '02') {
            html += `
				<li>
				    <a class="J_menuItem" href="${getRootPath() + p[i].URL}"><i class="fa ${fonticon[fontlen]}"></i> <span class="nav-label">${p[i].NAME}</span></a>
				</li>
			`
        }
        fontlen++;
    }
    return html;
}

function batfonr(name, i) {
    let html = '';

    let array = data[i].nodes;

    // 对目录进行冒泡排序
    for (let i = 0; i < array.length; i++) {
        for (let n = i + 1; n < array.length; n++) {
            if (Number(array[i].ORDERBY) > Number(array[n].ORDERBY)) {
                const num = array[i]
                array[i] = array[n]
                array[n] = num
            }
        }
    }

    $.each(array, function (index, obj) {//加载左侧菜单
        var ioc = `<i class="fa ${fonticon[index]}"></i>`;
        if (obj.IMG) img = `<img class="img-circle" src="${api_img + obj.IMG}" width="14" height="14" />`;
        if (obj.TYPE == '02') {
            if (obj.NAME != '大屏展示') {
                html += `<li>
						<a class="J_menuItem" href="${getRootPath() + obj.URL}" data-index="${index}">${ioc} <span class="nav-label">${obj.NAME}</span></a>
					</li>`
            } else {
                html += `<li>
						<a href="${getRootPath()}/paxy/systemManagement/dpzs/index.html"  target="_blank">${ioc} <span class="nav-label">${obj.NAME}</span></a>
					</li>`
            }
        } else if (obj.TYPE == '01') {
            html += ` <li>
					<a href="#">
						${ioc}
						<span class="nav-label">${obj.NAME}</span>
						<span class="fa arrow"></span>
					</a>
					<ul class="nav nav-second-level">
					   ${obj.nodes ? loop(obj.nodes).toString().replace(/,/g, "") : ''}
					</ul>
				</li>`
        }
    })
    $(window.parent.document).find("#side-menu").html(html);
    $("#side-menu").metisMenu();
    $(".right-sidebar-toggle").click(function () {
        $("#right-sidebar").toggleClass("sidebar-open");
    });
    //重新加载contabs.min.js以解决tab失效的问题
    LoadJS();


    $(window.parent.document).find("#side-menu").html(html);
    $("#side-menu").metisMenu();
    $(".right-sidebar-toggle").click(function () {
        $("#right-sidebar").toggleClass("sidebar-open");
    });
    //重新加载contabs.min.js以解决tab失效的问题
    LoadJS();

    $("#side-menu li a").click(colfontClick);

}

function colfontClick() {
    $("#side-menu li a").removeClass("colfont-click");
    $(this).addClass("colfont-click");
}


var loop = (o) => {
    return o.map(e => {
        let html = '';
        if (e.TYPE == '02') {
            html += `<li>
					<a class="J_menuItem" href="${getRootPath() + e.URL}"><span class="nav-label">${e.NAME}</span></a>
				</li>`
        }
        return html
    })
}

//防止页面后退
history.pushState(null, null, document.URL);
window.addEventListener('popstate', function () {
    history.pushState(null, null, document.URL);
});
$("#side-menu").bind('DOMNodeInserted', function (e) {
    LoadJS();
});

function LoadJS() {
    var script = getRootPath() + '/paxy/js/contabs.min.js';
    loadjs(script);
    script = getRootPath() + '/paxy/js/hplus.min.js?v=4.1.0';
    loadjs(script);
}


function updatePwd() {
    var layerIndex = parent.layer.getFrameIndex(window.name);
    parent.layer.open({
        type: 2,
        title: '密码修改',
        shadeClose: true,
        shade: 0.8,
        area: ['700px', '400px'],
        content: getRootPath() + '/paxy/updatePwd.html?layerIndex=' + layerIndex, //iframe的url
        closeBtn: [1]
    });
}