		$(function(){
			$("#slides_container").fadeOut(0);

			$("#contents").animate({top:'100%'},1500);
			$("#contents").fadeOut(0);
			$("#slides_container").delay(1500).fadeIn(1000);
		});
