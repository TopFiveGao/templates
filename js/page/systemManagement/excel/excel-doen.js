const alphabet = ['0','A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
	'N', 'O', 'P', 'Q', 'R', 'S', 'T','U', 'V', 'W', 'X', 'Y', 'Z', 
	'AA', 'AB', 'AC', 'AD', 'AE', 'AF', 'AG', 'AH', 'AI', 'AJ', 'AK', 'AL', 'AM',
	'AN', 'AO', 'AP', 'AQ', 'AR', 'AS', 'AT', 'AU', 'AV', 'AW', 'AX', 'AY', 'AZ', 
	'BA', 'BB', 'BC', 'BD', 'BE', 'BF', 'BG', 'BH', 'BI', 'BJ', 'BK', 'BL', 'BM', 
	'BN', 'BO', 'BP', 'BQ', 'BR', 'BS', 'BT', 'BU', 'BV', 'BW', 'BX', 'BY', 'BZ', 
	'CA', 'CB', 'CC', 'CD', 'CE', 'CF', 'CG', 'CH', 'CI', 'CJ', 'CK', 'CL', 'CM', 
	'CN', 'CO', 'CP', 'CQ', 'CR', 'CS', 'CT', 'CU', 'CV', 'CW', 'CX', 'CY', 'CZ'
];
const alphabetcot = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
	'N', 'O', 'P', 'Q', 'R', 'S', 'T','U', 'V', 'W', 'X', 'Y', 'Z', 
	'AA', 'AB', 'AC', 'AD', 'AE', 'AF', 'AG', 'AH', 'AI', 'AJ', 'AK', 'AL', 'AM',
	'AN', 'AO', 'AP', 'AQ', 'AR', 'AS', 'AT', 'AU', 'AV', 'AW', 'AX', 'AY', 'AZ', 
	'BA', 'BB', 'BC', 'BD', 'BE', 'BF', 'BG', 'BH', 'BI', 'BJ', 'BK', 'BL', 'BM', 
	'BN', 'BO', 'BP', 'BQ', 'BR', 'BS', 'BT', 'BU', 'BV', 'BW', 'BX', 'BY', 'BZ', 
	'CA', 'CB', 'CC', 'CD', 'CE', 'CF', 'CG', 'CH', 'CI', 'CJ', 'CK', 'CL', 'CM', 
	'CN', 'CO', 'CP', 'CQ', 'CR', 'CS', 'CT', 'CU', 'CV', 'CW', 'CX', 'CY', 'CZ'
];

function saveAs(obj, fileName) {
	var tmpa = document.createElement("a");
	tmpa.download = fileName || "下载";
	tmpa.href = URL.createObjectURL(obj);
	tmpa.click();
	setTimeout(function() {
		URL.revokeObjectURL(obj);
	}, 100);
}

function s2ab(s) {
	if (typeof ArrayBuffer !== 'undefined') {
		var buf = new ArrayBuffer(s.length);
		var view = new Uint8Array(buf);
		for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
		return buf;
	} else {
		var buf = new Array(s.length);
		for (var i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xFF;
		return buf;
	}
}



function xinsjbxxzdy(name) {
	var name = name || '新生信息表';
	var row = $("#data_table").bootstrapTable('getSelections');
	if (row.length > 0) {
		// Excel文件名称
		var filename = "write_num.xlsx";
		// 单元格样式
		var styleBase = {
			font: {
				sz: 9,
				color: {
					rgb: '00000000'
				}
			},
			border: {
				top: {
					style: 'thin'
				},
				bottom: {
					style: 'thin'
				},
				left: {
					style: 'thin'
				},
				right: {
					style: 'thin'
				}
			}
		};
		var styleCenter = Object.assign({}, styleBase, {
			alignment: {
				vertical: 'center',
				horizontal: 'center'
			}
		});
		var styleLeft = Object.assign({}, styleBase, {
			alignment: {
				vertical: 'center',
				horizontal: 'left'
			}
		});
		var styleBold = Object.assign({}, styleCenter, {
			font: {
				sz: 10,
				bold: true,
				color: {
					rgb: '00000000'
				}
			}
		});
		// 数据格式
		//styleCenter：居中，styleLeft：靠右
		var headers = excelTop_xsxx(styleBold, styleCenter) //表头
		// 表格范围，范围越大生成越慢
		var ref = 'A1:CZ5000';
		// 构建 workbook 对象
		var wb = {
			SheetNames: ['Sheet1'],
			Sheets: {
				// Sheet1 表示工作簿名称
				Sheet1: Object.assign({}, headers, {
					// 设置 excel 单元格列的宽度
					'!cols': [],
					// excel 表格渲染范围
					'!ref': ref
				})
			}
		};
		// 写出Excel工作簿
		var tmpDown = new Blob([
			s2ab(
				// 这里的数据是用来定义导出的格式类型
				XLSX.write(wb, {
					bookType: 'xlsx',
					bookSST: false,
					type: 'binary'
				})

			)
		], {
			type: ""
		});
		saveAs(tmpDown, name + ".xlsx");
	} else {
		parent.layer.msg('请选择需要导出的人员！', {
			icon: 0
		});
	}
}




function exportExcel(name) {
	var name = name || '毕业出口信息';
	var row = $("#data_table").bootstrapTable('getSelections');
	if (row.length > 0) {
		// Excel文件名称
		var filename = "write_num.xlsx";
		// 单元格样式
		var styleBase = {
			font: {
				sz: 9,
				color: {
					rgb: '00000000'
				}
			},
			border: {
				top: {
					style: 'thin'
				},
				bottom: {
					style: 'thin'
				},
				left: {
					style: 'thin'
				},
				right: {
					style: 'thin'
				}
			}
		};
		var styleCenter = Object.assign({}, styleBase, {
			alignment: {
				vertical: 'center',
				horizontal: 'center'
			}
		});
		var styleLeft = Object.assign({}, styleBase, {
			alignment: {
				vertical: 'center',
				horizontal: 'left'
			}
		});
		var styleBold = Object.assign({}, styleCenter, {
			font: {
				sz: 10,
				bold: true,
				color: {
					rgb: '00000000'
				}
			}
		});
		// 数据格式
		//styleCenter：居中，styleLeft：靠右
		var headers = excelTop(styleBold, styleCenter) //表头
		// 表格范围，范围越大生成越慢
		var ref = 'A1:CZ5000';
		// 构建 workbook 对象
		var wb = {
			SheetNames: ['Sheet1'],
			Sheets: {
				// Sheet1 表示工作簿名称
				Sheet1: Object.assign({}, headers, {
					// 设置 excel 单元格列的宽度
					'!cols': [],
					// excel 表格渲染范围
					'!ref': ref
				})
			}
		};
		// 写出Excel工作簿
		var tmpDown = new Blob([
			s2ab(
				// 这里的数据是用来定义导出的格式类型
				XLSX.write(wb, {
					bookType: 'xlsx',
					bookSST: false,
					type: 'binary'
				})

			)
		], {
			type: ""
		});
		saveAs(tmpDown, name + ".xlsx");
	} else {
		parent.layer.msg('请选择需要导出的人员！', {
			icon: 0
		});
	}
}

function excelTop(r, v) { //生成表格
	const date = {};
	const rowData = $("#data_table").bootstrapTable('getVisibleColumns');
	const row = $("#data_table").bootstrapTable('getSelections');
	for (let i = 1, len = rowData.length; i < len; i++) {
		if (rowData[i].title != '操作') {
			let x = alphabet[i] + '1';
			let obj = {
				v: rowData[i].title,
				s: r
			};
			date[x] = obj;
			for (let e = 0; e < row.length; e++) {
				let m = alphabet[i] + (e + 2);
				let b = row[e];
				let x = '';
				if (rowData[i].title == "序号") {
					x = (e + 1);
				} else if (rowData[i].title == "是否报到") {
					x = b[rowData[i].field] == "0" ? "否" : "是";
				} else if (b[rowData[i].field] != undefined) {
					x = b[rowData[i].field];
				}
				let obj = {
					v: x,
					s: v
				}
				date[m] = obj;
			}
		}
	}
	return date;
}

function excelTop_xsxx(r, v) { //生成表格
	const date = {};
	// const addData = [{
	// 	name: '一诊（或二诊）成绩',
	// 	dtiele: 'YZCJ',
	// }, {
	// 	name: '一诊（或二诊）语文',
	// 	dtiele: 'YZWY',
	// }, {
	// 	name: '一诊（或二诊）数学',
	// 	dtiele: 'YZSS',
	// }, {
	// 	name: '一诊（或二诊）英语',
	// 	dtiele: 'YZYW',
	// }, {
	// 	name: '中考成绩',
	// 	dtiele: 'GKZF',
	// }, {
	// 	name: '语文',
	// 	dtiele: 'YW',
	// }, {
	// 	name: '数学',
	// 	dtiele: 'SS',
	// }, {
	// 	name: '外语',
	// 	dtiele: 'WY',
	// }]
	const rowData = $("#data_table").bootstrapTable('getVisibleColumns');
	const row = $("#data_table").bootstrapTable('getSelections');
	let jiushuq = 0
	for (let i = 1, len = rowData.length; i < len; i++) {
		if (rowData[i].title != '操作') {
			jiushuq++;
			let x = alphabet[i] + '1';
			let obj = {
				v: rowData[i].title,
				s: r
			};
			date[x] = obj;
			for (let e = 0; e < row.length; e++) {
				let m = alphabet[i] + (e + 2);
				let b = row[e];
				let x = '';
				if (rowData[i].title == "序号") {
					x = (e + 1);
				} else if (rowData[i].title == "是否报到") {
					x = b[rowData[i].field] == "0" ? "否" : "是";
				} else if (b[rowData[i].field] != undefined) {
					x = b[rowData[i].field];
				}
				let obj = {
					v: x,
					s: v
				}
				date[m] = obj;
			}
		}
	}

	// for (let p = 1; p <= 7; p++) {
	// 	let num = jiushuq + p
	// 	let x = alphabet[num] + '1';
	// 	let obj = {
	// 		v: addData[p].name,
	// 		s: r
	// 	};
	// 	date[x] = obj;
	// 	for (let e = 0; e < row.length; e++) {
	// 		let m = alphabet[num] + (e + 2);
	// 		let b = row[e];
	// 		let x = '';
	// 		if (b[addData[p].dtiele] != undefined) {
	// 			x = b[addData[p].dtiele];
	// 		}
	// 		let obj = {
	// 			v: x,
	// 			s: v
	// 		}
	// 		date[m] = obj;
	// 	}
	// }
	return date;
}













//招生信息新生统计
function exportExcel2() {
	var row = $("#data_table").bootstrapTable('getSelections');
	if (row.length > 0) {
		// Excel文件名称
		var filename = "write_num.xlsx";
		// 单元格样式
		var styleBase = {
			font: {
				sz: 9,
				color: {
					rgb: '00000000'
				}
			},
			border: {
				top: {
					style: 'thin'
				},
				bottom: {
					style: 'thin'
				},
				left: {
					style: 'thin'
				},
				right: {
					style: 'thin'
				}
			}
		};
		var styleCenter = Object.assign({}, styleBase, {
			alignment: {
				vertical: 'center',
				horizontal: 'center'
			}
		});
		var styleLeft = Object.assign({}, styleBase, {
			alignment: {
				vertical: 'center',
				horizontal: 'left'
			}
		});
		var styleBold = Object.assign({}, styleCenter, {
			font: {
				sz: 10,
				bold: true,
				color: {
					rgb: '00000000'
				}
			}
		});
		// 数据格式
		//styleCenter：居中，styleLeft：靠右
		//表头
		var header = {
			'A1': {
				v: "序号",
				s: styleBold
			},
			'B1': {
				v: "学生姓名",
				s: styleBold
			},
			'C1': {
				v: "性别",
				s: styleBold
			},
			'D1': {
				v: "报读专业",
				s: styleBold
			},
			'E1': {
				v: "来源地区",
				s: styleBold
			},
			'F1': {
				v: "初中毕业",
				s: styleBold
			},
			'G1': {
				v: "初中班主任",
				s: styleBold
			},
			'H1': {
				v: "就读方式",
				s: styleBold
			},
			'I1': {
				v: "家长电话1",
				s: styleBold
			},
			'J1': {
				v: "家长电话2",
				s: styleBold
			},
			'K1': {
				v: "推荐人",
				s: styleBold
			},
			'L1': {
				v: "招生老师",
				s: styleBold
			},
			'M1': {
				v: "是否招生点",
				s: styleBold
			},
			'N1': {
				v: "是否大成都范围内",
				s: styleBold
			},
			'O1': {
				v: "当地中考满分",
				s: styleBold
			},
			'P1': {
				v: "中考承诺成绩",
				s: styleBold
			},
			'Q1': {
				v: "报名日期",
				s: styleBold
			},
			'R1': {
				v: "一诊（或二诊）成绩",
				s: styleBold
			},
			'S1': {
				v: "一诊（或二诊）语文",
				s: styleBold
			},
			'T1': {
				v: "一诊（或二诊）数学",
				s: styleBold
			},
			'U1': {
				v: "一诊（或二诊）英语",
				s: styleBold
			},
			'V1': {
				v: "中考总分",
				s: styleBold
			},
			'W1': {
				v: "中考语文",
				s: styleBold
			},
			'X1': {
				v: "中考数学",
				s: styleBold
			},
			'Y1': {
				v: "中考外语",
				s: styleBold
			},
			'Z1': {
				v: "是否报名缴费",
				s: styleBold
			},
			'AA1': {
				v: "是否报到",
				s: styleBold
			},
			'AB1': {
				v: "备注",
				s: styleBold
			}
		}
		$.each(row, (len, val) => {
			let l = len + 2;
			header[`A${l}`] = {
				v: len + 1,
				s: styleCenter
			};
			header[`B${l}`] = {
				v: val.XM ? val.XM : '',
				s: styleCenter
			};
			header[`C${l}`] = {
				v: val.XB_V ? val.XB_V : '',
				s: styleCenter
			};
			header[`D${l}`] = {
				v: val.BKZYM1_V ? val.BKZYM1_V : '',
				s: styleCenter
			};
			header[`E${l}`] = {
				v: val.LYDQ_V ? val.LYDQ_V : '',
				s: styleCenter
			};
			header[`F${l}`] = {
				v: val.BYZX ? val.BYZX_V : '',
				s: styleCenter
			};
			header[`G${l}`] = {
				v: val.CZBZR ? val.CZBZR : '',
				s: styleCenter
			};
			header[`H${l}`] = {
				v: val.JDFS_V ? val.JDFS_V : '',
				s: styleCenter
			};
			header[`I${l}`] = {
				v: val.JZDH1 ? val.JZDH1 : '',
				s: styleCenter
			};
			header[`J${l}`] = {
				v: val.JZDH2 ? val.JZDH2 : '',
				s: styleCenter
			};
			header[`K${l}`] = {
				v: val.TJR ? val.TJR : '',
				s: styleCenter
			};
			header[`L${l}`] = {
				v: val.ZSLS ? val.ZSLS : '',
				s: styleCenter
			};
			header[`M${l}`] = {
				v: val.SFZSD_V ? val.SFZSD_V : '',
				s: styleCenter
			};
			header[`N${l}`] = {
				v: val.SFDCDFWN_V ? val.SFDCDFWN_V : '',
				s: styleCenter
			};
			header[`O${l}`] = {
				v: val.DDZKMF ? val.DDZKMF : '',
				s: styleCenter
			};
			header[`P${l}`] = {
				v: val.ZKCNCJ ? val.ZKCNCJ : '',
				s: styleCenter
			};
			header[`Q${l}`] = {
				v: val.BMRQ ? val.BMRQ : '',
				s: styleCenter
			};
			header[`R${l}`] = {
				v: val.YZCJ ? val.YZCJ : '',
				s: styleCenter
			};
			header[`S${l}`] = {
				v: val.YZWY ? val.YZWY : '',
				s: styleCenter
			};
			header[`T${l}`] = {
				v: val.YZSS ? val.YZSS : '',
				s: styleCenter
			};
			header[`U${l}`] = {
				v: val.YZYW ? val.YZYW : '',
				s: styleCenter
			};
			header[`V${l}`] = {
				v: val.GKZF ? val.GKZF : '',
				s: styleCenter
			};
			header[`W${l}`] = {
				v: val.YW ? val.YW : '',
				s: styleCenter
			};
			header[`X${l}`] = {
				v: val.SS ? val.SS : '',
				s: styleCenter
			};
			header[`Y${l}`] = {
				v: val.WY ? val.WY : '',
				s: styleCenter
			};
			header[`Z${l}`] = {
				v: val.SFBMJF_V ? val.SFBMJF_V : '',
				s: styleCenter
			};
			header[`AA${l}`] = {
				v: val.BD == "0" ? "否" : "是",
				s: styleCenter
			};
			header[`AB${l}`] = {
				v: val.BZ ? val.BZ : '',
				s: styleCenter
			}
		})
		// 表格范围，范围越大生成越慢
		var ref = 'A1:CZ5000';
		// 构建 workbook 对象
		var wb = {
			SheetNames: ['Sheet1'],
			Sheets: {
				// Sheet1 表示工作簿名称
				Sheet1: Object.assign({}, header, {
					// 设置 excel 单元格列的宽度
					'!cols': [{
							wch: 15
						}, // 第一列
						{
							wch: 15
						}, // 第二列
						{
							wch: 15
						}, // 第三列
						{
							wch: 15
						}, // 第4列
						{
							wch: 15
						}, // 第5列
						{
							wch: 15
						}, // 第6列
						{
							wch: 15
						}, // 第7列
						{
							wch: 15
						}, // 第8列
						{
							wch: 15
						}, // 第9列
						{
							wch: 15
						}, // 第10列
						{
							wch: 15
						}, // 第11列
						{
							wch: 15
						}, // 第12列
						{
							wch: 15
						}, // 第13列
						{
							wch: 15
						}, // 第14列
						{
							wch: 15
						}, // 第15列
						{
							wch: 15
						}, // 第16列
						{
							wch: 15
						}, // 第17列
						{
							wch: 15
						}, // 第18列
						{
							wch: 15
						}, // 第19列
						{
							wch: 15
						}, // 第15列
						{
							wch: 15
						}, // 第21列
						{
							wch: 15
						}, // 第22列
						{
							wch: 15
						}, // 第23列
						{
							wch: 15
						}, // 第24列
						{
							wch: 15
						}, // 第25列
						{
							wch: 15
						}, // 第26列
						{
							wch: 15
						}, // 第27列
						{
							wch: 15
						} // 第28列
					],
					// excel 表格渲染范围
					'!ref': ref,
				})
			}
		};
		// 写出Excel工作簿
		// XLSX.writeFile(wb, filename);
		var tmpDown = new Blob([
			s2ab(
				// 这里的数据是用来定义导出的格式类型
				XLSX.write(wb, {
					bookType: 'xlsx',
					bookSST: false,
					type: 'binary'
				})

			)
		], {
			type: ""
		});
		saveAs(tmpDown, "新生信息.xlsx");
	} else {
		parent.layer.msg('请选择需要导出的人员！', {
			icon: 0
		});
	}
}















const countil = (a) => { //用于获取对象中有没有 but 属性 、判断是不是多层表头  最多只能有两层表头
	let count = false;
	for (let i = 0; i < a.length; i++) {
		if (a[i].but) {
			count = true;
			break;
		};
	};
	return count;
}
const arrtData = (k, u, t, m, r, b) => { //生成第二排的表头
	let obj = {};
	for (let i = 0; i < k.length; i++) {
		obj[`${alphabetcot[u]}2`] = {
			v: k[i],
			s: t
		};
		for (let q = 0; q < r.length; q++) {
			obj[`${alphabetcot[u] + (q+3)}`] = {
				v: r[q][m[i]] ? r[q][m[i]] : '',
				s: b
			};
		};
		u++;
	};
	return obj;
}
const ToplistData = (t, k, r, b) => { //生成表头
	let u = 0;
	let obj = {};
	if (countil(k)) { //两层表头
		for (let i = 0; i < k.length; i++) {
			let name = k[i].name;
			if (!k[i].but) {
				obj[`${alphabetcot[u]}1`] = {
					v: k[i].top,
					s: t
				};
				obj[`${alphabetcot[u]}2`] = {
					v: null,
					s: t
				};
				for (let x = 0; x < r.length; x++) {
					obj[`${ alphabetcot[u] + (x+3) }`] = {
						v: r[x][name] ? r[x][name] : '',
						s: b
					};
				}
				u++;
			} else {
				obj[`${alphabetcot[u]}1`] = {
					v: k[i].top,
					s: t
				};
				obj[`${alphabetcot[u+k[i].but.length-1]}1`] = {
					v: null,
					s: t
				};

				obj = {
					...obj,
					...arrtData(k[i].but, u, t, name, r, b)
				} // 返回一个新的对象。
				u += k[i].but.length;
			};
		};
	} else {
		for (let i = 0; i < k.length; i++) {
			obj[`${alphabetcot[u]}1`] = {
				v: k[i].top,
				s: t
			};
		};
	};
	return obj;
}

const mergesData = (k) => { //合并单元格
	let arr = [];
	let u = 0;
	if (countil(k)) {
		for (let i = 0; i < k.length; i++) {
			let obj;
			if (!k[i].but) {
				obj = {
					s: {
						r: 0,
						c: u
					},
					e: {
						r: 1,
						c: u
					}
				};
				u++;
			} else {
				obj = {
					s: {
						r: 0,
						c: u
					},
					e: {
						r: 0,
						c: (u + k[i].but.length - 1)
					}
				};
				u += k[i].but.length;
			};
			arr.push(obj);
		};
	};
	return arr;
}

const colsLength = (k) => { //设置单元格的长度
	let u = 0;
	let arr = [];

	for (let i = 0; i < k.length; i++) {
		if (!k[i].but) {
			u++;
		} else {
			u += k[i].but.length;
		};
	};
	for (let i = 0; i < u; i++) {
		let obj = {};
		obj.wch = 15;
		arr.push(obj)
	}
	return arr;
}



let dateName = [{
	top: '毕业年份',
	name: 'TABLE1'
}, {
	top: '专业名称',
	name: 'TABLE2'
}, {
	top: '毕业生数',
	name: 'TABLE3'
}, {
	top: '直接就业数',
	name: 'TABLE4'
}, {
	top: '升学数',
	name: 'TABLE5'
}, {
	top: '未就业数',
	name: 'TABLE6'
}, {
	top: '直接就业情况',
	name: ['TABLE7', 'TABLE8', 'TABLE9', 'TABLE10', 'TABLE11'],
	but: ['签定合同或就业协议数', '对口就业人数', '应征义务兵人数', '自主创业人数', '灵活就业人数']
}, {
	top: '按社会就业单位性质',
	name: ['TABLE12', 'TABLE13', 'TABLE14', 'TABLE15', 'TABLE16'],
	but: ['机关就业数', '事业单位就业数', '国有企业就业数', '民营企业就业数', '其他单位就业数']
}, {
	top: '按就业产业性质',
	name: ['TABLE17', 'TABLE18', 'TABLE19'],
	but: ['第一产业就业数', '第二产业就业数', '第三产业就业数']
}, {
	top: '按就业地类型',
	name: ['TABLE20', 'TABLE21', 'TABLE22'],
	but: ['本省就业数', '外省就业数', '境外就业数']
}, {
	top: '按就业渠道情况',
	name: ['TABLE23', 'TABLE24', 'TABLE25'],
	but: ['学校推荐就业数', '中介介绍就业数', '其他渠道就业数']
}, {
	top: '合同或协议签定情况',
	name: ['TABLE26', 'TABLE27', 'TABLE28', 'TABLE29'],
	but: ['一年及以下人数', '1-2（含）年人数', '2-3（含）年人数', '3年以上人数']
}, {
	top: '就业薪酬情况',
	name: ['TABLE30', 'TABLE31', 'TABLE32', 'TABLE33'],
	but: ['2000以下人数', '2001-3000人数', '3001-4000人数', '4000以上']
}, {
	top: '升学情况',
	name: ['TABLE34', 'TABLE35', 'TABLE36', 'TABLE37', 'TABLE38', 'TABLE39'],
	but: ['普通高考升学人数', '职教高考升学人数', '出国、出境升学人数', '贯通培养升学人数', '5年一贯', '升入专科数']
}, {
	top: '未就业情况',
	name: ['TABLE40', 'TABLE41', 'TABLE42'],
	but: ['待就业人数', '不就业拟升学人数', '其他暂不就业人数']
}];
//毕业出口统计
function exportExcel3(row) {
	var row = row;
	console.log(row)
	if (row.length > 0) {
		// Excel文件名称
		var filename = "write_num.xlsx";
		// 单元格样式
		var styleBase = {
			font: {
				sz: 9,
				color: {
					rgb: '00000000'
				}
			},
			border: {
				top: {
					style: 'thin'
				},
				bottom: {
					style: 'thin'
				},
				left: {
					style: 'thin'
				},
				right: {
					style: 'thin'
				}
			}
		};
		var styleCenter = Object.assign({}, styleBase, {
			alignment: {
				vertical: 'center',
				horizontal: 'center'
			}
		});
		var styleLeft = Object.assign({}, styleBase, {
			alignment: {
				vertical: 'center',
				horizontal: 'left'
			}
		});
		var styleBold = Object.assign({}, styleCenter, {
			font: {
				sz: 10,
				bold: true,
				color: {
					rgb: '00000000'
				}
			}
		});
		// 数据格式
		//styleCenter：居中，styleLeft：靠右
		//表头
		// let top = ToplistData(styleBold,dateName);
		var header = ToplistData(styleBold, dateName, row, styleCenter);
		// 表格范围，范围越大生成越慢
		var ref = 'A1:CZ5000';
		// 构建 workbook 对象
		var wb = {
			SheetNames: ['Sheet1'],
			Sheets: {
				// Sheet1 表示工作簿名称
				Sheet1: Object.assign({}, header, {
					// 设置 excel 单元格列的宽度
					'!cols': colsLength(dateName),
					// excel 表格渲染范围
					'!ref': ref,
					// 合并 excel 单元格
					'!merges': mergesData(dateName)

				})
			}
		};
		// 写出Excel工作簿
		// XLSX.writeFile(wb, filename);
		var tmpDown = new Blob([
			s2ab(
				// 这里的数据是用来定义导出的格式类型
				XLSX.write(wb, {
					bookType: 'xlsx',
					bookSST: false,
					type: 'binary'
				})

			)
		], {
			type: ""
		});
		saveAs(tmpDown, "毕业出口统计信息.xlsx");
	} else {
		parent.layer.msg('请选择需要导出的人员！', {
			icon: 0
		});
	}
}