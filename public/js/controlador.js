$("#btn-login").click(function(){
    console.log("Enviar al servidor: Emisor: " + $("#txt-email").val());
    $.ajax({
        url:"/login",
        data:"correo="+$("#txt-email").val()+"&contrasena="+$("#txt-contrasena").val(),
        method:"POST",
        dataType:"json",
        success:function(respuesta){
         
            if (respuesta.estatus ==0){
                
                alert("Usuario correcto");    
            window.location.href ="home.html";
            }else{
                alert("Credenciales incorrectas");
            console.log(respuesta);
        }
    }

    });
});

function validarCampoVacio(id){
    if (document.getElementById(id).value==""){
        document.getElementById(id).classList.remove("is-valid");
        document.getElementById(id).classList.add("is-invalid");
        return false;
    } else{
        document.getElementById(id).classList.remove("is-invalid");
        document.getElementById(id).classList.add("is-valid");
        return true;
    }
}


