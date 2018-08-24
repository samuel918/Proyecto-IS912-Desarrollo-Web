var express  = require("express");
var bodyParser = require("body-parser");
var mysql = require("mysql");
var app = express();
var session = require("express-session");
var credenciales = {
    user:"root",
    password:"",
    port:"3306",
    host:"localhost",
    database:"db_proyecto"
};

app.use(express.static("public")); //Middlewares
app.use(session({secret:"ASDFE$%#%",resave:true, saveUninitialized:true}));
var home = express.static("home");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
//app.use(express.urlencoded({extended:true}));

app.use(
    function(peticion,respuesta,next){
        if (peticion.session.codigoUsuario){
           home(peticion,respuesta,next);
        }
        else
            return next();
    }
);

function verificarAutenticacion(peticion, respuesta, next){
	if(peticion.session.codigoUsuario)
		return next();
	else
		respuesta.send("ERROR, ACCESO NO AUTORIZADO");
}


app.post("/login", function(peticion, respuesta){
    var conexion = mysql.createConnection(credenciales);
    conexion.query("SELECT nombre,password,id_plan,id_usuario,correo  FROM tbl_usuarios WHERE correo=? AND password=?",
        [peticion.body.correo, peticion.body.contrasena],
        function(err, data, fields){
                if (data.length>0){
                    peticion.session.correo = data[0].correo;
                    peticion.session.codigoUsuario = data[0].id_plan;
                    data[0].estatus = 0;
                    respuesta.send(data[0]); 
                }else{
                    respuesta.send({estatus:1, mensaje: "Login fallido"}); 
                }
            	
         }
    ); 
});

app.get("/logout",function(peticion, respuesta){
	peticion.session.destroy();
    respuesta.send("Sesion eliminada");
  
});

app.listen(3000);
console.log("Servidor iniciado full");