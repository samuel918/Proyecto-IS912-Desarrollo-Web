$("#btn-registro").click(function () {
	
    var parametros = "nombre="+ $("#txt-nombre").val() + "&correo="+ $("#txt-email").val() + "&password="+ $("#txt-password").val()
                    + "&apellido="+ $("#txt-apellido").val();
        $.ajax({
            url: "/ingresar-usuario",
            method: "POST",
            data: parametros,
            dataType: "json",
            success: function (respuesta) {
                if (respuesta==1){
                
                    alert("Usuario ya existe");    
               
                }else{
                    alert("insert correct");
                console.log(respuesta);
            }
            }
            });
    
    
    });