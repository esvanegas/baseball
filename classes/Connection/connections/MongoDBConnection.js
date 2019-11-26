"use strict";

var MongoClient = require('mongodb').MongoClient;
var format = require('util').format;

class MongoDBConnection{
	
	constructor(db){
		this.connParameters={
			'host': '127.0.0.1',
			'port': '27017',
			'db': db
		}
	}
	
	
	/*getConnection(){
		var path = 'mongodb://'+this.connParameters['host']+':'+this.connParameters['port']+'/'+this.connParameters['db'];
		var conn = MongoClient.connect(path, function (err, db) {
    		if (err) {
        		throw err;
    		} else {
        		console.log("successfully connected to the database");
        		callback(db);
    		}
		});
		return MongoClient.connect(path).then(function(db){
			return db;
		}).catch(function(err){});
	}*/
	
	getConnection(callback){
		var path = 'mongodb://'+this.connParameters['host']+':'+this.connParameters['port']+'/'+this.connParameters['db'];
		var conn = MongoClient.connect(path, function (err, db) {
    		if (err) {
        		throw err;
    		} else {
        		console.log("successfully connected to the database");
        		callback(db);
    		}
		});
	}
	
}
module.exports = MongoDBConnection;