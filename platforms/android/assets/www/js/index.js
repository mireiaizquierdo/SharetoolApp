window.onload = function () {
    document.addEventListener("deviceready", onDeviceReady, false);
};

function onDeviceReady() {
    document.getElementById('blogin').addEventListener('click', login, false);
    Parse.initialize("tN9uG7NreDb9yL8sCP05DpEyElNdSGqfpE4zYBxD", "7Kb0ruzEAyvKrGHGPYpEEbhPw2E8LpF7tjpunq8k");

}

function login(){
    document.getElementById("blogin").disabled=true;
    var usern = document.getElementById("user").value;
    var passw = document.getElementById("pass").value;
    Parse.User.logOut();
    Parse.User.logIn(usern, passw, {

        success:function(user) {
           window.location = "filtros.html";
        },
        error:function(user, error) {
            console.log("ERROR!", error.code);
            if (error.code == 209){
                Parse.User.logOut();
                Parse.User.logIn(usern, passw, {

                    success:function(user) {
                        window.location = "filtros.html";
                    },
                    error:function(user, error) {
                        console.log("ERROR!", error.code);
                        navigator.notification.alert('El usuario o la contrase\u00f1a son incorrectos, intente de nuevo.', function (){}, 'Error de inicio de sesi\u00f3n','Aceptar');
                        document.getElementById("blogin").disabled=false;
                    }
                });
            }
            navigator.notification.alert('El usuario o la contrase\u00f1a son incorrectos, intente de nuevo.', function (){}, 'Error de inicio de sesi\u00f3n','Aceptar');
            document.getElementById("blogin").disabled=false;
        }
    });
}
