	$(function(){
		// 흰 막(#contents)이 올라와 화면을 덮은 뒤 페이지 이동
		function movePage(url){
			$("#contents").fadeIn(0);
			$("#contents").animate({top:'0%'},1500);
			location.href = url;
		}

		$("#nav>ul>li>.nav_home").click(function(){ movePage("./index.html"); });
		$("#nav>ul>li>.nav_work").click(function(){ movePage("./work.html"); });
		$("#nav>ul>li>.nav_about").click(function(){ movePage("./about.html"); });
		$("#home_work").click(function(){ movePage("./work.html"); });
		$("#home_about").click(function(){ movePage("./about.html"); });
	});
