
  

  
    $("#btn-crear").click(function(){
        var editor = ace.edit("editor");
       var value = $("#lenguaje").val();
       editor.setTheme("ace/theme/monokai");
        editor.getSession().setMode("ace/mode/"+value);
        editor.setFontSize(14);
        $("#exampleModal").modal('hide');
        $("#btn-archivo").attr("disabled", true);
        
    });
  
  




$("#salir").click(function(){
    $.ajax({
        url:"/logout",
        success:function(respuesta){
            window.location.href ="index.html";
        
    }
    });
});

$("#guardar").click(function () {
    $("#editor").attr("style", "display:none");
    $("#guardar").attr("disabled", true);
    var editor = ace.edit("editor");
 var myCode = editor.getSession().getValue();
   var nombre =$("#txt-archivo").val();
    var value = $("#lenguaje").val(); 
    console.log("achivo: " +nombre);
    console.log("lenguaje :" +value);
    console.log("lenguaje :" +myCode);
        $.ajax({
            url: "/ingresar-archivo",
            method: "GET",
            data: 'nombrearchivo='+nombre +'&contenido='+ myCode +'&extension=' +value ,
            dataType: "json",
            success: function (respuesta) {
            alert("dsd");
            }
            });
    
    
    });
