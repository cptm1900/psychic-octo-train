		$(
			//풀스크린에서 이미지를 윈도우에 꽉차게 만들고 웹브라우저의 크기를 조절해도 이미지의 크기는 변화 없다.
			function() {
				//body또는 html에 배경 이미지
				$("#container").backstretch(
					[
					    	"./img/photo-1429051781835-9f2c0a9df6e4.jpg"
		    			], { fade: 0, duration: 4000 }	// fadeIn, 지속시간
				);
			}
		);

	// backstretch 에서 배경이미지 fixed 를 쓸 수 있게 수정
		$(window).scroll(function() {
			var scrolledY = $(window).scrollTop();

			$('#container').css('top', scrolledY + 'px');
		});