
		$(function(){
			$(window).scroll(function(){
				if( $(this).scrollTop() >= 60 ){
					$("#about_container>.about_title").fadeOut(500);
				}
				else{
					$("#about_container>.about_title").fadeIn(500);
				}
			});
		});