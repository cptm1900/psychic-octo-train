		$(function(){
			var page = 1;		// 현재 페이지
			var last = 13;		// 전체 페이지 수

			// 페이지 번호에 맞는 이미지로 바꾸기 (1 → slide01.jpg)
			function showSlide(){
				var num = page < 10 ? "0" + page : page;

				$(".slide_img>img").stop().fadeOut(150, function(){
					$(this).attr("src", "./slides/slide" + num + ".jpg").fadeIn(150);
				});
				$(".slide_page").text(page + " / " + last);
			}

			function prevSlide(){
				if( page > 1 ){
					page--;
					showSlide();
				}
			}

			function nextSlide(){
				if( page < last ){
					page++;
					showSlide();
				}
			}

			$(".slide_prev").click(function(e){
				e.preventDefault();
				prevSlide();
			});
			$(".slide_next").click(function(e){
				e.preventDefault();
				nextSlide();
			});
			$(".slide_img").click(function(){
				nextSlide();
			});

			// 전체화면 켜기 / 끄기
			function toggleFull(){
				if( document.fullscreenElement ){
					document.exitFullscreen();
				}
				else{
					document.documentElement.requestFullscreen();
				}
			}

			$(".slide_full").click(function(e){
				e.preventDefault();
				toggleFull();
			});

			// 키보드 (37 : ←, 39 : →, 70 : F)
			$(document).keydown(function(e){
				if( e.keyCode == 37 ){
					prevSlide();
				}
				else if( e.keyCode == 39 ){
					nextSlide();
				}
				else if( e.keyCode == 70 ){
					toggleFull();
				}
			});
		});
