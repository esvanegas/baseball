const BaseballFacade = require('./classes/Facade/BaseballFacade.js');
const { check, validationResult } = require('express-validator');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var path = require('path');
var facade = new BaseballFacade();

app.listen(3000);
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('./HTML'));
//app.use(cookieParser());
// respond with "hello world" when a GET request is made to the homepage
app.route('/')
	.get(function(req,res){
		res.sendFile('Index.html',{root:path.join(__dirname,'./HTML/')});
	})

app.route('/pay')
	.get(function(req,res){
		res.sendFile('ModulodePago.html',{root:path.join(__dirname,'./HTML/')});
	})
	.post(function(req,res){
		console.log(req.body);
		facade.add_payment(req.body.fullnamecard ,req.body.address, req.body.money, req.body.cardnumber ,req.body.month, req.body.year, req.body.codeccv ,req.body.email, function(res){});
		res.send({data: "OK", status: 200});
	});

app.route('/register')
	.get(function(req, res) {
		res.sendFile('Registrar_Usuario.html',{root: path.join(__dirname, './HTML/')});
	})
	.post([check('Correo').isEmail(),check('RH').isLength({max:3,min:2})], function(req, res){
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
  		}
		var data = {
			'rol':req.body.Rol,
			'nombres': req.body.Nombres,
			'fecha': req.body.Fecha,
			'RH': req.body.RH,
			'gender': req.body.Sexo,
			'adress': req.body.Direccion,
			'correo': req.body.Correo,
			'contrasena': req.body.Contrasena,
			'telefono':req.body.telefono
		}
		facade.register_user(data['rol'],data['nombres'],data['fecha'], data['RH'], data['gender'],data['adress'], data['telefono'],data['correo'],data['contrasena']);
		//res.send('Usuario registrado satisfactoriamente');
		res.send({data: "OK", data:"OK"  , status: 200});

		//res.redirect('/register');
	});

app.route('/login')
	.get(function(req, res){
		res.sendFile('login.html', {root: path.join(__dirname, './HTML/')});
	})
	.post(function(req,res){
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
  		}
  		var email = req.body.username;
  		var password = req.body.password;
  		facade.login(email,password,function(result){
	  		if(result != false){
	  			var page = '';
	  			switch(result[0]['role']){
	  				case 'Entrenador':
	  					page += '/trainer';
	  					break;
	  				case 'Jugador':
	  					page += '/player';
	  					break;
	  				case 'Administrator':
	  					page += '/admin';
	  			}
	  			//res.cookie('userData',{'email': email, 'role': result[0]['role']});
	  			//res.redirect(200, page);
		  		res.send({data: "OK", role: result[0]['role'] , status: 200});
	  		}else{
		  		res.send({data: "BAD", status: 400});
	  		}
  		});
	});

app.route('/player')
	.get(function(req, res){
		console.log('Cookie: '+req.cookies);
		res.sendFile('Jugador.html', {root: path.join(__dirname, './HTML/')});
	});

app.route('/player-schedule')
	.get(function(req, res){
		res.sendFile('Jugadorhorario.html',{root: path.join(__dirname, './HTML/')});
	});

app.route('/player-update')
	.get(function(req, res){
		res.sendFile('Jugadoractualizar.html',{root: path.join(__dirname, './HTML/')});
	});

app.route('/trainer')
	.get(function(req, res){
		console.log(req.cookies);
		res.sendFile('Entrenador.html', {root: path.join(__dirname, './HTML/')});
	});

app.route("/admin")
	.get(function(req,res){
		res.sendFile('administrador.html', {root: path.join(__dirname, './HTML/')});
	})
	.post(function(req,res){
		console.log('post!!!!!!');
		facade.get_users(function(result){
			if(result != undefined){
				res.send({data: "OK", json: result, status:200});
			}else{
				res.send({data: "BAD", status: 400});
			}
		});
	});