	$(function(){
		$(".home_work_hover").css("opacity","0.5");
		$(".home_about_hover").css("opacity","0.5");

		$("#home_work").mouseover(function(){
			$(".home_work_hover, .home_work_text").stop().fadeIn(500);
		});
		$("#home_work").mouseleave(function(){
			$(".home_work_hover, .home_work_text").stop().fadeOut(500);
		});
		$("#home_about").mouseover(function(){
			$(".home_about_hover, .home_about_text").stop().fadeIn(500);
		});
		$("#home_about").mouseleave(function(){
			$(".home_about_hover, .home_about_text").stop().fadeOut(500);
		});
	});
