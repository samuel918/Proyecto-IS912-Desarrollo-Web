



$("#btn-crear").click(function () {
    $('#editor').show();
    $("#guardar").attr("disabled", false);
    var editor = ace.edit("editor");
    var value = $("#lenguaje").val();
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/" + value);
    editor.setFontSize(14);
    editor.setValue("");
    $("#exampleModal").modal('hide');
    $("#btn-archivo").attr("disabled", true);

});


$("#salir").click(function () {
    $.ajax({
        url: "/logout",
        success: function (respuesta) {
            window.location.href = "index.html";

        }
    });
});

$("#guardar").click(function () {
    $('#editor').hide();
    $("#guardar").attr("disabled", true);
    $("#btn-archivo").attr("disabled",false);
    var editor = ace.edit("editor");
    var myCode = editor.getSession().getValue();
    var nombre = $("#txt-archivo").val();
    var value = $("#lenguaje").val();
    cargarArchivos();
    $.ajax({
        url: "/ingresar-archivo",
        method: "GET",
        data: 'nombrearchivo=' + nombre + '&contenido=' + myCode + '&extension=' + value,
        dataType: "json",
        success: function (respuesta) {
           
        }
    });
    


});

function cargarArchivos(){
    $.ajax({
		url:"/obtener-archivos",
		dataType:"json",
		method:"GET",
		success:function(respuesta){
          $("#prueba").html("");
            for (var i=0; i< respuesta.length; i++){
               
				$('#prueba').append(' <li> <a href="#">'+ respuesta[i].nombre_archivo + '.'+ respuesta[i].extension +'</a> </li> ' );
            }	
            

            
			
		}
    });
	
}

$(document).ready(function(){
	console.log("El DOM ha sido cargado");
   cargarArchivos();
});

