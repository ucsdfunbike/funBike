//Creates map
var map; 
//Places map on the page
function initialize() {
  var mapProp = {
    center: new google.maps.LatLng(40,0),
    zoom:2,
    streetViewControl: true,
    mapTypeId:google.maps.MapTypeId.ROADMAP,
    /*mapTypeControlOptions : {
      mapTypeIds: [
        google.maps.MapTypeId.SATELLITE
      ]
    }*/
  };
  //Creates new google map and places on the webpage
  map = new google.maps.Map(document.getElementById("map-canvas"),mapProp);
  //Famous Landmarks
  /*
  var goldenGatePark = new google.maps.LatLng(37.768837,-122.483412);
  var chicago = new google.maps.LatLng(41.850033, -87.6500523);
  var marker = new google.maps.Marker({
      position: chicago,
      map: map
  });*/
}
//Event Listener to load the map
google.maps.event.addDomListener(window, 'load', initialize);
//Resize the Map with browser window size
google.maps.event.addDomListener(window, "resize", function resizeMap() {
  var center = map.getCenter();
  google.maps.event.trigger(map, "resize");
  map.setCenter(center); 
}); 