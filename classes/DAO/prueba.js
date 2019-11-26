"use strict";
const MongoDAO = require('./MongoDAO.js');
const ConnectionSingleton = require('../Connection/ConnectionSingleton.js');

new ConnectionSingleton().getMongoConnection('MONGO',function(result){
	setDao(result);
});

function setDao(singConns){
	var dao = new MongoDAO(singConns);
	//dao.insert_user('TEACHER', 'Esteban Vanegas Albarracin', '10/03/2019', 'O+', 'M', 'CRA 5 NO 26B 14','3008451054','evanegasal@ucentral.edu.co','Un1v3rs1d4d',function(result){});
	dao.get_teachers(function(result){
		console.log(result[0]._id);
	});
	dao.validate_user('evanegasal@ucentral.edu.co','Un1v3rs1d4d1',function(result){console.log(result)});
}


