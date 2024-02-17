const alphabet = ['0','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','AA','AB','AC','AD','AE','AF','AG','AH','AI','AJ','AK','AL','AM','AN','AO','AP','AQ','AR','AS','AT','AU','AV','AW','AX','AY','AZ','BA','BB','BC','BD','BE','BF','BG','BH'];
const alphabetcot = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','AA','AB','AC','AD','AE','AF','AG','AH','AI','AJ','AK','AL','AM','AN','AO','AP','AQ','AR','AS','AT','AU','AV','AW','AX','AY','AZ','BA','BB','BC','BD','BE','BF','BG','BH'];
function saveAs(obj, fileName) {
	var tmpa = document.createElement("a");
	tmpa.download = fileName || "下载";
	tmpa.href = URL.createObjectURL(obj);
	tmpa.click();
	setTimeout(function() {
		URL.revokeObjectURL(obj);
	}, 100);
};

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
};



const countil = (a)=>{//用于获取对象中有没有 but 属性 、判断是不是多层表头  最多只能有两层表头
	let count = false;
	for( let i = 0; i < a.length; i++ ){
		if (a[i].but) {
			count = true;
			break;
		};
	};
	return count;
};
const arrtData = (k,u,t,m,r,b)=>{//生成第二排的表头及赋值
	let obj = {};
	for (let i = 0; i < k.length; i++) {
		obj[`${alphabetcot[u]}2`] = {
			v: k[i],
			s: t
		};
		for (let q = 0; q < r.length; q++ ) {
			obj[`${alphabetcot[u] + (q+3)}`] = {
				v: r[q][m[i]] != undefined ? r[q][m[i]] : '',
				s: b
			};
		};
		u++;
	};
	return obj;
};
const ToplistData = (t,k,r,b)=>{//生成表格
	let u = 0;
	let obj = {};
	if (countil(k)) { //两层表头
		for (let i = 0; i < k.length; i++) {
			let name = k[i].name;
			if(!k[i].but){
				obj[`${alphabetcot[u]}1`] = {
					v: k[i].top,
					s: t
				};
				obj[`${alphabetcot[u]}2`] = {
					v: null,
					s: t
				};
				for (let x = 0 ; x < r.length; x++) { //赋值
					
					if(name == "systemid"){
						obj[`${ alphabetcot[u] + (x+3) }`] = {
							v: x+1,
							s: b
						};
					}else{
						obj[`${ alphabetcot[u] + (x+3) }`] = {
							v: r[x][name] ? r[x][name] : '',
							s: b
						};
					}	
				}
				u++;
			}else{
				obj[`${alphabetcot[u]}1`] = {
					v: k[i].top,
					s: t
				};
				obj[`${alphabetcot[u+k[i].but.length-1]}1`] = {
					v: null,
					s: t
				};
				
				obj = {...obj, ...arrtData(k[i].but,u,t,name,r,b)}  // 返回一个新的对象。
				u += k[i].but.length;
			};
		};
	}else{
		for (let i = 0; i < k.length; i++) {
			obj[`${alphabetcot[u]}1`] = {
				v: k[i].top,
				s: t
			};
			let name = k[i].name;
			for (let x = 0 ; x < r.length; x++) { //赋值
				if( name === "systemid" ){
					obj[`${ alphabetcot[u] + (x+2) }`] = {
						v: x+1,
						s: b
					};
				}else{
					obj[`${ alphabetcot[u] + (x+2) }`] = {
						v: r[x][name] ? r[x][name] : '',
						s: b
					};
				}
			}
			u++;
		};
	};
	return obj;
};

const mergesData = (k)=>{ //合并单元格
	let arr = [];
	let u = 0;
	if(countil(k)){
		for (let i = 0; i < k.length; i++) {
			let obj;
			if(!k[i].but){
				obj = {
					s : {r : 0, c : u},
					e : {r : 1, c : u}
				};
				u++;
			}else{
				obj = {
					s : {r : 0, c : u},
					e : {r : 0, c : ( u+k[i].but.length-1 )}
				};
				u += k[i].but.length;
			};
			arr.push(obj);
		};
	};
	return arr;
};

const colsLength = (k)=>{ //设置单元格的长度
	let u = 0;
	let arr = [];
	
	for (let i = 0; i < k.length; i++) {
		if(!k[i].but){
			u++;
		}else{
			u += k[i].but.length;
		};
	};
	for ( let i = 0; i < u ; i++ ) {
		let obj = {};
		obj.wch = 15;
		arr.push(obj)
	}
	return arr;
};

function exportExcel(row,resobj,text) {
	var row = row;
	console.log('啊啊啊',row)
	if (row.length > 0) {
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
		var header = ToplistData(styleBold,resobj,row,styleCenter);
		// 表格范围，范围越大生成越慢
		var ref = 'A1:BH3000';
		// 构建 workbook 对象
		var wb = {
			SheetNames: ['Sheet1'],
			Sheets: {
				Sheet1: Object.assign({}, header, {
					// 设置 excel 单元格列的宽度
					'!cols': colsLength(resobj),
					// excel 表格渲染范围
					'!ref': ref,
					// 合并 excel 单元格
					'!merges': mergesData(resobj)
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
		saveAs(tmpDown, text+".xlsx");
	} else {
		parent.layer.msg('当前无导出数据！', {
			icon: 0
		});
	}
};