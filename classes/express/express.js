const BaseballFacade = require('../Facade/BaseballFacade.js');
var express = require('express');
var app = express();
var path = require('path');

app.use(express.urlencoded({ extended: true }));
// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
	res.sendFile('Registrar_Usuario.html',{root: path.join(__dirname, '../../HTML/')});
});

app.post('/register-user', function(req,res){
	var data = {
		'rol':req.body.Rol,
		'nombres': req.body.Nombres,
		'fecha': req.body.Fecha,
		'RH': req.body.RH,
		'correo': req.body.Correo,
		'contrasena': req.body.Contrasena
	}
	console.log(data);
	
	res.end();
});

app.listen(3000);
