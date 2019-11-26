"use strict"
const MongoDBConnection = require('./connections/MongoDBConnection.js');

class ConnectionFactory{
	constructor(){
		
	}
	
	getConnection(engine, callback){
		switch(engine){
			case 'MONGO':
				(new MongoDBConnection('baseball')).getConnection(function(result){
					callback(result);
				});
				break;
		}	
	}
}

module.exports=ConnectionFactory;