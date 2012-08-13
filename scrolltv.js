// loading on firefox // check loading in general
var status = 0;
$bottom = 100;
$position = 0;
function scrollTV() {
    if ( ($(document).scrollTop() + $(window).height() - 500 ) >= $position ) {
        $position = $position + 50;
    	$('html, body').animate({scrollTop:$bottom}, 2500, 'linear', function() { 
    	   $bottom = $bottom + 100;
    	   scrollTV();
        });
    } else {
        $('html, body').stop(true);
        $('#style-scroll, #soundtrack, #atransp').remove();
        $(document).fullScreen(false);
        $('#soundtrack')[0].pause();
        status = 0;
    }
};
function start() {
    if (status == 0) {
        status = 1;
        function start2() {
            setTimeout(function() {
                $('#soundtrack')[0].play();
                $('#loading-scroll, #blackscreen').remove();
                $('html, body').animate({scrollTop:1}, 0);
                scrollTV();
            }, 1000);        
        }
        $('#title-scroll').remove();
        if (!($.browser.mozilla)) {
            $('<div id="loading-scroll" class="text-small-scroll" >Loading</div>').appendTo('#blackscreen');
        } else {
            $('<div id="loading-scroll" class="text-small-scroll" ><img src="http://www.silviolorusso.com/scrolltv/loading.png" /></div>').appendTo('#blackscreen');
        }
        if (!($.browser.mozilla)) { $(document).fullScreen(true); };
        $('#soundtrack')[0].addEventListener('oncanplay', start2(), false); 
    } else {
        status = 0;
        $('#soundtrack')[0].pause();
        $('#soundtrack, #style-scroll, #atransp').remove();
        $('html, body').stop(true);
        $(document).fullScreen(false);   
    }
}
function main() {
    if (!$('#style-scroll').length) {
        $('<script src="http://www.silviolorusso.com/scrolltv/jquery.fullscreen-min.js"> </script>').appendTo('head');
        style = "<style id=\"style-scroll\"> @font-face { font-family: 'AmericanPurpose'; src: url('http://www.silviolorusso.com/scrolltv/font/american_purpose_casual_02-webfont.eot'); src: url('http://www.silviolorusso.com/scrolltv/font/american_purpose_casual_02-webfont.eot?#iefix') format('embedded-opentype'), url('http://www.silviolorusso.com/scrolltv/font/american_purpose_casual_02-webfont.woff') format('woff'), url('http://www.silviolorusso.com/scrolltv/font/american_purpose_casual_02-webfont.ttf') format('truetype'), url('http://www.silviolorusso.com/scrolltv/font/american_purpose_casual_02-webfont.svg#AmericanPurposeCasual02Rg') format('svg'); font-weight: normal; font-style: normal; } body { overflow:hidden !important; } div#transpscreen, div#blackscreen  { position:fixed; top: 0; bottom:0; left:0; right:0; z-index:9999;} div#blackscreen {background-color: black; z-index:9990} div#title-scroll, div#loading-scroll { width:100%; text-align:center; margin-top:200px; color: white; } div#loading-scroll { margin-top: 300px; } .title-scroll { font-family: 'AmericanPurpose'; font-size: 80px; line-height:50px; color: white; font-weight: bold; text-decoration: none; } .text-small-scroll { font-family: 'AmericanPurpose'; font-weight:normal; font-size: 19px; line-height: 20px; margin-top:10px; }</style>";
        $(style).appendTo('head');
        $('<a href="#" onclick="start()" id="atransp"><div id="transpscreen"></div></a>').appendTo('body');
        if (!($.browser.mozilla)) { 
            $('<div id="blackscreen"><div id="title-scroll" class="title-scroll">ScrollTV<br/><span class="text-small-scroll">Click to play</span></div></div>').appendTo('body');
        } else {
            $('<div id="blackscreen"><div id="title-scroll" class="title-scroll"><img src="http://www.silviolorusso.com/scrolltv/title-firefox.png" /></div></div>').appendTo('body');
        }
        $('<audio id="soundtrack" loop preload="auto" autobuffer><source src="http://www.silviolorusso.com/scrolltv/soundtrack.mp3" /><source src="http://www.silviolorusso.com/scrolltv/soundtrack.ogg" /></audio>').appendTo('body');
    }
};