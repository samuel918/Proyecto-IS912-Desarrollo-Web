$("#btn-login").click(function(){
    console.log("Enviar al servidor: Emisor: " + $("#txt-email").val());
    $.ajax({
        url:"/login",
        data:"correo="+$("#txt-email").val()+"&contrasena="+$("#txt-contrasena").val(),
        method:"POST",
        dataType:"json",
        success:function(respuesta){
           if( validarCampoVacio()){
            if (respuesta.estatus ==0){
                 console.log(respuesta);
            window.location.href ="homepage.html";
            }else{
               
            console.log(respuesta);
        }
    }
}
    });
});

function validarCampoVacio(){
    if ($("#txt-email").val() ==""){
        $("#txt-email").removeClass().addClass("is-valid");
        $("#txt-email").addClass("is-invalid");
        return false;
    } else{
        $("#txt-email").removeClass().addClass("is-invalid");
        $("#txt-email").addClass("is-invalid");
        return true;
    }
}




