let implrt = {
	xcbfx() {
		let myChart = echarts.init(document.getElementById('xcbfx'));
		let option = {
			title: {
				text: '新参保分析'
			},
			tooltip: {},
			legend: {
				data: ['人数']
			},
			grid:{
				 bottom: "6%"
			},
			xAxis: {
				data: ["2012年", "2013年", "2014年", "2015年", "2016年", "2017年", "2018年", "2019年", "2020年"]
			},
			yAxis: {},
			series: [{
				name: '人数',
				type: 'bar',
				data: [344, 243, 323, 510, 200, 360, 650, 230, 243]
			}]
		};
		myChart.setOption(option);
	},
	xcbqkbgqs() {
		let myChart = echarts.init(document.getElementById('xcbqkbgqs'));
		option = {
			title: {
				text: '14天参保情况变更趋势'
				// subtext: '纯属虚构'
			},
			tooltip: {
				trigger: 'axis'
			},
			grid:{
				 bottom: "6%"
			},
			legend: {
				data: ['最高参保人数', '最低参保人数']
			},
			toolbox: {
				show: true,
				feature: {
					dataZoom: {
						yAxisIndex: 'none'
					},
					dataView: {
						readOnly: false
					},
					magicType: {
						type: ['line', 'bar']
					},
					restore: {},
					saveAsImage: {}
				}
			},
			xAxis: {
				grid:{
					 bottom: "6%"
				},
				type: 'category',
				boundaryGap: false,
				data: ['1', '2', '3', '4', '5', '6', '7','8','9','10','11','12','13','14'
				]
			},
			yAxis: {
				grid:{
					 bottom: "6%"
				},
				type: 'value',
				axisLabel: {
					formatter: '{value}'
				}
			},
			series: [{
				grid:{
					 bottom: "6%"
				},
					name: '最高人数',
					type: 'line',
					data: [2,3,4,5,3,7,3,7,5,2,3,2,4,3],
					markPoint: {
						data: [{
								type: 'max',
								name: '最大值'
							},
							{
								type: 'min',
								name: '最小值'
							}
						]
					},
					
					markLine: {
						data: [{
							type: 'average',
							name: '平均值'
						}]
					}
				},
				{
					name: '最低人数',
					type: 'line',
					data: [12,14,13,16,14,13,11,14,12,13,12,11,13,12,14],
					markPoint: {
						data: [{
							name: '周最低',
							value: 23,
							xAxis: 5,
							yAxis: 13
						}]
					},
					markLine: {
						data: [{
								type: 'average',
								name: '平均值'
							},
							[{
								symbol: 'none',
								x: '90%',
								yAxis: 'max'
							}, {
								symbol: 'circle',
								label: {
									position: 'start',
									formatter: '最大值'
								},
								type: 'max',
								name: '最高点'
							}]
						]
					}
				}
			]
		};
		myChart.setOption(option);
	},
	jfqs(){
		let chart = new Chart("#jfqs", {
			data: {
				labels: ["12am-3am", "3am-6am", "6am-9am", "9am-12pm",
					"12pm-3pm", "3pm-6pm", "6pm-9pm", "9pm-12am"
				],
				datasets: [{
						label: "缴费人数",
						type: 'bar',
						values: [25, 40, 30, 35, 8, 52, 17, -4]
					}
				],
				grid:{
					 bottom: "6%"
				},
				yMarkers: [{
					label: "Marker",
					value: 70
				}],
				yRegions: [{
					label: "Region",
					start: 10,
					end: 50
				}]
			},
			title: "参保人员统计图",
			type: 'axis-mixed', // or 'bar', 'line', 'pie', 'percentage'
			height: 250,
			colors: ['purple', '#ffa3ef', 'red']
		});
	},
	asdfasd() {
		let myChart = echarts.init(document.getElementById('xcbfx'));
		option = {
		    title: {
		        text: '某站点用户访问来源',
		        subtext: '纯属虚构',
		        left: 'center'
		    },
			grid:{
				 bottom: "6%"
			},
		    tooltip: {
		        trigger: 'item',
		        formatter: '{a} <br/>{b} : {c} ({d}%)'
		    },
		    legend: {
		        orient: 'vertical',
		        left: 'left',
		        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
		    },
		    series: [
		        {
		            name: '访问来源',
		            type: 'pie',
		            radius: '55%',
		            center: ['50%', '60%'],
		            data: [
		                {value: 335, name: '直接访问'},
		                {value: 310, name: '邮件营销'},
		                {value: 234, name: '联盟广告'},
		                {value: 135, name: '视频广告'},
		                {value: 1548, name: '搜索引擎'}
		            ],
		            emphasis: {
		                itemStyle: {
		                    shadowBlur: 10,
		                    shadowOffsetX: 0,
		                    shadowColor: 'rgba(0, 0, 0, 0.5)'
		                }
		            }
		        }
		    ]
		};
		myChart.setOption(option);
	},
	mains(){
		let myChart = echarts.init(document.getElementById('mains'));
		option = {
			grid:{
				 bottom: "6%"
			},
		    title: {
		        // text: '近七日参保人数及缴费状况',
		        // subtext: '纯属虚构',
		        left: 'center'
		    },
		    tooltip: {
		        trigger: 'item',
		        formatter: '{a} <br/>{b} : {c} ({d}%)'
		    },
		    legend: {
		        orient: 'vertical',
		        left: 'left',
		        data: ['居保缴费', '机保缴费', '医保缴费', '参保人数', '退休人数']
		    },
		    series: [
		        {
		            name: '人数',
		            type: 'pie',
		            radius: '55%',
		            center: ['50%', '60%'],
		            data: [
		                {value: 335, name: '居保缴费'},
		                {value: 310, name: '机保缴费'},
		                {value: 234, name: '医保缴费'},
		                {value: 135, name: '参保人数'},
		                {value: 248, name: '退休人数'}
		            ],
		            emphasis: {
		                itemStyle: {
		                    shadowBlur: 10,
		                    shadowOffsetX: 0,
		                    shadowColor: 'rgba(0, 0, 0, 0.5)'
		                }
		            }
		        }
		    ]
		};
		myChart.setOption(option);
	},
	mainse(){
		let myChart = echarts.init(document.getElementById('mainse'));
		option = {
			grid:{
				 bottom: "6%"
			},
		    title: {
		        // text: '近七日参保人数及缴费状况',
		        // subtext: '纯属虚构',
		        left: 'center'
		    },
		    tooltip: {
		        trigger: 'item',
		        formatter: '{a} <br/>{b} : {c} ({d}%)'
		    },
		    legend: {
		        orient: 'vertical',
		        left: 'left',
		        data: ['居保缴费', '机保缴费', '医保缴费', '参保人数', '退休人数']
		    },
		    series: [
		        {
		            name: '人数',
		            type: 'pie',
		            radius: '55%',
		            center: ['50%', '60%'],
		            data: [
		                {value: 435, name: '居保缴费'},
		                {value: 310, name: '机保缴费'},
		                {value: 234, name: '医保缴费'},
		                {value: 435, name: '参保人数'},
		                {value: 548, name: '退休人数'}
		            ],
		            emphasis: {
		                itemStyle: {
		                    shadowBlur: 10,
		                    shadowOffsetX: 0,
		                    shadowColor: 'rgba(0, 0, 0, 0.5)'
		                }
		            }
		        }
		    ]
		};
		myChart.setOption(option);
	},
	mainses(){
		let myChart = echarts.init(document.getElementById('mainses'));
		option = {
			grid:{
				 bottom: "6%"
			},
		    title: {
		        // text: '近七日参保人数及缴费状况',
		        // subtext: '纯属虚构',
		        left: 'center'
		    },
		    tooltip: {
		        trigger: 'item',
		        formatter: '{a} <br/>{b} : {c} ({d}%)'
		    },
		    legend: {
		        orient: 'vertical',
		        left: 'left',
		        data: ['居保缴费', '机保缴费', '医保缴费', '参保人数', '退休人数']
		    },
		    series: [
		        {
		            name: '人数',
		            type: 'pie',
		            radius: '55%',
		            center: ['50%', '60%'],
		            data: [
		                {value: 235, name: '居保缴费'},
		                {value: 310, name: '机保缴费'},
		                {value: 234, name: '医保缴费'},
		                {value: 635, name: '参保人数'},
		                {value: 448, name: '退休人数'}
		            ],
		            emphasis: {
		                itemStyle: {
		                    shadowBlur: 10,
		                    shadowOffsetX: 0,
		                    shadowColor: 'rgba(0, 0, 0, 0.5)'
		                }
		            }
		        }
		    ]
		};
		myChart.setOption(option);
	},
	cbqkbgqs(){
		let chart = new Chart("#cbqkbgqs", { // or DOM element
			data: {
				labels: ["12am-3am", "3am-6am", "6am-9am", "9am-12pm",
					"12pm-3pm", "3pm-6pm", "6pm-9pm", "9pm-12am"
				],
				grid:{
					 bottom: "6%"
				},
		
				datasets: [{
						label: "Some Data",
						type: 'bar',
						values: [25, 40, 30, 35, 8, 52, 17, -4]
					}
				],
		
				yMarkers: [{
					label: "Marker",
					value: 70
				}],
				yRegions: [{
					label: "Region",
					start: -10,
					end: 50
				}]
			},
			title: "参保人员统计图",
			type: 'axis-mixed', // or 'bar', 'line', 'pie', 'percentage'
			height: 250,
			colors: ['purple', '#ffa3ef', 'red']
		});
	}
}
// 当出现一个ID时执行对应方法
function gtePing() {
	if($("#xcbfx").length>0){
		implrt.xcbfx();
	}
	if($("#xcbqkbgqs").length>0){
		implrt.xcbqkbgqs();
	}
	if($("#jfqs").length>0){
		implrt.jfqs();
	}
	if($("#mains").length>0){
		implrt.mains();
	}
	if($("#mainse").length>0){
		implrt.mainse();
	}
	if($("#mainses").length>0){
		implrt.mainses();
	}
	if($("#cbqkbgqs").length>0){
		implrt.cbqkbgqs();
	}   
}