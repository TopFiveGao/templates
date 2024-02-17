$(document).ready(function(){
	init();
	$("#button_submit").click(save);
});
function mclose(){
	var index = window.parent.parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
	parent.parent.layer.close(index); //再执行关闭 
}
function save(optid,data){
	var param={
		"userid":getUrlParam("systemid"),
		"creator":getLocalUser().userid,
		"lastupdatedby":getLocalUser().userid,
		"roleids":data
		}
	saveData(api_base+"/Common/Writer.i",optid, param, function(data){
		 //location.reload();
		 init();
	});
}
function init(){
	getDatas(api_base+"/Common/Reader.i", "user_to_rolebyquery",{"userid":getUrlParam("systemid")}, function(data){
			var allrole = data.result;
			var innerHtml ="";
			if(allrole){
				$.each(allrole,function(index,obj){
						innerHtml+="<option value=\""+obj.SYSTEMID+"\">"+obj.NAME+"</option>"
					});
				$('#multiselect_to').html(innerHtml);
			}
	});
	getDatas(api_base+"/Common/Reader.i", "query_role_by_user", {"userid":getUrlParam("systemid")}, function(data){
			var allrole = data.result;
			var innerHtml ="";
			if(allrole){
					$.each(allrole,function(index,obj){
						innerHtml+="<option value=\""+obj.SYSTEMID+"\">"+obj.NAME+"</option>"
					});
				$('#multiselect').html(innerHtml);
			}
	});
	$('#multiselect').multiselect({
		afterMoveToRight:function($left, $right, options){
			var selected = [];
			if(options.value){
				selected[0] = options.value;
			}else{
				$.each(options,function(index,option){
					selected.push(option.value);
				});
			}
			var optid = "sys_usertorole_add";
			save(optid,selected);
		},
		afterMoveToLeft:function($left, $right, options){
			var selected = [];
			if(options.value){
				selected[0] = options.value;
			}else{
				$.each(options,function(index,option){
					selected.push(option.value);
				});
			}
			var optid = "sys_usertorole_delete";
			if(selected.length ==0) return;
			save(optid,selected);
		}
	});
}