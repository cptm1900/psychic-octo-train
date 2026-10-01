	$(function(){
		$("#container>.sub_title, #container>.body_copy").fadeOut(0);
		$("#container>#home_contents").fadeOut(0);
		$("#container>.bg_box").css("opacity","0.5");

		$("#contents").animate({top:'100%'},1500);
		$("#contents").fadeOut(0);
		$("#container>.bg_box").delay(1500).fadeIn(1000);
		$("#container>.sub_title").delay(2500).fadeIn(1000);
		$("#container>.body_copy").delay(2800).fadeIn(1000);
		$("#container>#home_contents").delay(3500).fadeIn(1000);
	});