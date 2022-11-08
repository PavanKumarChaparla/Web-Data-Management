
function initialize(){
	api_key = "cbad6b46a398f76ffac460b87fa3752e";
	xhrBiographyRequest = new XMLHttpRequest();
	xhrAlbums = new XMLHttpRequest();
	xhrSimilarArtists = new XMLHttpRequest();
	param1 = "getinfo";
	param2 = "gettopalbums";
	param3 = "getsimilar";
	display = false;
}

function sendRequest() {
	var artist = encodeURI(document.getElementById("artist-name").value);
	xhrBiographyRequest.open("GET", "proxy.php?method=" + "artist." +param1 + "&artist=" + artist + "&api_key=" + api_key + "&format=json", true);
	xhrBiographyRequest.setRequestHeader("Accept", "application/json");
	xhrBiographyRequest.onreadystatechange = function () {
		if (this.readyState == 4) {
			artistInfo = JSON.parse(this.responseText);
			console.log(artistInfo);
			document.getElementById("enter-text").style.display = "none";
			display = true;
			document.getElementById("diplay-results").style.display = "";
			document.getElementById("artist").innerHTML = '<a href="' + artistInfo.artist.url + '">' + artistInfo.artist.name + '</a>';
			document.getElementById("artistBio").innerHTML = artistInfo.artist.bio.content;		
			document.getElementById("artistPicture").src = artistInfo.artist.image[artistInfo.artist.image.length - 1]["#text"];
		}
	};
	xhrBiographyRequest.send(null);

	xhrAlbums.open("GET", "proxy.php?method="+ "artist." + param2 + "&artist=" + artist + "&api_key=" + api_key + "&format=json", true);
	xhrAlbums.setRequestHeader("Accept", "application/json");
	xhrAlbums.onreadystatechange = function () {
		if (this.readyState == 4) {
			defaultPicture = 'https://www.techadvisor.com/cmsdata/features/3782649/how-to-cancel-apple-music-main_thumb900_1-1.png';
			artist = JSON.parse(this.responseText);
			albums = artist.topalbums.album;
			artistTopAlbums = ""
			console.log(albums)
			for (albumList = 0; albumList < albums.length; albumList++) {
				if(albums[albumList].image[0]["#text"].length == 0){
					artistTopAlbums = artistTopAlbums +  
					 '"<div class="col-sm-2 col-sm-2 col-sm-2 col-sm-2"><img class="album-photo-item" src="' +
					defaultPicture +
					'" width="150" height="200">' +
					 albums[albumList].name +
					'</div>'
				}
				else{
					artistTopAlbums = artistTopAlbums + 
					  '"<div class="col-sm-2 col-sm-2 col-sm-2 col-sm-2"><img class="album-photo-item" src="' +
				albums[albumList].image[albums[albumList].image.length - 1]["#text"] +
					'" width="150" height="200">' + 
					albums[albumList].name +
					'</div>'
				}
			}
			document.getElementById("artistAlbums").innerHTML = artistTopAlbums;
		}
	};
	xhrAlbums.send(null);

	xhrSimilarArtists.open("GET", "proxy.php?method=" + "artist." + param3 + "&artist=" + artist + "&api_key=" + api_key + "&format=json", true);
	xhrSimilarArtists.setRequestHeader("Accept", "application/json");
	xhrSimilarArtists.onreadystatechange = function () {
		if (this.readyState == 4) {
			similarArtistsObj = JSON.parse(this.responseText);
			similarArtistsFound = similarArtistsObj.similarartists;
			similarArtists = "";
			for(similarArtist in similarArtistsFound.artist){
				similarArtists = similarArtists + "'<p class='col-sm-2 col-sm-4 col-sm-2'>" + similarArtistsFound.artist[similarArtist].name + "</p>";
			}
			document.getElementsByClassName("similar-artists")[0].innerHTML = similarArtists;
		}
	};
	xhrSimilarArtists.send(null);
}
