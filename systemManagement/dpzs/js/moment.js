function moment(){
	let dateTime;
	let yy = new Date().getFullYear();
	let mm = new Date().getMonth() + 1;
	let dd = new Date().getDate();
	let hh = new Date().getHours();
	let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes():
	new Date().getMinutes();
	let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds():
	new Date().getSeconds();
	dateTime = yy + '年' + mm + '月' + dd + '日';
	return dateTime;
}
function momentdate(){
	let dateTime;
	let yy = new Date().getFullYear();
	let mm = new Date().getMonth() + 1;
	let dd = new Date().getDate();
	let hh = new Date().getHours();
	let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes():
	new Date().getMinutes();
	let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds():
	new Date().getSeconds();
	dateTime = hh + ':' + mf + ':' + ss;
	return dateTime;
}