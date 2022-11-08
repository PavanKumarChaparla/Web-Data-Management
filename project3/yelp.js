function initialize () {
	xhr = new XMLHttpRequest();
	locations = [];
}

function sendRequest () {
	var searchValue = encodeURI(document.getElementById("search").value);
	var bounds = map.getBounds()
	diagonalDistance = google.maps.geometry.spherical.computeDistanceBetween(bounds.getNorthEast(), bounds.getCenter())
	xhr.open("GET", "proxy.php?term=" + searchValue + "&limit=" + '10' + "&radius=" + parseInt(diagonalDistance) + "&latitude=" + bounds.getCenter().lat() + "&longitude=" + bounds.getCenter().lng());
	xhr.setRequestHeader("Accept","application/json");
	output='&nbsp;'
	xhr.onreadystatechange = function () {
		if (this.readyState == 4) {
			var restaurantsResponse = JSON.parse(this.responseText);
			if(restaurantsResponse["businesses"].length==0) 
				document.getElementById("output").innerHTML = "Try entering another value";
			else{
				for (var i = 0; i < locations.length; i++) {
					locations[i].setMap(null);
				  }
				  locations = [];
				for(var i=0;i<restaurantsResponse["businesses"].length;i++){
					pos = new google.maps.LatLng({lat: restaurantsResponse["businesses"][i]["coordinates"]["latitude"], lng: restaurantsResponse["businesses"][i]["coordinates"]["longitude"]}); 
					locations.push(new google.maps.Marker({position: pos, map: map, label: String(i+1)}));
				}
				for(var i=0;i<restaurantsResponse["businesses"].length;i++){
				output = output + 
					'"<div class="col-sm-2 col-sm-2 col-sm-2 col-sm-2">' +
					'<p>'+(i+1)+'</p>'+
					'<img class="album-photo-item" src="' +
					restaurantsResponse["businesses"][i]["image_url"]  +
					'" width="150" height="200">' + 
					"<p><a href=\"" + restaurantsResponse["businesses"][i]["url"] + "\">" + restaurantsResponse["businesses"][i]["name"] + "</a></p>" +
					'<p>'+"Rating :  "+restaurantsResponse["businesses"][i]["rating"] + '</p>'+
					'</div>'
				}
				document.getElementById("output").innerHTML = output;
				output = '';
			}
		}
	};
	xhr.send(null);
}

function initMap(){
	center = {lat: 32.75, lng: -97.13} 
	map = new google.maps.Map(document.getElementById('googlemap'), {
	  center: center, 
	  zoom: 16
	});
}
