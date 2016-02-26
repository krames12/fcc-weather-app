var lng;
var lat;
var weatherInfo;
var httpReq = new XMLHttpRequest();
var request;
var locationURL;
var apiKey = "97aa3fe4ed2a80516a95bda9f813a22e";
var fTemp;
var cTemp;
var tempType;

// Initiates geolocation
navigator.geolocation.getCurrentPosition(geoSuccess, geoError);

function geoError(error){
	$(".current-city").html("<p>Geolocation is not supported by your browser.");
}

function geoSuccess(position){
	// Edits location URL to be used as the API call to match coordinates of user
	lng = position.coords.longitude;
	lat = position.coords.latitude;
	locationURL = ("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lng + "&APPID=" + apiKey);

	// Gets the data and changes the information on the page to reflect current weather
	getData(locationURL);
	pageChange();
}

// Makes API call to Open Weather Map and adjusts temperature variables
function getData(loc){
	httpReq.open("GET", loc, false);
	httpReq.send();
	weatherInfo = JSON.parse(httpReq.responseText);
	fTemp = Math.floor(weatherInfo.main.temp * (9/5) - 459.67);
	cTemp = Math.floor(weatherInfo.main.temp - 273.15);
}

function pageChange(){
	$(".current-city").html(weatherInfo.name.toUpperCase() + ", ");
	$(".city-country").html(weatherInfo.sys.country.toUpperCase());
	$(".condition-icon").html("<img src='http://openweathermap.org/img/w/" + weatherInfo.weather[0].icon + ".png' alt='Weather condition icon.'></img>");
	$(".weather-condition").html(weatherInfo.weather[0].description.toUpperCase());

	// Checks if US and changes unit of measurement accordingly
	if(weatherInfo.sys.country == "US"){
		tempType = "f";
		$(".temp-number").html(fTemp);
		$(".cels").css("opacity", "0.5");
	} else {
		tempType = "c"
		$(".temp-number").html(cTemp);
		$(".farh").css("opacity", "0.5");
	}
}

// Allows user to toggle between Farhenheit and Celsius with visual representation of the current unit
$(".temp-unit").click(function(){
	if(tempType == "c"){
		tempType = "f";
		$(".temp-number").html(fTemp);
	  $(".cels").css("opacity", "0.5");
		$(".farh").css("opacity", "1");
	} else if (tempType == "f") {
		tempType = "c"
		$(".temp-number").html(cTemp);
		$(".farh").css("opacity", "0.5");
		$(".cels").css("opacity", "1");
	}
})

$(".refresh").click(function(){
	navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
})
