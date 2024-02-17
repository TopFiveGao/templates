$(function(){
	permissionContorller();
});
function permissionContorller(){
	var tags = $('*[permission]');
	$.each(tags,function(index,tag){
		var permission = $(tag).attr('permission');
		if(!hasPermission(permission)){
			$(tag).remove();
		}
	});
}
var permissions;
function hasPermission(permission){
	var isHas = false;
	if(permissions == undefined){
		var username = sessionStorage.getItem('username');
		permissions = sessionStorage.getItem('optid_'+username);
		permissions = permissions.split(",");
	}
	$.each(permissions,function(index,p){
		if(p == permission){
			isHas = true;
		}
	});
	return isHas;
}