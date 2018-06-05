			$(function(){
			$(window).scroll(function () {
				if ($(this).scrollTop() > 100) $(".lentop").fadeIn();
				else $(".lentop").fadeOut();
				});
			$(".lentop").click(function () {
				$("body,html").animate({scrollTop: 0}, "slow");
				});
			}); 
		
            function getAndSetVal()
            {
                var txt1 = document.getElementById('txt').value;
				document.getElementById("schoolname").innerHTML = txt1;
            }
            function getVal()
            {
             var txt = document.getElementById('txt').value;
             alert(txt);
            }  

			function hello(){
				alert("hello");
			}
			
			document.getElementById('cer').addEventListener("click", function(){
				$('html,body').animate({scrollTop:$("#certifications").position().top});
			});
			
			document.getElementById('act').addEventListener("click", function(){
				$('html,body').animate({scrollTop:$("#activities").position().top});
			});
			
			document.getElementById('pro').addEventListener("click", function(){
				$('html,body').animate({scrollTop:$("#program").position().top});
			});
			
			document.getElementById('int').addEventListener("click", function(){
				$('html,body').animate({scrollTop:$("#interests").position().top});
			});
			
			document.getElementById('lan').addEventListener("click", function(){
				$('html,body').animate({scrollTop:$("#language").position().top});
			});
			
			document.getElementById('proj').addEventListener("click", function(){
				$('html,body').animate({scrollTop:$("#project").position().top});
			});

			



   
    
