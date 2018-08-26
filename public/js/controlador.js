$("#btn-login").click(function(){
    console.log("Enviar al servidor: Emisor: " + $("#txt-email").val());
    if((validar()==true)) {
    $.ajax({
        url:"/login",
        data:"correo="+$("#txt-email").val()+"&contrasena="+$("#txt-contrasena").val(),
        method:"POST",
        dataType:"json",
        success:function(respuesta){
         
            if (respuesta.estatus ==0){
                
           
            window.location.href ="home.html";
            }else{
                $.toast({
                    afterHidden: function () {
                
                   },
                  heading: 'Success',
                  text: 'Este usuario NO esta registrado',
                  showHideTransition: 'slide',
                  icon: 'success',
                  hideAfter: 1600

               })     
        }
    }

    });
}
});

function validar(){
    if($("#txt-email").val() == "" ){
        $('#prueba').html('campo correo esta vacio' +" "+ '<i class="fas fa-times"></i>');
        $("#txt-email").focus();  
     return false;
   }
 else
     {
        $("#prueba").html(" ");
        return true;
       }


    
}


