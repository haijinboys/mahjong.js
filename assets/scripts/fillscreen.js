var scaleX = 1;
var scaleY = 1;
var transX = 0;
var transY = 0;

function fillDiv(div, proportional) {
    var width = div.outerWidth();
    var height = div.outerHeight(); 

    var availHeight = $(window).height();
    var availWidth = $(window).width();

    scaleX = availWidth / width;
    scaleY = availHeight / height;
    
    if (proportional) {
        scaleX = Math.min(scaleX, scaleY);
        scaleY = scaleX;
    }
    
    transX = Math.round((availWidth - (width * scaleX)) / 2);
    transY = Math.round((availHeight - (height * scaleY)) / 2);

    div.css({
        "position": "fixed",
        "left": "0px",
        "top": "0px;",
        "webkit-transform": " translate(" + transX + "px, " + transY + "px) scale3d(" + scaleX + " , " + scaleY + ",1)",
        "webkit-transform-origin": "0 0",
    });
}

function initialize() {
    var div = $("#fill");
    fillDiv(div, true);    
    
    if ("onorientationchange" in window) {
        var orientationEvent = "resize";
        if ("onorientationchange" in window) {
            orientationEvent = "orientationchange";        
        } else if ("ondeviceorientation" in window) {
            orientationEvent = "deviceorientation";
        }
        console.log("Using " + orientationEvent);
        
        // There seems to be a bug in some Android variants such that the
        // metrics like innerHeight and outerHeight (used in fillDiv above)
        // are not update when the orientationEvent is triggered. The
        // half-second delay gives the browser a chance to update the
        // metrics before rescaling the div.
        $(window).bind(orientationEvent, function() { setTimeout(function() { fillDiv(div,true); }, 500) });
    } else {
        console.log("No orientation supported");        
        $(window).bind("resize", function() { fillDiv(div,true); });
    }
}

$(window).on("load", initialize);
