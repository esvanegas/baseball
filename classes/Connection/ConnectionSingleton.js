"use strict";
const ConnectionFactory = require("./ConnectionFactory.js");


class Singleton{
	constructor(){
		
	}
	
	createInstance(){
		if(!this.singleton){
			this.singleton = new Singleton();
		}
	}
	
	getInstance(){
		if(!this.singleton){
			this.createInstance();
		}
		return this.singleton;
	}
	

	getMongoConnection(engine,callback){
		if(this.mongoConnection){
			return this.mongoConnection;
		}else{
			var self = this;
			(new ConnectionFactory()).getConnection(engine,function(result){
				self.mongoConnection = result;
				callback(self.mongoConnection);
			});
		}
	}
}
module.exports = Singleton;