var add;
var point;
function buildficha(){
    Parse.initialize("tN9uG7NreDb9yL8sCP05DpEyElNdSGqfpE4zYBxD", "7Kb0ruzEAyvKrGHGPYpEEbhPw2E8LpF7tjpunq8k");
    var oid = getVarsUrl();
    document.getElementById('bback').addEventListener('click', goback, false);
    document.getElementById('homeb').addEventListener('click', gohome, false);
    var herr = Parse.Object.extend("Herramientas");
    var query = new Parse.Query(herr);
    query.equalTo("objectId", oid.oid);
    query.find({
        success: function(results) {
            document.getElementById("t1").innerHTML = results[0].get("Nombre");
            document.getElementById("im").innerHTML = '<img src=' + results[0].get("Foto") +'height="200px" width="200px">' ;
            document.getElementById("prop").innerHTML = results[0].get("Propietario");
            document.getElementById("desc").innerHTML = results[0].get("Descripcion");
            document.getElementById("prec").innerHTML = results[0].get("preciodia");
            point = results[0].get("Localizacion");
            ReverseGeocode(point.latitude,point.longitude);
            getfecha(results[0].get("Disponibilidad_inicio"), results[0].get("Disponibilidad_final"));
            document.getElementById("vmapa").addEventListener('click',vermapa,false);

        },
        error: function(error) {
            alert("Error: " + error.code + " " + error.message);
        }
    });
}

function vermapa(){
    var params=getVarsUrl();
    window.location="mapaficha.html?oid="+ params.oid +'&lat=' + params.lat + '&long=' + params.long + '&dm=' + params.dm + '&pm=' + params.pm +'&ord=' + params.ord + '&add=' + add + '&latp=' + point.latitude + '&longp=' + point.longitude;

}


function goback(){
    document.getElementById("bback").disabled=true;
    var params = getVarsUrl();
    window.location="herramientas.html?lat=" + params.lat + '&long=' + params.long + '&dm=' + params.dm + '&pm=' + params.pm + '&ord=' + params.ord;
}

function gohome(){
    document.getElementById("homeb").disabled=true;
    var params=getVarsUrl();
    window.location="filtros.html?lat=" + params.lat + '&long=' + params.long + '&dm=' + params.dm + '&pm=' + params.pm + '&ord=' + params.ord;
}

function getfecha(fechai, fechaf){
    document.getElementById("disp").innerHTML = 'Desde: ' + fechai.getDate() +'/'+ fechai.getMonth()+'/'+fechai.getFullYear() + '<br>' + 'Hasta: ' + fechaf.getDate() +'/'+ fechaf.getMonth()+'/'+fechaf.getFullYear();
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

function ReverseGeocode(latitude, longitude){
    var reverseGeocoder = new google.maps.Geocoder();
    var currentPosition = new google.maps.LatLng(latitude, longitude);
    reverseGeocoder.geocode({'latLng': currentPosition}, function(results, status) {

        if (status == google.maps.GeocoderStatus.OK) {
            if (results[0]) {
                 var dir = "";

                for (var i=0; i<results[0].address_components.length; i++) {
                    if (results[0].address_components[i].types[0] == "locality") {
                        dir += results[0].address_components[i].long_name + ', ';
                    }


                    if(results[0].address_components[i].types[0] == "country"){
                        dir += results[0].address_components[i].long_name;
                        break;


                    }
                }
                document.getElementById("loc").innerHTML = dir;
                add=dir;

            }
            else {
                alert("Localizaci\u00f3n no disponible");
            }
        } else {
            alert("Localizac\u00f3n no disponible");
        }
    });

}
