//Creates map
var map; 
//Places map on the page
function initialize() {
  var mapProp = {
    center:new google.maps.LatLng(40,0),
    zoom:2,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };
  //Creates new google map and places on the webpage
  map = new google.maps.Map(document.getElementById("map-canvas"),mapProp);
}
//Event Listener to load the map
google.maps.event.addDomListener(window, 'load', initialize);
//Resize the Map with browser window size
google.maps.event.addDomListener(window, "resize", function resizeMap() {
  var center = map.getCenter();
  google.maps.event.trigger(map, "resize");
  map.setCenter(center); 
}); 