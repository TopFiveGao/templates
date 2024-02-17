let totalnum = 0;
$(document).ready(function() {
	for (let i = 0; i < 5; i++) {
		buttonRowadd();
	}
	$("#jcr").val(getLocalUser().usercode)
	$("#name").text(getLocalUser().name)

	$("#rehdbfsf").initDic();


	initDicCode();
	$("#button_fh").click(mclose);
	$("#button_rowadd").click(buttonRowadd);
	$("#button_add").click(add);
	$(".tbr-name").text(getLocalUser().name)
	// $("#table>tbody>tr>td>input").unbind();//解除绑定事件 防止多次绑定事件
	$("#lxdh").bind("input", totalNum); //重新绑定事件



	$('#fzr').on('change', function(e, params) {
		$("#lxdh").val($("#fzr option:selected").attr("sjhm"))
	});


});

function mclose() {
	var index = window.parent.parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
	parent.parent.layer.close(index); //再执行关闭 
}

function getRecentDay(day) {
	var today = new Date();
	var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
	today.setTime(targetday_milliseconds);
	var tYear = today.getFullYear();
	var tMonth = today.getMonth();
	var tDate = today.getDate();
	var tHours = today.getHours();
	var tMinutes = today.getMinutes();
	var tSeconds = today.getSeconds();
	tMonth = doHandleMonth(tMonth + 1);
	tDate = doHandleMonth(tDate);
	return tYear + "-" + tMonth + "-" + tDate;
}

function doHandleMonth(month) {
	var m = month;
	if (month.toString().length == 1) {
		m = "0" + month;
	}
	return m;
}

function buttonRowadd() {
	totalnum += 1;
	const html = `<tr>
			<td class="xh${totalnum}">${totalnum}</td>
			<td><input id="tab1${totalnum}" autocomplete="off" /></td>
			<td><input id="tab2${totalnum}" autocomplete="off" /></td>
			<td><input id="tab3${totalnum}" autocomplete="off" /></td>
			<td><input id="tab4${totalnum}" autocomplete="off" /></td>
			<td><input id="tab5${totalnum}" autocomplete="off" /></td>
			<td><input id="tab6${totalnum}" autocomplete="off" /></td>
			<td><input id="tab7${totalnum}" autocomplete="off" /></td>
			<td><input autocomplete="off" id="data-${totalnum}" /></td>
		</tr>`;
	$("#table>tbody").append(html)
	laydate.render({
		elem: '#data-' + totalnum, //指定元素
		format: 'yyyy-MM-dd',
		type: 'date',
		max: 0 //最大值今天
	});
}

function dleteHtml() {
	let d = $("#table1>thead>tr").length;
	if (d != "1") {
		$(this).parent().parent().remove(); //添加行
		nodexindex(); //重新赋值排序号
	} else {
		parent.layer.msg('最后一行不允许删除！', {
			icon: 0
		});
	}
};

function add() {
	if ($("#ssxq").val() == "") {
		parent.layer.msg('请选择所属学期！', {
			icon: 0
		});
		return;
	};
	if ($("#jcbm").val() == "") {
		parent.layer.msg('请选择检查部门！', {
			icon: 0
		});
		return;
	};
	if ($("#fzr").val() == "") {
		parent.layer.msg('请选择负责人！', {
			icon: 0
		});
		return;
	};
	if ($("#lxdh").val() == "") {
		parent.layer.msg('请输入联系电话！', {
			icon: 0
		});
		return;
	};
	if ($("#jcsj").val() == "") {
		parent.layer.msg('请选择检查时间！', {
			icon: 0
		});
		return;
	};
	if ($("#jz").val() == "") {
		parent.layer.msg('请选择周数！', {
			icon: 0
		});
		return;
	};
	let param = {
		jcbm: $("#jcbm").val(),
		fzr: $("#fzr").val(),
		lxdh: $("#lxdh").val(),
		ssxq: $("#ssxq").val(),
		jcr: $("#jcr").val(),
		zqlx: $("#zqlx").val(),
		jcsj: $("#jcsj").val(),
		jz: $("#jz").val(),
		list: []
	}
	let len = $("#table>tbody>tr").length;
	for (let i = 1; i <= len; i++) {
		if ($("#tab1" + i).val() != '' || $("#tab2" + i).val() != '' || $("#tab3" + i).val() != '' || $("#tab4" + i)
			.val() != '' || $("#tab5" + i).val() != '' || $("#tab6" + i).val() != '' || $("#tab7" + i).val() != '' || $(
				"#data-" + i).val() != '') {
			const obj = {};
			obj.xh = $(".xh" + i).text();
			obj.aqyhd = $("#tab1" + i).val();
			obj.yhwzjjbqkms = $("#tab2" + i).val();
			obj.zgyqjclyj = $("#tab3" + i).val();
			obj.zgqx = $("#tab4" + i).val();
			obj.zgfzr = $("#tab5" + i).val();
			obj.zgwcqk = $("#tab6" + i).val();
			obj.zgysr = $("#tab7" + i).val();
			obj.yssj = $("#data-" + i).val();
			param.list.push(obj);
		}
	};
	if (param.list.length == 0) {
		parent.layer.msg('请添写表格', {
			icon: 0
		});
		return;
	}
	saveData(api_path + "/common/writer", "aqgl_aqyh_insert", param, function(res) {
		if (res.result_state == '0') {
			parent.layer.msg('保存成功', {
				icon: 1
			});
			mclose()
		} else {
			parent.layer.msg('保存失败', {
				icon: 0
			});
		}
	});
}


function totalNum() {
	let val = $(this).val();
	let reg = new RegExp("([^0-9]*)", "g");
	let ma = val.match(reg);
	//如果有非数字，替换成""
	if (ma.length > 0) {
		for (var k in ma) {
			if (ma[k] != "") {
				val = val.replace(ma[k], "");
			};
		};
	};
	//可以为0，但不能以0开头
	if (val.startsWith("0") && val.length > 1) {
		val = val.substring(1, val.length);
	};
	$(this).val(val);
}

function initDicCode() {
	let selectObj_ = '#fzr';
	getDatas(api_path + "/Common/Reader.i", "jwxx_yhzd_select", {
		kind: ""
	}, function(result) {
		let data = result.result;
		CelelsDate = data;
		var innerHtml = "<option value=\"\" hassubinfo=\"true\">--请选择--</option>";
		if ($(selectObj_).attr("title") != "" && $(selectObj_).attr("title") != undefined) {
			innerHtml = "<option value=\"\" hassubinfo=\"true\">-- " + $(selectObj_).attr("title") +
				" --</option>";
		}
		$.each(data, function(index, obj) {
			innerHtml += "<option value=\"" + obj.CODE + "\" sjhm=\"" + obj.SJHM +
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
	});
}