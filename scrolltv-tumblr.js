var status = 0;
$bottom = 100;
$position = 0;
function scrollTV() {
    if ( ( jQuery(document).scrollTop() +  jQuery(window).height() - 500 ) >= $position ) {
        $position = $position + 50;
         jQuery('html, body').animate({scrollTop:$bottom}, 2500, 'linear', function() { 
         $bottom = $bottom + 100;
    	   scrollTV();
        });
    } else {
    	$bottom = 100;
	    window.scrollTo(0, 0);
    }
};
function start() {
    if (status == 0) {
        status = 1;
        function start2() {
            setTimeout(function() {
                 jQuery('#soundtrack')[0].play();
                 jQuery('#loading-scroll, #blackscreen').remove();
                 jQuery('html, body').animate({scrollTop:1}, 0);
                scrollTV();
            }, 1000);        
        }
         jQuery('#title-scroll').remove();
         jQuery('<div id="loading-scroll" class="text-small-scroll" ><img src="http://www.silviolorusso.com/scrolltv/loading.png" /></div>').appendTo('#blackscreen');
    	try {
        	 jQuery(document).fullScreen(true); 
        } catch(err) {
		  console.log('no fullscreen');
	}
         jQuery('#soundtrack')[0].addEventListener('oncanplay', start2(), false); 
    } else {
        status = 0;
         jQuery('#soundtrack')[0].pause();
         jQuery('#soundtrack, #style-scroll, #atransp').remove();
         jQuery('html, body').stop(true);
         jQuery(document).fullScreen(false);   
    }
}
function main() {
    if (! jQuery('#style-scroll').length) {
         jQuery('<script src="http://www.silviolorusso.com/scrolltv/jquery.fullscreen-min.js"> </script>').appendTo('head');
        style = "<style id=\"style-scroll\"> body { overflow:hidden !important; } div#transpscreen, div#blackscreen  { position:fixed; top: 0; bottom:0; left:0; right:0; z-index:9999;} div#blackscreen {background-color: black; z-index:9990} div#title-scroll, div#loading-scroll { width:100%; text-align:center; margin-top:200px; color: white; } div#loading-scroll { margin-top: 300px; } .title-scroll { font-family: 'AmericanPurpose'; font-size: 80px; line-height:50px; color: white; font-weight: bold; text-decoration: none; } .text-small-scroll { font-family: 'AmericanPurpose'; font-weight:normal; font-size: 19px; line-height: 20px; margin-top:10px; }</style>";
         jQuery(style).appendTo('head');
         jQuery('<a href="#" onclick="start()" id="atransp"><div id="transpscreen"></div></a>').appendTo('body');
         jQuery('<div id="blackscreen"><div id="title-scroll" class="title-scroll"><img src="http://www.silviolorusso.com/scrolltv/title-firefox.png" /></div></div>').appendTo('body');
         jQuery('<audio id="soundtrack" loop preload="auto" autobuffer><source src="http://www.silviolorusso.com/scrolltv/soundtrack.mp3" /><source src="http://www.silviolorusso.com/scrolltv/soundtrack.ogg" /></audio>').appendTo('body');
    }
};
