var askBrowserAlert = '请在手机上使用浏览器打开本页面，即可安装',
	forIosAlert = '您的手机是Android系统，无法安装iOS应用',
	forAndroidAlert = '您的手机是iOS系统，无法安装Android应用',
	reminderWechatContent = '请点击微信右上角按钮，然后在弹出的菜单中，点击在浏览器中打开，即可安装',
	reminderQQContent = '请点击QQ右上角按钮，然后在弹出的菜单中，点击在浏览器中打开，即可安装',
	reminderWeiboContent = '请点击微博右上角按钮，然后在弹出的菜单中，点击在浏览器中打开，即可安装';

function isMobile() {
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function isWeiXin() {
	var ua = navigator.userAgent.toLowerCase();
	return ua.match(/MicroMessenger/i) == "micromessenger";
}

function isQQ() {
	var ua = navigator.userAgent.toLowerCase();
	return ua.match(/\sQQ/i) == " qq";
}

function installApp(type) {
	if (type == 'ios') {
		if (!isMobile()) {
			alert(askBrowserAlert);
			return;
		}
	}
	var u = navigator.userAgent,
		app = navigator.appVersion;
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	if (type == 'ios' && isAndroid) {
		alert(forIosAlert);
		return;
	} else if (type == 'android' && isiOS) {
		alert(forAndroidAlert);
		return;
	}
	if (isWeiXin()) {
		alert(reminderWechatContent);
		return;
	}
	if (isQQ()) {
		alert(reminderQQContent);
		return;
	}
	if (type == 'ios') {
		window.location.href = "itms-services://?action=download-manifest&url=https://raw.githubusercontent.com/ccman4321/ios/master/manifest.plist";
		$("#ios-download, #showtext").hide();
		$("#ios-loading").show();
		setTimeout(function(){
			$("#ios-loading").hide();
			$("#showtext").show();
		}, 8000);
	} else if (type == 'android') {
		window.location.href = "chzg.apk";
	}
}
$(function() {
	var u = navigator.userAgent,
		app = navigator.appVersion;
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	if (isiOS) {
		$("#ios-version").removeClass("col-md-6").addClass("col-md-12");
		$("#android-version").remove();
	} else if (isAndroid) {
		$("#ios-version, .ios-9-faq").remove();
		$("#android-version").removeClass("col-md-6").addClass("col-md-12");
	}
	if (isWeiXin() || isQQ()) {
		$(".weixin-tips").show();
		
	}
});