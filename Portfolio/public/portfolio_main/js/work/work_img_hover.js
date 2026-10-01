		$(function(){
			$(".work_img_box").css("opacity","0.5");
			$(".work_img_text").fadeOut(0);

			$(".work_img1").mouseover(function(){
				$(".work_img1_box, .work_img1_text").stop().fadeIn(500);
			});
			$(".work_img1").mouseleave(function(){
				$(".work_img1_box, .work_img1_text").stop().fadeOut(500);
			});
			$(".work_img2").mouseover(function(){
				$(".work_img2_box, .work_img2_text").stop().fadeIn(500);
			});
			$(".work_img2").mouseleave(function(){
				$(".work_img2_box, .work_img2_text").stop().fadeOut(500);
			});
		});
