function getLocalUser() {
	var user = {};
	var username = sessionStorage.getItem("username");
	var userData = sessionStorage.getItem("userData_" + username);
	//console.log(userData);
	var userObj = JSON.parse(userData);
	user.username = userObj.LOGINNAME;
	user.userid = userObj.SYSTEMID;
	user.deptcode = userObj.DEPT;
	user.name = username;
	user.dept = userObj.DEPTNAME;
	return user;
}

$(document).ready(function() {
	//初始化值
	var sessionStorage = window.sessionStorage;
	var username = sessionStorage.getItem("username");
	if (username == "" || username == "null" || username == null) {
		window.location.href = getRootPath();
	}
	$("#username").html("" + username + "");
	//绑定按钮事件退出
	$("#logout").click(function() {
		$.ajax({
			type: "post",
			url: api_path + "/logout",
			async: false, //设为同步
			contentType: "application/json",
			dataType: "json",
			crossDomain: true,//跨域
			data: null,
			success: function(result) {
				console.log(result)
				var data = eval(result);
				if (data.result_state == "0") {
					window.location.href = getRootPath() + "/jwxt/login.html";
					sessionStorage.clear(); //清空所有缓存
				} else {
					parent.layer.alert("退出失败");
					return;
				}
			}
		});
	});

	//加载左侧菜单
	var menuJson = sessionStorage.getItem("menuData_"+username);
	var menuJsons = menuJson.replace(/\.jsp/g,'.html');//将.jsp全部替换成.html
	var data = $.parseJSON(menuJsons);
		var innerHtml = "";	
		$.each(data,function(index,obj){
		 var url=(obj.URL=="")?("#"):(obj.URL);
			if(obj.NAME == "首页"){
				return;
			};		
		 var img =(obj.IMG&&obj.IMG!='')?'<img  style="margin-right: 6px;width: 13px;height: 13px;" src="'+obj.IMG+'"/>':'';
		 var html="<li>" 
		 html+= "<a href=\""+URL+"\">";
		 html+=img;
		 html+="<span class=\"nav-label\">"+obj.NAME+"</span>";
		 html+="<span class=\"fa arrow\"></span></a>";
		 if(obj.nodes){
		 	html+="<ul class=\"nav nav-second-level\">";
			var obo_ = 
		 	$.each(obj.nodes,function(index_,obj_){
		 		var sty =' target="_blank"';
				try{
		 			if(obj_.URL.toLowerCase().indexOf("http://") != -1){
						console.log(obj_.URL)
		 				murl = obj_.URL;
		 			}else{
		 				murl =getRootPath()+obj_.URL;
		 				sty = "";
												// console.log(murl)
		 			}
		 		}catch(e){
		 			murl = getRootPath()+"/jwxt/404.html";
		 			sty = "";
		 		}
		 		html+="<li><a class=\"J_menuItem\" "+sty+" href=\""+murl+"\"><span id=\""+obj_.NAME+"\">"+obj_.NAME+"</span></a></li>";
		 	});
		 	html+="</ul>";
		 }
		 html+="</li>";
		 
		 innerHtml+=html;
		});
		$("#side-menu").append(innerHtml);
	// console.log(innerHtml)
	//重新加载js以解决tab失效的问题
	LoadJS();
	//开启消息监听
	//	openMsgListener();
	$(".contentbottom").click(function() {
		parent.layer.open({
			type: 2,
			title: '消息',
			shadeClose: true,
			shade: 0.8,
			area: ['800px', '600px'],
			content: getRootPath() + '/jwxt/message/messages.html', //iframe的url
		});
	});
});
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

function LoadJS() {
	var script = getRootPath() + '/jwxt/js/contabs.min.js';
	loadjs(script);
	script = getRootPath() + '/jwxt/js/hplus.min.js?v=4.1.0';
	loadjs(script);
}

function loadMenu() {
	$.getJSON(getRootPath() + "/jwxt/js/demo/menu.json", function(data) {
		var result = data.result;
		var innerHtml = "";
		$.each(result, function(index, obj) {
			var url = (obj.url == "") ? ("#") : (getRootPath() + obj.url);
			var html = "<a href=\"" + url + "\">";
			html += "<i class=\"fa fa-aqgl\"></i>";
			html += "<span class=\"nav-label\">" + obj.name + "</span>";
			html += "<span class=\"fa arrow\"></span></a>";
			if (obj.nodes) {
				html += "<ul class=\"nav nav-second-level\">";
				$.each(obj.nodes, function(index_, obj_) {
					html += "<li><a class=\"J_menuItem\" href=\"" + getRootPath() + obj_.url + "\" data-index=\"" + index_ +
						"\">" + obj_.name + "</a></li>";
				});
				html += "</ul>";
			}
			innerHtml += html;
		});
		$("#menu_list").html(innerHtml);
		//重新绑定菜单事件以解决菜单失效的问题
		$("#side-menu").metisMenu(), $(".right-sidebar-toggle").click(function() {
			$("#right-sidebar").toggleClass("sidebar-open");
		});
		//重新加载contabs.min.js以解决tab失效的问题
		LoadJS();
	});
}

$("#updatePassword").click(function() {
	parent.layer.open({
		type: 2,
		title: '密码修改',
		shadeClose: true,
		shade: 0.8,
		area: ['500px', '310px'],
		content: getRootPath() + '/jwxt/updatePwd.html', //iframe的url
		closeBtn: [1]
	});
});

//防止页面后退
history.pushState(null, null, document.URL);
window.addEventListener('popstate', function() {
	history.pushState(null, null, document.URL);
});
