		$(function(){
			$("#about_profile").fadeOut(0);
			$("#about_info").fadeOut(0);
			$("#about_container>.about_title").fadeOut(0);
			$("#about_container>.bg_box").css("opacity","0.7");

			$("#contents").animate({top:'100%'},1500);
			$("#contents").fadeOut(0);
			$("#about_container>.bg_box").delay(1500).fadeIn(1000);
			$("#about_container>.about_title").delay(2500).fadeIn(1000);
			$("#about_profile").delay(3300).fadeIn(1000);
			$("#about_info").delay(4300).fadeIn(1000);
		});
