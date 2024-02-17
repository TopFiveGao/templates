let numbrex = [],
	LayoutBox = [];
$(document).ready(function() {
	upDatebuju()
})

function update() {
	parent.layer.open({
		type: 2,
		title: '布局设置',
		shade: 0.8,
		area: ['900px', '400px'],
		content: getRootPath() + '/jwxt/systemManagement/gztgl/gztgl_tog.html',
		end: upDatebuju
	});
};

function penz(x) {
	parent.layer.open({
		type: 2,
		title: '容器配置',
		shade: 0.8,
		area: ['1100px', '750px'],
		content: getRootPath() + '/jwxt/systemManagement/gztgl/gztgl_pei.html?stmtgt=' + x,
		end: upDatebuju
	});
}

function updatee(e) { //删除
	parent.layer.confirm('您是否要删除该行？', {
		skin: 'layui-layer-molv',
		btn: ['是', '否'], // 按钮
		shade: false // 不显示遮罩
	}, function() {
		var param = {
			'rownum': e
		}
		let datas = {
			"optid": "sch_delete",
			"param": param
		};
		let mydata = JSON.stringify(datas);
		$.ajax({
			url: api_path + "/Common/Writer.i",
			type: 'post',
			dataType: "json",
			contentType: "application/json",
			data: mydata,
			success: function(res) {
				if (res.result_state == 0) {
					parent.layer.msg('已删除', {
						icon: 1
					});
					upDatebuju();
				} else {
					parent.layer.msg('删除失败', {
						icon: 2
					});
				}
			}
		});
	});
};
// 布局查询
function upDatebuju() {
	saveData(api_path + "/common/reader", "sy_select", {}, function(data) {
		if (data.result_state == '0') {
			let D = data.result
			let html = '';
			for (let i = 0, len = D.length; i < len; i++) {
				let htmlDtata1, htmlDtata2, htmlDtata3;

				htmlDtata1 = `<div class="ibox float-e-margins">
				     <div class="ibox-title">
				         <h5  onclick="penz('${D[i].SYSTEMID}')">点击配置</h5>
				     </div>
				     <div class="ibox-content">
				        <div class="morenpeiz">
						
						</div>
				     </div>
				 </div>`;


				let row1 = '',
					row2 = '';
				if (D[i + 1]) {
					row1 = D[i + 1].ROWNUM;
					htmlDtata2 = `<div class="ibox float-e-margins">
					     <div class="ibox-title">
					         <h5  onclick="penz('${D[i+1].SYSTEMID}')">点击配置</h5>
					     </div>
					     <div class="ibox-content">
					        <div class="morenpeiz">
							
							</div>
					     </div>
					 </div>`
				};
				if (D[i + 2]) {
					row2 = D[i + 2].ROWNUM;
					htmlDtata3 = `<div class="ibox float-e-margins">
					     <div class="ibox-title">
					         <h5  onclick="penz('${D[i+2].SYSTEMID}')">点击配置</h5>
					     </div>
					     <div class="ibox-content">
					        <div class="morenpeiz">
							
							</div>
					     </div>
					 </div>`
				};
				if (D[i].ROWNUM == row1) {
					if (D[i].ROWNUM == row2) {
						html += `<div class="row row-biaoq" draggable="true" ondrop="drop(event,this)" ondragover="dragover(event,this,'${D[i].ROWNUM}')" ondragstart="dragstart(this,'${D[i].ROWNUM}')" ondragend="dragend(this)" ondragleave="dragleave(this)">
									<div class="sanchuhang">
										<div></div>
										<div class="dlistrw" onclick="updatee('${D[i].ROWNUM}')">删除行 <i class="fa fa-trash"></i></div>
									</div>
									<div class="col-sm-4">
										${D[i].MBNR == undefined ? htmlDtata1 : D[i].MBNR}
									</div>
									<div class="col-sm-4">
										${D[i+1].MBNR == undefined ? htmlDtata2 : D[i+1].MBNR}
									</div>
									<div class="col-sm-4">
										${D[i+2].MBNR == undefined ? htmlDtata3 : D[i+2].MBNR}
									</div>
								</div>`
						i += 2;
						continue;
					}
					if (D[i].PROPORTION == '1') {
						html += `<div class="row row-biaoq" draggable="true" ondrop="drop(event,this)" ondragover="dragover(event,this,'${D[i].ROWNUM}')" ondragstart="dragstart(this,'${D[i].ROWNUM}')" ondragend="dragend(this)" ondragleave="dragleave(this)">
									<div class="sanchuhang">
										<div></div>
										<div class="dlistrw" onclick="updatee('${D[i].ROWNUM}')">删除行 <i class="fa fa-trash"></i></div>
										
									</div>
									<div class="col-sm-6">
										${D[i].MBNR == undefined ? htmlDtata1 : D[i].MBNR}
									</div>
									<div class="col-sm-6">
										${D[i+1].MBNR == undefined ? htmlDtata2 : D[i+1].MBNR}
									</div>
								</div>`
					} else if (D[i].PROPORTION == '2') {
						html += `<div class="row row-biaoq" draggable="true" ondrop="drop(event,this)" ondragover="dragover(event,this,'${D[i].ROWNUM}')" ondragstart="dragstart(this,'${D[i].ROWNUM}')" ondragend="dragend(this)" ondragleave="dragleave(this)">
									<div class="sanchuhang">
										<div></div>
										<div class="dlistrw" onclick="updatee('${D[i].ROWNUM}')">删除行 <i class="fa fa-trash"></i></div>
										
									</div>
									<div class="col-sm-4">
										${D[i].MBNR == undefined ? htmlDtata1 : D[i].MBNR}
									</div>
									<div class="col-sm-8">
										${D[i+1].MBNR == undefined ? htmlDtata2 : D[i+1].MBNR}
									</div>
								</div>`
					} else {
						html += `<div class="row row-biaoq" draggable="true" ondrop="drop(event,this)" ondragover="dragover(event,this,'${D[i].ROWNUM}')" ondragstart="dragstart(this,'${D[i].ROWNUM}')" ondragend="dragend(this)" ondragleave="dragleave(this)">
									<div class="sanchuhang">
										<div></div>
										<div class="dlistrw" onclick="updatee('${D[i].ROWNUM}')">删除行 <i class="fa fa-trash"></i></div>
										
									</div>
									<div class="col-sm-8">
										${D[i].MBNR == undefined ? htmlDtata1 : D[i].MBNR}
									</div>
									<div class="col-sm-4">
										${D[i+1].MBNR == undefined ? htmlDtata2 : D[i+1].MBNR}
									</div>
								</div>`
					}
					i += 1;
				} else {
					html += `<div class="row row-biaoq" draggable="true" ondrop="drop(event,this)" ondragover="dragover(event,this,'${D[i].ROWNUM}')" ondragstart="dragstart(this,'${D[i].ROWNUM}')" ondragend="dragend(this)" ondragleave="dragleave(this)">
								<div class="sanchuhang">
									<div></div>
									<div class="dlistrw" onclick="updatee('${D[i].ROWNUM}')">删除行 <i class="fa fa-trash"></i></div>
									
								</div>
								<div class="col-sm-12">
									${D[i].MBNR == undefined ? htmlDtata1 : D[i].MBNR}
								</div>
							</div>`
				}
			}
			$(".appendhtml").html(html)
			if (isSetid("vueget")) tonzhotonggao();//获取通知公告的数据
			if (isSetid("sjguanli-pula")) countupDate();//获取数据管理的数据
			if (isSetid("echarts-line-chart")) echartsdata();//加载折线统计图
			if (isSetid("main1")) mixet2();//专业数据查询
			if (isSetid("yhsltj")) mixet1();//性别数据查询
			if (isSetid("xbfenxi")) xbfenxi();//系部分析
		}
	});
}
// 判断是否有这个id
function isSetid(id){
	let s = document.getElementById(id);
	if(s) return true;
	return false;
}
function tonzhotonggao() {
	var param = {
		"id": '50' //通知通告id
	};
	getDatas(api_path + "/Common/Reader.i", "wxsy_select", param, function(result) {
		if (result.result_state == '0') {
			var html = ''
			if (result.result.length != 0) {
				let unm = 6;
				if (result.result.length > 6) {
					unm = 6;
				} else {
					unm = result.result.length;
				};


				for (var i = 0, len = result.result.length; i < unm; i++) {
					var resoe = result.result[i];
					html += '<li class="list-group-item" onclick="tonzhdhsopem(\'' + resoe.SYSTEMID +
						'\')"><span class="badge badge-primary">' + result.result[i].FBSJ + '</span>' + result
						.result[i].BT + '</li>'
				}
			} else {
				html += '<li class="list-group-item"><h4 style="text-align: center;">当前没有通知通告数据!</h4></li>'
			}
			$(".tongzhtg_yuanfei").html(html)
		}
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






let startDiv = null; //储存拖拽的元素
let rowa, rowb;
let temp = null;
//给子元素动态绑定事件
document.querySelectorAll('.title').forEach(function(item, index) {
	item.onclick = function() {}
})
//在元素开始被拖动时候触发
function dragstart(dom, rownuma) {
	startDiv = dom;
	rowa = rownuma
}
//在拖动操作完成时触发
function dragend(dom) {
	took(rowa, rowb)
	// dom.classList.remove('dragging');
}

//当被拖动元素在目的地元素内时触发
function dragover(e, dom, rownumb) {
	if (dom !== startDiv) {
		rowb = rownumb
		e.preventDefault();
		// dom.classList.add('drag-over');
	};
}
//当被拖动元素没有放下就离开目的地元素时触发
function dragleave(dom) {
	// dom.classList.remove('drag-over');
}

//如果子元素有动态绑定的事件可用下边方法
function drop(e, dom) {
	// startDiv.classList.remove('dragging');
	// dom.classList.remove('drag-over');
	if (startDiv !== dom) {
		var startLen = startDiv.children.length;
		var endLen = dom.children.length;
		for (; startLen--;) {
			dom.appendChild(startDiv.children[0]);
		}
		for (; endLen--;) {
			startDiv.appendChild(dom.children[0]);
		}
	}
}

function took(rownuma, rownumb) {
	var param = {
		"rownuma": rownuma,
		"rownumb": rownumb
	}
	saveData(api_path + "/Common/Writer.i", "sy_hh_update", param, function(datas) {

	});
}
