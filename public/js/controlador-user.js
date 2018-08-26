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
                
                    $.toast({
                        afterHidden: function () {
                    
                       },
                      heading: 'Success',
                      text: 'usuario ya existe',
                      showHideTransition: 'slide',
                      icon: 'success',
                      hideAfter: 1200
    
                   })        
                }else{
                   
                 $.toast({
                    afterHidden: function () {
                  window.location="index.html";
                   },
                  heading: 'Success',
                  text: 'se ha registroado correctamente',
                  showHideTransition: 'slide',
                  icon: 'success',
                  hideAfter: 1200

               })        

            }
            }
            });
    
    
    });




    
