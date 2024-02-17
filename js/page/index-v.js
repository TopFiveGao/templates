let numbrex = [],LayoutBox = [];
$(document).ready(function() {
	upDatebuju();
})

// 布局查询
function upDatebuju(){
	saveData(api_path + "/common/reader", "sy_select", {}, function(data) {
		if(data.result_state == '0'){
			let D = data.result;
			let html = '';
			for (let i = 0 , len = D.length; i < len; i++) {
				let row1 = '',row2 = '';
				if(D[i+1]){
					row1 = D[i+1].ROWNUM;
				};
				if(D[i+2]){
					row2 = D[i+2].ROWNUM;
				};
				if(D[i].ROWNUM == row1){
					if(D[i].ROWNUM == row2){
						
						html +=`<div class="row row-biaoq">
									<div class="col-sm-4">
										${D[i].MBNR == undefined ? '' : D[i].MBNR}
									</div>
									<div class="col-sm-4">
										${D[i+1].MBNR == undefined ? '' : D[i+1].MBNR}
									</div>
									<div class="col-sm-4">
										${D[i+2].MBNR == undefined ? '' : D[i+2].MBNR}
									</div>
								</div>`
						i += 2;
						continue;
					};
					if(D[i].PROPORTION == '1'){
						html +=`<div class="row row-biaoq">
									<div class="col-sm-6">
										${D[i].MBNR == undefined ? '' : D[i].MBNR}
									</div>
									<div class="col-sm-6">
										${D[i+1].MBNR == undefined ? '' : D[i+1].MBNR}
									</div>
								</div>`
					}else if(D[i].PROPORTION == '2'){
						html +=`<div class="row row-biaoq">
									<div class="col-sm-4">
										${D[i].MBNR == undefined ? '' : D[i].MBNR}
									</div>
									<div class="col-sm-8">
										${D[i+1].MBNR == undefined ? '' : D[i+1].MBNR}
									</div>
								</div>`
					}else{
						html +=`<div class="row row-biaoq">
									<div class="col-sm-8">
										${D[i].MBNR == undefined ? '' : D[i].MBNR}
									</div>
									<div class="col-sm-4">
										${D[i+1].MBNR == undefined ? '' : D[i+1].MBNR}
									</div>
								</div>`
					};
					i += 1;
				}else{
					html +=`<div class="row row-biaoq">
								<div class="col-sm-12">
									${D[i].MBNR == undefined ? '' : D[i].MBNR}
								</div>
							</div>`
				}
			};
			$(".appendhtml").append(html);
			if (isSetid("vueget")) daibanrenwu();//获取通知公告的数据
			if (isSetid("sjguanli-pula")) countupDate();//获取数据管理的数据
			if (isSetid("echarts-line-chart")) echartsdata();//加载折线统计图
			if (isSetid("main1")) mixet2();//专业数据查询
			if (isSetid("yhsltj")) mixet1();//性别数据查询
			if (isSetid("xbfenxi")) xbfenxi();//系部分析
			if (isSetid("daibanrenruw")) tonzhotonggao();//待办任务
			
			
		}
	});
}
// 判断是否有这个id
function isSetid(id){
	let s = document.getElementById(id);
	if(s) return true;
	return false;
}
function urlkaoshixitong(){
	$.ajax({
		type: "POST",
		url: api_path + "/Dddl",
		contentType: "application/json",
		dataType: "json",
		data: JSON.stringify({}),
		success: function(result){
			window.open(`http://tk.zhzyzx.net/Single.aspx?code=${result.code}&nonce=${result.nonce}`)
		},
		beforeSend: function() {
			layer.load();
		},
		complete: function() {
			layer.closeAll('loading');
		},
	});
}


function jinamingbsdf() {
	var postData = {
		"optid": "xsxx_userpwd1_select",
		"page_index": 1,
		"page_size": 6,
		"is_paging": "1",
		"is_couting": "1",
		"order": "",
		"param": {}
	};
	$.ajax({
		type: "POST",
		url: api_path + "/Common/Reader.i",
		contentType: "application/json",
		dataType: "json",
		data: JSON.stringify(postData),
		success: function(result){
			
		},
		beforeSend: function() {
			layer.load();
		},
		complete: function() {
			layer.closeAll('loading');
		},
	});
}




function tonzhotonggao() {
	var postData = {
		"optid": "zsgl_xsxx_select",
		"page_index": 1,
		"page_size": 6,
		"is_paging": "1",
		"is_couting": "1",
		"order": "",
		"param": {
			"zts": '01' //通知通告id
		}
	};
	$.ajax({
		type: "POST",
		url: api_path + "/Common/Reader.i",
		contentType: "application/json",
		dataType: "json",
		data: JSON.stringify(postData),
		success: function(result){
			if (result.result_state == '0') {
				var html = '';
				if (result.result.length != 0) {
					for (var i = 0, len = result.result.length; i < len; i++) {
						var row = result.result[i];
						html += `<li>姓名：${row.XM}, 性别：${row.XB_V}, 身份证号：${row.SFZHM}
							<span style="color:#23c6c8;cursor: pointer;" onclick="xingshengupdate('${row.SYSTEMID}')">[查看详情]</span>
							<span style="color:#f8ac59;cursor: pointer;" onclick="xingshengadd('${row.SYSTEMID}')">[点击审核]</span>
						</li>`;
					};
				} else {
					html += `<li class="list-group-item"><h4 style="text-align: center;">当前没有通知通告数据!</h4></li>`;
				};
				$("#daibanrenruw").html(html);
			};
		},
		beforeSend: function() {
			layer.load();
		},
		complete: function() {
			layer.closeAll('loading');
		},
	});
}
function tonzhdhsopem(id) {
	parent.layer.open({
		type: 2,
		title: '通知通告',
		shade: 0.8,
		area: ['1100px', '800px'],
		content: getRootPath() + '/jwxt/systemManagement/xinxi/xinxi_see.html?id=' + id, // iframe的url
		end: function() {}
	});
}

function countupDate() {
	getDatas(api_path + "/Common/Reader.i", "sy_tjgl_select", {}, function(result) {
		if (result.result_state == '0') {
			$(".datanumber1").text(result.result[0].ZS)
			$(".datanumber2").text(result.result[1].ZS)
			$(".datanumber3").text("9")
			$(".datanumber4").text("8")
			$(".datanumber5").text(result.result[4].ZS)
			$(".datanumber6").text(result.result[5].ZS)
		}
		$('.counter').countUp();
	});
}


function daibanrenwu() {
	var postData = {
		"optid": "wxsy_select",
		"page_index": 1,
		"page_size": 6,
		"is_paging": "1",
		"is_couting": "1",
		"order": "",
		"param": {
			"id": '50' //通知通告id
		}
	};
	$.ajax({
		type: "POST",
		url: api_path + "/Common/Reader.i",
		contentType: "application/json",
		dataType: "json",
		data: JSON.stringify(postData),
		success: function(result){
			if (result.result_state == '0') {
				var html = '';
				if (result.result.length != 0) {
					for (var i = 0, len = result.result.length; i < len; i++) {
						var row = result.result[i];
						html += `<li class="list-group-item text-item" onclick="tonzhdhsopem('${row.SYSTEMID}')"><span class="badge badge-primary">${row.FBSJ}</span><i class="fa fa-bullhorn"></i> ${row.BT}</li>`;
					}
				} else {
					html += `<li class="list-group-item"><h4 style="text-align: center;">当前没有通知通告数据!</h4></li>`
				}
				$(".tongzhtg_yuanfei").html(html)
			}
		},
		beforeSend: function() {
			layer.load();
		},
		complete: function() {
			layer.closeAll('loading');
		},
	});
}
function daibanyuewu(){
	parent.layer.open({
		type: 2,
		title: '待办任务',
		shade: 0.8,
		area: ['1100px', '650px'],
		content: getRootPath() + '/jwxt/pages/zsgl/xssh/xssh_pa.html', // iframe的url
		end: function() {}
	});
}

//修改
function xingshengupdate(id) {
	parent.layer.open({
		type: 2,
		title: '新生信息',
		shade: 0.8,
		area: ['1100px', '650px'],
		content: getRootPath() + '/jwxt/pages/zsgl/xsxx/xsxx_tabsee.html?systemid=' + id,
		// end: refreshTable
	});
}
function xingshengadd(id) {
	parent.layer.open({
		type: 2,
		title: '新生审核',
		shade: 0.8,
		area: ['800px', '500px'],
		content: getRootPath() + '/jwxt/pages/zsgl/xssh/xssh_add.html?systemid='+id,
		end: tonzhotonggao
	});
};
const key = CryptoJS.enc.Utf8.parse("cBssbHB3ZA==HKXT");
function aesEncode(str) {
	var encryptedData = CryptoJS.AES.encrypt(str, key, {
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7
	});
	return encryptedData.toString();
}
function urluij(){
	window.open(`${getRootPath()}/zhxx/login.html?hao=${aesEncode("admin")}&son=${aesEncode("syq123456")}`)
};
function urldata(){
	window.open(`${getRootPath()}/jwxt/login.html?hao=${aesEncode("admin")}&son=${aesEncode("Syq123456")}`)
};