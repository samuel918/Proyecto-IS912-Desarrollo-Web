



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
    
	
}

$(document).ready(function(){
	console.log("El DOM ha sido cargado");
    $.ajax({
		url:"/obtener-archivos",
		dataType:"json",
		method:"GET",
		success:function(respuesta){
            console.log(respuesta);
            $("#archivo").append(` <li class="nav-item">
            <a class="nav-link pl-0" href="#">
                <i class="fa fa-book fa-fw"></i>
                <span class="">${respuesta[i].nombre_archivo}</span>
            </a>
        </li>`);
			
		}
    });
});
