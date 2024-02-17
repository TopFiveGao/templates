function echartsdata() {
	var e = echarts.init(document.getElementById("echarts-line-chart")),
		a = {
			title: {
				// text: "数据汇集增量"
			},
			tooltip: {
				trigger: "axis"
			},
			legend: {
				data: ["数据汇集增量"]
			},
			grid: {
				x: 40,
				x2: 40,
				y2: 24
			},
			calculable: !0,
			xAxis: [{
				type: "category",
				boundaryGap: !1,
				data: ["第一天", "第二天", "第三天", "第四天", "第五天", "第六天", "第七天"]
			}],
			yAxis: [{
				type: "value",
				axisLabel: {
					// formatter: "{value} 条"
					formatter: "{value}"
				}
			}],
			series: [{
				name: "数据汇集增量",
				type: "line",
				data: [70, 73, 79, 76, 74, 71, 33],
				markPoint: {
					data: [{
						type: "max",
						name: "最大值"
					}, {
						type: "min",
						name: "最小值"
					}]
				},
				markLine: {
					data: [{
						type: "average",
						name: "平均值"
					}]
				}
			}]
		};
	e.setOption(a), $(window).resize(e.resize);
}

function mixet2() {
	let chartDom = document.getElementById('main1');
	let myChart = echarts.init(chartDom);
	getDatas(api_path+"/Common/Reader.i", "sy_zy_select", {}, function(result) {
		let lsitData = {
			name: [],
			tab : [],
			data1 : [],
			data2 : [],
			data3 : []
		}
		if(result.result_state == '0'){
			// for ( let i = 0; i < result.result.length; i++ ) {
			// 	if(i == 0){
			// 		lsitData.tab.push(result.result[i].date[0].NJDM+'届');
			// 		lsitData.tab.push(result.result[i].date[1].NJDM+'届');
			// 		lsitData.tab.push(result.result[i].date[2].NJDM+'届');
			// 	};
			// 	lsitData.name.push(result.result[i].NAME);
			// 	lsitData.data1.push(result.result[i].date[0].SL);
			// 	lsitData.data2.push(result.result[i].date[1].SL);
			// 	lsitData.data3.push(result.result[i].date[2].SL);
			// }
			
			lsitData = {
				name: ['电子技术应用','高星级饭店运营与管理','会计事务','机械加工技术','计算机应用','汽车运用与维修','幼儿保育','中餐烹饪','社区公共事务管理'],
				tab : ['2020级','2021级','2022级','2023级'],
				data1 : ['184','182','150','114','261','117','208','109','15'],
				data2 : ['163','148','107','96','247','115','187','88','54'],
				data3 : ['178','145','126','103','246','122','191','119','46'],
				data4 : ['235','112','147','136','220','187','243','132','55']
			}
			
			
			
			
			let option = {
				legend: {
					data: lsitData.tab,
					textStyle: {
						fontSize: 14, //字体大小
						color: '#09d5fe' //字体颜色
					}
				},
				grid: {
					top: 30,
					right: 10,
					bottom: 20,
					left: 30,
				},
				tooltip: {
					trigger: 'axis',
				},
				xAxis: {
					type: 'category',
					boundaryGap: false,
					data: lsitData.name,
					axisLine: {
						lineStyle: {
							color: 'rgba(22, 207, 208, 0.1)',
							width: 1,
						},
					},
					axisTick: {
						show: false,
					},
					axisLabel: {
						interval: 0,
						color: '#6b7587', //坐标轴的字体颜色
						textStyle: {
							fontSize: 10,
						},
					},
				},
				yAxis: [{
					type: 'value',
					axisLabel: {
						// color: '#c0d1f2',
						// color: '#c0d1f2',//坐标轴的字体颜色
					},
					splitLine: {
						show: true,
						lineStyle: {
							color: 'rgba(22, 207, 208, 0.3)',
						},
					},
					splitArea: {
						show: true,
						areaStyle: {
							// color: 'rgba(22, 207, 208, 0.02)',
							color: '#fff',
						},
					},
					nameTextStyle: {
						color: '#1af9f9',
					},
				}],
				series: [{
					name: lsitData.tab[0],
					type: 'line',
					smooth: true,
					lineStyle: {
						width: 0,
					},
					areaStyle: {
						opacity: 0.8,
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
								offset: 0,
								color: 'rgba(128, 255, 165,0.3)',
							},
							{
								offset: 1,
								color: 'rgba(128, 255, 165,1)',
							},
						]),
					},
					emphasis: {
						focus: 'series',
					},
					data: lsitData.data1,
				},{
					name: lsitData.tab[1],
					type: 'line',
					smooth: true,
					lineStyle: {
						width: 0,
					},
					areaStyle: {
						opacity: 0.8,
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
								offset: 0,
								color: 'rgba(170, 170, 255, 0.3)',
							},
							{
								offset: 1,
								color: 'rgba(170, 170, 255, 1)',
							},
						]),
					},
					emphasis: {
						focus: 'series',
					},
					data:  lsitData.data2,
				},{
					name: lsitData.tab[2],
					type: 'line',
					smooth: true,
					lineStyle: {
						width: 0,
					},
					areaStyle: {
						opacity: 0.8,
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
								offset: 0,
								color: 'rgba(1, 191, 236,0.3)',
							},
							{
								offset: 1,
								color: 'rgba(1, 191, 236,1)',
							},
						]),
					},
					emphasis: {
						focus: 'series',
					},
					data:  lsitData.data3,
				}],
			};
			option && myChart.setOption(option);
		}
	});
}


function mixet1(){
	let chartDom = document.getElementById('yhsltj');
	let myChart = echarts.init(chartDom);
	getDatas(api_path+"/Common/Reader.i", "sy_nntj_select", {}, function(result) {
		if(result.result_state == '0'){
			let data = [{
				name: "男",
				value: result.result[0].NAN
			},{
				name: "女",
				value: result.result[0].NV
			}];
			const option = {
				legend: {
					textStyle: {
						fontSize: 14, //字体大小
						color: '#09d5fe' //字体颜色
					}
				},
				tooltip: {
					trigger: 'item',
				},
				series: [
					{
						name: '性别统计',
						type: 'pie',
						radius: [25, 70],
						center: ['50%', '50%'],
						// roseType: 'area',
						itemStyle: {
							borderRadius: 5,
						},
						data: data,
						label: {
							color: '#09d5fe',
						},
					},
				],
			};
			option && myChart.setOption(option);
			
		}
	});
}


// color: ["#fc8104", "#25a0ea", "#1ef9f7", "#f781d3","#0cff6b"],


function xbfenxi(){
	let chartDom = document.getElementById('xbfenxi');
	let myChart = echarts.init(chartDom);
	const option = {
		grid: {
			top: 10,
			right: 0,
			bottom: 20,
			left: 30,
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow',
			},
		},
		xAxis: {
			data: ['信息工程系', '交通制造系', '现代服务系', '旅游服务系', '本科部', '大专部', '国际部', '9+3', '普职融通班'],
			axisLine: {
				lineStyle: {
					color: 'rgba(22, 207, 208, 0.5)',
					width: 1,
				},
			},
			axisTick: {
				show: false,
			},
			axisLabel: {
				// color: '#c0d1f2',
				color: '#6b7587',
				
			},
		},
		yAxis: [{
				type: 'value',
				axisLine: {
					show: true,
					lineStyle: {
						color: 'rgba(22, 207, 208, 0.1)',
					},
				},
				axisLabel: {
					// color: '#c0d1f2',
					color: '#6b7587',
				},
				splitLine: {
					show: true,
					lineStyle: {
						color: 'rgba(22, 207, 208, 0.3)',
					},
				},
				splitArea: {
					show: true,
					areaStyle: { 
						// color: 'rgba(22, 207, 208, 0.02)',  //背景颜色
						color: '#fff',  //背景颜色
					},
				},
				nameTextStyle: {
					color: '#16cfd0',
				},
			},
			{
				type: 'value',
				position: 'right',
				axisLine: {
					show: false,
				},
				axisLabel: {
					show: true,
					formatter: '{value}%',
					textStyle: {
						color: '#16cfd0',
					},
				},
				splitLine: {
					show: false,
				},
				axisTick: {
					show: false,
				},
				splitArea: {
					show: true,
					areaStyle: {
						color: 'rgba(22, 207, 208, 0.02)',
					},
				},
				nameTextStyle: {
					color: '#16cfd0',
				},
			},
		],
		series: [{
			name: '2020级',
			type: 'bar',
			barWidth: 15,
			itemStyle: {
				normal: {
					// color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
					// 		offset: 0,
					// 		color: '#00FFE3',
					// 	},
					// 	{
					// 		offset: 1,
					// 		color: '#4693EC',
					// 	},
					// ]),
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: 'rgba(170, 170, 255, 0.3)',
						},
						{
							offset: 1,
							color: 'rgba(170, 170, 255, 1)',
						},
					]),
				},
			},
			data: [270, 106, 215, 201, 163, 153, 176, 56, 0],
		},{
			name: '2021级',
			type: 'bar',
			barWidth: 15,
			itemStyle: {
				normal: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: 'rgba(1, 191, 236,0.3)',
						},
						{
							offset: 1,
							color: 'rgba(1, 191, 236,1)',
						},
					]),
				},
			},
			data: [168, 81, 175, 105, 204, 245,178, 49, 0],
		},{
			name: '2022级',
			type: 'bar',
			barWidth: 15,
			itemStyle: {
				normal: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: 'rgba(170, 170, 255, 0.3)',
						},
						{
							offset: 1,
							color: 'rgba(170, 170, 255, 1)',
						},
					]),
				},
			},
			data: [186, 90, 152, 135, 231, 301, 181, 0, 0],
		},{
			name: '2023级',
			type: 'bar',
			barWidth: 15,
			itemStyle: {
				normal: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: 'rgba(1, 191, 236,0.3)',
						},
						{
							offset: 1,
							color: 'rgba(1, 191, 236,1)',
						},
					]),
				},
			},
			data: [120, 114, 173, 93, 368, 337,196, 0, 66],
		}],
	};
	option && myChart.setOption(option);
}