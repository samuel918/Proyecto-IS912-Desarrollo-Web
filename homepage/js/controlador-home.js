
  

  $('#mySelect').on('change', function() {
    var value = $(this).val();
    $("#btn-crear").click(function(){
        var editor = ace.edit("editor");
        editor.setTheme("ace/theme/chrome");
        editor.getSession().setMode("ace/mode/"+value);
        editor.setFontSize(14);
        $("#exampleModal").modal('hide');
        $("#btn-archivo").attr("disabled", true);
        
    });
  
  
  });



$("#salir").click(function(){
    $.ajax({
        url:"/logout",
        success:function(respuesta){
            window.location.href ="index.html";
        
    }
    });
});

/*$("#guardar").click(function () {
    //$("#editor").attr("style", "display:none");


    var parametros = "nombrearchivo"+ $("#txt-archivo").val() +"&contenido="+ $("#correo").val()+ "&contrasena="+ $("#contrasena-login").val();
        $.ajax({
            url: "/archivo",
            method: "POST",
            data: parametros,
            dataType: "json",
            success: function (respuesta) {
            
            }
            });
    
    
    });*/
