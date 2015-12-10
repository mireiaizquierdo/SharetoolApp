window.onload = function () {
    document.addEventListener("deviceready", getHerramientas, false);
    document.getElementById('atrasb').addEventListener('click', Goback, false);

};

function Goback(){
    document.getElementById("atrasb").disabled=true;
    window.location="filtros.html?lat=" + params.lat + '&long=' + params.long + '&dm=' + params.dm + '&pm=' + params.pm + '&ord=' + params.ord;
}

var params;

function distanciade(point) {

    var loc = new Parse.GeoPoint(parseFloat(params.lat), parseFloat(params.long));
    var dis = loc.kilometersTo(point).toFixed(2);
    if(dis > 500){
        return "M\u00e1s de 500";
    } else{
        return "Aprox. " + dis;
    }

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



function getHerramientas(){
    params=getVarsUrl();
    Parse.initialize("tN9uG7NreDb9yL8sCP05DpEyElNdSGqfpE4zYBxD", "7Kb0ruzEAyvKrGHGPYpEEbhPw2E8LpF7tjpunq8k");
    var gp = new Parse.GeoPoint(parseFloat(params.lat), parseFloat(params.long));
    var Herramientas = Parse.Object.extend("Herramientas");
    var query = new Parse.Query(Herramientas);
    var km = 0;
    //query.equalTo("playerName", "Dan Stemkoski");
    if (params.ord == "Distancia"){
        if (params.dm == "") {
            km = 1000;
        }else {
            km = parseInt(params.dm);
        }
        if (params.pm != "") {
            query.lessThanOrEqualTo("preciodia", parseInt(params.pm));
        }
        query.withinKilometers("Localizacion", gp, km );

    }else if (params.ord == "Precio"){
        if (params.dm == "") {
            km = 1000;
        }else {
            km = parseInt(params.dm);
        }
        if (params.pm != "") {
            query.lessThanOrEqualTo("preciodia", parseInt(params.pm));
        }
        query.withinKilometers("Localizacion", gp, km );
        query.ascending("preciodia");
    }
    query.find({
        success: function(results){
            if (results.length==0){
                alert("No hay herramientas que coincidan con su b\u00fasqueda");
                window.location="filtros.html?lat=" + params.lat + '&long=' + params.long + '&dm=' + params.dm + '&pm=' + params.pm + '&ord=' + params.ord;
            }else{
                // Do something with the returned Parse.Object values
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                    var furl = "ficha.html?oid=" + object.id + '&lat=' + params.lat + '&long=' + params.long + '&dm=' + params.dm + '&pm=' + params.pm  + '&ord=' + params.ord;
                    $('#MyFriendsList').append('<li><a href="' + furl + '" data-ajax="false"><img src=' + object.get("perfimg") + 'width="100" height="100"/><h3 class="ui-li-heading">' + object.get("Nombre") + '</h3><div class="ui-li-desc">' + object.get("Descripcion") + '</div><h2><div class="ui-li-content">'+ distanciade(object.get("Localizacion")) + ' Km - ' + object.get("preciodia") + ' ' + String.fromCharCode(8364) + '</div></h2></a></li>');

                    //alert(object.id + ' - ' + object.get('Nombre'));
                }
                $('#MyFriendsList').listview();
            }
        },

        error: function(error) {
            alert("Error: " + error.code + " " + error.message);
        }
    });

}

