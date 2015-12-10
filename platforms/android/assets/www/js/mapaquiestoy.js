var map;
var ob;
function initMap() {
    ob=getVarsUrl();
    console.log("ob", ob);
    var myLatLng = {lat: parseFloat(ob.lat), lng: parseFloat(ob.long)};
    map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        zoom: 8
    });

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map
    });

    map.setCenter(myLatLng);
    map.setZoom(14);
    marker.setMap(map);
    document.getElementById('gback').addEventListener('click',atras, false);
    document.getElementById("addr").innerHTML = ob.add.replace(/%20/g, " ");
}

function atras(){
    window.location = "filtros.html?lat="+ob.lat+'&long='+ob.long+'&pm='+ob.pm+'&dm='+ob.dm+'&ord='+ob.ord;
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