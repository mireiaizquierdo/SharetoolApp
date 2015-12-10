var map;
var ob;
function initMap() {
    ob=getVarsUrl();
    console.log("ob", ob);
    var myLatLng = {lat: parseFloat(ob.latp), lng: parseFloat(ob.longp)};
    map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        zoom: 8
    });

    var circle = new google.maps.Circle({
        strokeColor: '#0080FF',
        fillColor: '#0080FF',
        fillOpacity: 0.45,
        map: map,
        center: myLatLng,
        radius: 200
    });

    map.setCenter(myLatLng);
    map.setZoom(14);
    circle.setMap(map);
    document.getElementById('gback').addEventListener('click',atras, false);
    document.getElementById("addr").innerHTML = ob.add.replace(/%20/g, " ");
}

function atras(){
    window.location="ficha.html?oid="+ ob.oid + '&lat=' + ob.lat + '&long=' + ob.long + '&dm=' + ob.dm + '&pm=' + ob.pm +'&ord=' + ob.ord + '&latp=' + ob.latp + '&longp=' + ob.longp;
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
