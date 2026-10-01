
		$(function(){
			$("html").css("overflow","hidden");
			$("#work_container>.work_title").fadeOut(0);
			$("#work_container>.bg_box").css("opacity","0.5");

			$("#contents").animate({top:'100%'},800);
			$("#contents").animate({top:'70%'},800);
			$("#work_container>.bg_box").delay(1600).fadeIn(1000);
			$("#work_container>.work_title").delay(2600).fadeIn(1000);
			$("html").delay(3600).css("overflow-y","scroll");
		});