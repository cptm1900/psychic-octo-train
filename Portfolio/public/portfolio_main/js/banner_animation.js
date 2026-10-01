		$(function(){
			$('#header>#banner').css('opacity', '0.7');
			$('#header>#nav').animate({top:'-60px'},0);

			$('#header>#header_img').mouseover(function(){
				$('#header>#nav').stop('#header').animate({top:'0px'},500,'easeOutBounce');
				$('#header>#banner').stop('#header').animate({top:'60px'},500,'easeOutBounce');
				$('#header>#header_img').stop('#header').animate({top:'-60px'},500,'easeOutBounce');
			});
			$('#header').mouseleave(function(){
				$('#header>#nav').stop('#header').animate({top:'-60px'},500,'easeOutBounce');
				$('#header>#banner').stop('#header').animate({top:'0px'},500,'easeOutBounce');
				$('#header>#header_img').stop('#header').animate({top:'0px'},500,'easeOutBounce');
			});
		});