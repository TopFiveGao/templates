$(document).ready(function() {
	fblzl();//发布量总量
	srspl();//7日审批量
	fwzl();//网站访问总量
	jrfwl();//网站今日访问总量
	ggfbzl();//广告发布总量
	ggfb();//广告分布(根据渠道)
	fbfb();//分布发布（广告，信息，失物）
	sbjc();//设备检测
	cxxxfb();//出行信息发布
	daiwobanlidyw();//待我审核
});

function fblzl(){
	var param = {};
	getDatas(api_path+"/Common/Reader.i", "fblzl_info", param, function(result) {
		if(result.result_state=='0'){
			$("#fblzl").html(result.result[0].FBLZL);
		}
	});
}
function daiwobanlidyw(){
	var param = {};
	getDatas(api_path+"/Common/Reader.i", "rs_dwsh_select", param, function(result) {
		if(result.result_state=='0'){
			$("#fblzl").html(result.result[0].FBLZL);
		}
	});
}

function srspl(){
	/*var nowdate = getNowFormatDate();//系统当前时间
	var time = new Date(new Date()-7*24*60*60*1000);//7天前时间
	var bseverdate = time.Format("yyyy-MM-dd hh:mm:ss"); 	*/
	var param = {
			/*"nowdate":nowdate,
			"bseverdate":bseverdate*/
	};
	getDatas(api_path+"/Common/Reader.i", "srspl_info", param, function(result) {
		if(result.result_state=='0'){
			var myChart = echarts.init(document.getElementById('srspl'));
			var num = result.result.length;
			var arr = new Array(6);
			var day = new Array(6);
			for(var i =0;i<num;i++){
				arr[i]=result.result[i].NUM;
				day[i]=result.result[i].NAME;
			}
			option = {
					tooltip: {
						trigger: 'axis'
			    		},
				    toolbox: {
				        show: true,
				        feature: {
				            dataZoom: {
				                yAxisIndex: 'none'
				            },
				            dataView: {readOnly: false},
				            magicType: {type: ['line', 'bar']},
				            restore: {},
				            saveAsImage: {}
				        }
				    },
				    xAxis:  {
				        type: 'category',
				        boundaryGap: false,
				        data: day
				    },
				    yAxis: {
				        type: 'value',
				        axisLabel: {
				            formatter: '{value}'
				        }
				    },
				    series: [
				        {
				            name:'审核数量',
				            type:'line',
				            data:arr,
				            markPoint: {
				                data: [
				                  /*  {type: 'max', name: '最大值'},
				                    {type: 'min', name: '最小值'}*/
				                ]
				            },
				           
				        },
				       
				    ]
				};
			myChart.setOption(option);
		}
	});
}

function fwzl(){
	var param = {};
	getData(api_path+"/Common/Reader.i", "fwzl_info", param, function(result) {
		if(result.result_state=='0'){
			$("#fwzl").html(result.result[0].FWZL);
		}
	});
}

function jrfwl(){
	//var myDate = new Date();
	//var time = myDate.toLocaleDateString();
	//var starttime =  time.Format("yyyy-MM-dd");
	var d = new Date();
	var str = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();	
	var param = {
			"str":str
	};
	getData(api_path+"/Common/Reader.i", "jrfwl_info", param, function(result) {
		if(result.result_state=='0'){
			if(result.result[0].JRFWL!=''||result.result[0].JRFWL!=null){
				$("#jrfwl").html(result.result[0].JRFWL);
			}
		}
	});
}

function ggfbzl(){
	var param = {};
	getData(api_path+"/Common/Reader.i", "ggfbzl_info", param, function(result) {
		if(result.result_state=='0'){
			if(result.result[0].GGFBZL!=''||result.result[0].GGFBZL!=null){
				$("#ggfbzl").html(result.result[0].GGFBZL);
			}
		}
	});
}

function ggfb(){//广告分布(根据渠道)
	var param = {};
	getDatas(api_path+"/Common/Reader.i", "ggfb_info", param, function(result) {
		if(result.result_state=='0'){
			var data1=[];
			if(result.result.length!='0'){
				var num =  result.result.length;			
				for(var i=0;i<num;i++){
					
					data1.push({
						value:result.result[i].NUM,name:''+result.result[i].GGWMC+''
					})  							
				}
		
			}
			
			 var myChart = echarts.init(document.getElementById('ggfb'));
		     // 指定图表的配置项和数据
			 option = {
					 tooltip : {
					        trigger: 'item',
					        formatter: "{a} <br/>{b} : {c} ({d}%)"
					    },
				    series : [
					        {
					            name: '广告渠道来源',
					            type: 'pie',
					            radius : '55%',
					            center: ['50%', '60%'],
					            data:data1,/*[
					                {value:335, name:'直接访问'},
					                {value:310, name:'邮件营销'},
					                {value:234, name:'联盟广告'},
					                {value:135, name:'视频广告'},
					                {value:1548, name:'搜索引擎'}
					            ],*/
					            itemStyle: {
					                emphasis: {
					                    shadowBlur: 10,
					                    shadowOffsetX: 0,
					                    shadowColor: 'rgba(0, 0, 0, 0.5)'
					                }
					            }
					        }
					    ]
					};
		     myChart.setOption(option);
		}
	});	
}

function fbfb(){
	var param = {};
	getDatas(api_path+"/Common/Reader.i", "fbfb_info", param, function(result) {
		if(result.result_state=='0'){
			var data1=[];
			if(result.result.length!='0'){
				var num =  result.result.length;			
				for(var i=0;i<num;i++){
					
					data1.push({
						value:result.result[i].NUM,name:''+result.result[i].NAME+''
					})  							
				}
		
			}
			
			 var myChart = echarts.init(document.getElementById('fbfb'));
		     // 指定图表的配置项和数据
			 option = {
					 tooltip : {
					        trigger: 'item',
					        formatter: "{a} <br/>{b} : {c} ({d}%)"
					    },
				    series : [
					        {
					            name: '分布发布',
					            type: 'pie',
					            radius : '55%',
					            center: ['50%', '60%'],
					            data:data1,
					            itemStyle: {
					                emphasis: {
					                    shadowBlur: 10,
					                    shadowOffsetX: 0,
					                    shadowColor: 'rgba(0, 0, 0, 0.5)'
					                }
					            }
					        }
					    ]
					};
		     myChart.setOption(option);
		}
	});
}

function sbjc(){
	var param = {};
	getDatas(api_path+"/Common/Reader.i", "sbjc_info", param, function(result) {
		if(result.result_state=='0'){
			if(result.result.length!='0'){
				red='red';
				blue='blue';
				$("#sbjc").html('<font color='+blue+'>正常：'+result.result[0].NUM+'<font color='+red+'>,故障：'+result.result[1].NUM);
			}
			
		}
	});
}

function cxxxfb(){
	var d = new Date();
	var str = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();	
	var start = str+' 00:00:00';
	var end = str+' 23:59:59';
	var param = {
			"start":start,
			"end":end
	};
	getDatas(api_path+"/Common/Reader.i", "cxxxfb_info", param, function(result) {
		if(result.result_state=='0'){
			if(result.result.length!='0'){
				var myChart = echarts.init(document.getElementById('cxxxfb'));
				option = {
						 tooltip : {
						        trigger: 'axis',
						        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
						            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
						        }
						    },
					    xAxis : [
					        {
					            type : 'category',
					            data : ['公交','铁路','长途']
					        }
					    ],
					    yAxis : [
					        {
					            type : 'value'
					        }
					    ],
					    series : [
					        {
					            name:'数量',
					            type:'bar',
					            data:[result.result[0].NUM,result.result[1].NUM,result.result[2].NUM],
					            markPoint : {
					                data : [
					                    {type : 'max', name: '最大值'},
					                    {type : 'min', name: '最小值'}
					                ]
					            },					        
					        },
					        
					       
					    ]
					};
				myChart.setOption(option);
			}
			
		}
	});
}

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
} 


