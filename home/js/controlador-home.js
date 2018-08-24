
  

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