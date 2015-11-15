//cookie library

var docCookies = {
getItem: function (sKey) {
    if (!sKey) { return null; }
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
},
setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
    var sExpires = "";
    if (vEnd) {
        switch (vEnd.constructor) {
            case Number:
                sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
                break;
            case String:
                sExpires = "; expires=" + vEnd;
                break;
            case Date:
                sExpires = "; expires=" + vEnd.toUTCString();
                break;
        }
    }
    document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
    return true;
},
removeItem: function (sKey, sPath, sDomain) {
    if (!this.hasItem(sKey)) { return false; }
    document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
    return true;
},
hasItem: function (sKey) {
    if (!sKey) { return false; }
    return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
},
keys: function () {
    var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
    for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
    return aKeys;
}
};

//Creates map
var map;
var curMarker;
var marker;
var panoramaOptions;
var panorama;
var stepsTaken = 0;
var date = new Date();
var startTime = 0;
var time = 0;
var seattle;
var sf;
var vegas;
var esb;
var wm;

function startStreeView() {
    panoramaOptions = {position : curMarker.position};
     panorama = new google.maps.StreetViewPanorama(document.getElementById("map-canvas"), panoramaOptions);
    google.maps.event.addListener(panorama, 'position_changed', function() {stepsTaken++; document.getElementById("distance").innerHTML = stepsTaken;
                                  
    var newDate = new Date();
    time = (newDate.getTime() - startTime)*.001;
    document.getElementById("timer").innerHTML = time;
});
    startTime = date.getTime();
}
function doEnd() {
    if(stepsTaken > getLowScore()) {
        var name = prompt("You got a high score! What is your name?");
        docCookies.setItem(findSlot(stepsTaken), stepsTaken +":" + name);
    }
    alert("You biked " + stepsTaken + " steps in " + time +" seconds!");
}
function findSlot(steps) {
    //first check if any high scores haven't been set yet
    if(docCookies.getItem(("ucsdhighscore5") == null) return "ucsdhighscore5";
    else if(docCookies.getItem("ucsdhighscore4") == null) return "ucsdhighscore4";
    else if(docCookies.getItem("ucsdhighscore3") == null) return "ucsdhighscore3";
    else if(docCookies.getItem("ucsdhighscore2") == null) return "ucsdhighscore2";
    else if(docCookies.getItem("ucsdhighscore1") == null) return "ucsdhighscore1";
    
    //Check to see if score is higher than those already logged
    if(steps > "ucsdhighscore5") return "ucsdhighscore5";
    else if(steps > "ucsdhighscore4") return "ucsdhighscore4";
    else if(steps > "ucsdhighscore3") return "ucsdhighscore3";
    else if(steps > "ucsdhighscore2") return "ucsdhighscore2";
    else if(steps > "ucsdhighscore1") return "ucsdhighscore1";
}
function getLowScore() {
    if(docCookies.getItem("ucsdhighscore5") != null) return parseInt(docCookies.getItem("ucsdhighscore5"));
    else if(docCookies.getItem("ucsdhighscore4") != null) return parseInt(docCookies.getItem("ucsdhighscore4"));
    else if(docCookies.getItem("ucsdhighscore3") != null) return parseInt(docCookies.getItem("ucsdhighscore3"));
    else if(docCookies.getItem("ucsdhighscore2") != null) return parseInt(docCookies.getItem("ucsdhighscore2"));
    else if(docCookies.getItem("ucsdhighscore1") != null) return parseInt(docCookies.getItem("ucsdhighscore1"));
    return 0;
}
function setMarker(markerToSet) {
    curMarker = markerToSet;
}
//Places map on the page and populates high scores
function initialize() {
  var scores = "";
    if(docCookies.getItem("ucsdhighscore1") != null) {
        var score = docCookies.getItem("ucsdhighscore1").split(":");
        var num = score[0];
        var nam = score[1];
        scores += (nam + " with " + num + " pedals <br> ");
    }
    if(docCookies.getItem("ucsdhighscore2") != null) {
        var score = docCookies.getItem("ucsdhighscore2").split(":");
        var num = score[0];
        var nam = score[1];
        scores += (nam + " with " + num + " pedals <br> ");
    }
    if(docCookies.getItem("ucsdhighscore3") != null) {
        var score = docCookies.getItem("ucsdhighscore3").split(":");
        var num = score[0];
        var nam = score[1];
        scores += (nam + " with " + num + " pedals <br> ");
    }
    if(docCookies.getItem("ucsdhighscore4") != null) {
        var score = docCookies.getItem("ucsdhighscore4").split(":");
        var num = score[0];
        var nam = score[1];
        scores += (nam + " with " + num + " pedals <br> ");
    }
    if(docCookies.getItem("ucsdhighscore5") != null) {
        var score = docCookies.getItem("ucsdhighscore5").split(":");
        var num = score[0];
        var nam = score[1];
        scores += (nam + " with " + num + " pedals <br> ");
    }
    document.getElementById("scores").innerHTML = scores;

  var mapProp = {
    center:new google.maps.LatLng(40,-100),
    zoom:4//,
    //mapTypeId:google.maps.MapTypeId.ROADMAP
  };
  //Creates new google map and places on the webpage
  map = new google.maps.Map(document.getElementById("map-canvas"),mapProp);
    
  marker = new google.maps.Marker({
                                        position: new google.maps.LatLng(32.876986, -117.238348),
                                        map: map,
                                        title: 'UCSD'
                                        });
    google.maps.event.addListener(marker, 'click', function(){curMarker=marker;});
    
    seattle = new google.maps.Marker({
                                    position: new google.maps.LatLng(47.619871, -122.348684),
                                    map: map,
                                    title: 'The Space Needle'
                                    });
    google.maps.event.addListener(seattle, 'click', function(){curMarker=seattle;});
    
    sf = new google.maps.Marker({
                                     position: new google.maps.LatLng(37.809428, -122.477201),
                                     map: map,
                                     title: 'The Golden Gate Bridge'
                                     });
    google.maps.event.addListener(sf, 'click', function(){curMarker=sf;});
    
    vegas = new google.maps.Marker({
                                position: new google.maps.LatLng(36.114797, -115.172711),
                                map: map,
                                title: 'Las Vegas'
                                });
    google.maps.event.addListener(vegas, 'click', function(){curMarker=vegas;});
    
    esb = new google.maps.Marker({
                                 position: new google.maps.LatLng(40.748458, -73.984489),
                                   map: map,
                                   title: 'The Empire State Building'
                                   });
    google.maps.event.addListener(esb, 'click', function(){curMarker=esb;});
    
    wm = new google.maps.Marker({
                                position: new google.maps.LatLng(38.888903, -77.032995
),
                                 map: map,
                                 title: 'The Washington Monument'
                                 });
    google.maps.event.addListener(wm, 'click', function(){curMarker=wm;});

    }

//Event Listener to load the map
google.maps.event.addDomListener(window, 'load', initialize);
//Resize the Map with browser window size
google.maps.event.addDomListener(window, "resize", function resizeMap() {
  var center = map.getCenter();
  google.maps.event.trigger(map, "resize");
  map.setCenter(center); 
});