var latitude;
var longitude;
var add;

window.onload = function () {
    document.addEventListener("deviceready", GetCurrentUser, false);

};

function GetCurrentUser() {
    Parse.initialize("tN9uG7NreDb9yL8sCP05DpEyElNdSGqfpE4zYBxD", "7Kb0ruzEAyvKrGHGPYpEEbhPw2E8LpF7tjpunq8k");
    document.getElementById('logoutb').addEventListener('click', logout, false);
    document.getElementById('bub').addEventListener('click',GetGeolocation, false);
    document.getElementById('bherr').addEventListener('click',Getlista, false);
    document.getElementById('bmapa').disabled = true;
    var params = getVarsUrl();
    document.getElementById('bmapa').addEventListener('click',verMapa, false);
    if (Object.keys(params).length > 1){
        document.getElementById("precio").value=params.pm
        document.getElementById("distancia").value=params.dm;
        var radios = document.getElementsByName("radOrd");
        for (var i = 0, length = radios.length; i < length; i++) {
            if (radios[i].value == params.ord) {
                // do whatever you want with the checked radio
                radios[i].checked=true;

                // only one radio can be logically checked, don't check the rest
                break;
            }
        }
        document.getElementById("bherr").disabled=false;
        ReverseGeocode(parseFloat(params.lat),parseFloat(params.long));
        latitude=params.lat;
        longitude=params.long;
        document.getElementById('bmapa').disabled = false;
    }

}

function verMapa(){
    var radios = document.getElementsByName("radOrd");
    var rad;
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            // do whatever you want with the checked radio
            rad = radios[i].value;

            // only one radio can be logically checked, don't check the rest
            break;
        }
    }
    var url = "mapaquiestoy.html?lat=" + latitude + '&long=' + longitude +'&add='+ add + '&dm=' + document.getElementById("distancia").value + '&pm=' + document.getElementById("precio").value + '&ord=' + rad;
    window.location = url;
}

function getVarsUrl(){
    var url= location.search.replace("?", "");
    var arrUrl = url.split("&");
    var urlObj={};
    for(var i=0; i<arrUrl.length; i++){
        var x= arrUrl[i].split("=");
        urlObj[x[0]]=x[1]
    }
    return urlObj;
}

function logout (){
    Parse.User.logOut();
    window.location="index.html";

}

function Getlista(){
    document.getElementById("bherr").disabled=true;
    var pm = document.getElementById("precio").value;
    var dm = document.getElementById("distancia").value;
    var radios = document.getElementsByName("radOrd");
    var rad;
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            // do whatever you want with the checked radio
            rad = radios[i].value;

            // only one radio can be logically checked, don't check the rest
            break;
        }
    }

    var url = 'herramientas.html?lat=' + latitude + '&long=' + longitude + '&dm=' + dm + '&pm=' + pm + '&ord=' + rad;
    window.location=url;
}


function GetGeolocation()
{
    document.getElementById("bub").disabled=true;
    var options = { timeout: 3000, enableHighAccuracy: true };
    navigator.geolocation.getCurrentPosition(GetPosition, PositionError, options);
}

function GetPosition(position)
{
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    ReverseGeocode(latitude,longitude);   // Pass the latitude and longitude to get address.
    document.getElementById("bub").disabled=false;
}

function PositionError() {
    navigator.notification.alert('Could not find the current location.');
    document.getElementById("bub").disabled= true;
    document.getElementById('bmapa').disabled = true;
}

function ReverseGeocode(latitude, longitude){
    var reverseGeocoder = new google.maps.Geocoder();
    var currentPosition = new google.maps.LatLng(latitude, longitude);
    reverseGeocoder.geocode({'latLng': currentPosition}, function(results, status) {

        if (status == google.maps.GeocoderStatus.OK) {
            if (results[0]) {
                document.getElementById("location").innerHTML = results[0].formatted_address;
                add = results[0].formatted_address;
                document.getElementById("bherr").disabled=false;
                document.getElementById('bmapa').disabled = false;

            }
            else {
                navigator.notification.alert('Unable to detect your address.');
            }
        } else {
            navigator.notification.alert('Unable to detect your address.');
        }
    });
}


