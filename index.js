var express = require("express");
var bodyParser = require("body-parser");
var mysql = require("mysql");
var app = express();
var session = require("express-session");
var credenciales = {
    user: "root",
    password: "",
    port: "3306",
    host: "localhost",
    database: "db_proyecto"
};

app.use(express.static("public")); //Middlewares
app.use(session({ secret: "ASDFE$%#%", resave: true, saveUninitialized: true }));
var home = express.static("homepage");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.urlencoded({extended:true}));

app.use(
    function (peticion, respuesta, next) {
        if (peticion.session.codigoUsuario) {
            home(peticion, respuesta, next);
        }
        else
            return next();
    }
);

function verificarAutenticacion(peticion, respuesta, next) {
    if (peticion.session.codigoUsuario)
        return next();
    else
        respuesta.send("ERROR, ACCESO NO AUTORIZADO");
}


app.post("/login", function (peticion, respuesta) {
    var conexion = mysql.createConnection(credenciales);
    conexion.query("SELECT nombre,password,id_plan,id_usuario,correo  FROM tbl_usuarios WHERE correo=? AND password=?",
        [peticion.body.correo, peticion.body.contrasena],
        function (err, data, fields) {
            if (data.length > 0) {
                peticion.session.codigo = data[0].id_usuario;
                peticion.session.correo = data[0].correo;
                peticion.session.codigoUsuario = data[0].id_plan;
                data[0].estatus = 0;
                respuesta.send(data[0]);
            } else {
                respuesta.send({ estatus: 1, mensaje: "Login fallido" });
            }

        }
    );
});

app.get("/obtener-sesion", function (peticion, respuesta) {
    respuesta.send("Valor de la variable de sesion almacenado: " + peticion.session.codigoUsuario);
});

app.get("/logout", function (peticion, respuesta) {
    peticion.session.destroy();
    respuesta.send("Sesion eliminada");

});


app.post("/ingresar-usuario", function (req, res) {
    var conexion = mysql.createConnection(credenciales);
    conexion.query("SELECT nombre,password,id_plan,id_usuario,correo  FROM tbl_usuarios WHERE correo=? AND password=?",
        [req.body.correo, req.body.password],

        function (err, data, fields) {
            if (data.length > 0) {
                console.log(data);
                res.send("1");
            } else {
                var sql = 'INSERT INTO tbl_usuarios (id_usuario, nombre,apellido, correo, password,id_plan) VALUES (?,?,?,?,?,1)';
                conexion.query(sql,
                    [req.session.codigo,
                    req.body.nombre,
                    req.body.apellido,
                    req.body.correo,
                    req.body.password],
                    function (err, rows, fields) {
                        if (!err)
                            res.send(rows);

                        else
                            console.log(err);
                    })
            }

        }
    );

});

app.listen(3000);
console.log("Servidor iniciado full");