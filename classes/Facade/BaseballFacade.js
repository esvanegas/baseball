"use strict"
const MongoDAO = require('../DAO/MongoDAO.js');
const ConnectionSingleton = require('../Connection/ConnectionSingleton.js');

class BaseballFacade{
	constructor(){
		var self = this;
		(new ConnectionSingleton().getInstance().getMongoConnection('MONGO',function(result){
			self.MongoDAO = new MongoDAO(result);
		}));
	}
	
	get_users(callback){
		this.MongoDAO.get_users(function(users_info){
			callback(users_info);
		});
	}

	register_user(role, fullName, birthDate, RH, gender, address, phone, email, password){
		(this.MongoDAO.insert_user(role, fullName, birthDate, RH, gender, address, phone, email, password,function(result){
			//callback(result);
		}));
	}
	
	login(email,password,callback){
		var self = this;
		this.MongoDAO.get_user(email, function(user_info){
			if(self.user_exists(user_info)){
				self.MongoDAO.validate_user(email,password, function(validation){
					if(self.collection_exists(validation)){
						callback(validation);
					}else{
						callback(false);
					}
				});
			}else{
				callback(false);
			}
		});
	}

	add_payment(card_name, address, total, cardNumber, month_exp, year_exp, CCV, email_address, callback){
		this.MongoDAO.add_paymenth_method(card_name, address, total, cardNumber, month_exp, year_exp, CCV, email_address,function(result){
			console.log(result);
			callback(result);
		});
	}
	
	user_information(email, callback){
		var self = this;
	}

	show_courses(ids,callback){
		var courses = [];
		for(var id in ids){
			this.mongoDAO.get_course(id, function(course_info){
				courses.push(course_info);
			});
		}
		callback(courses);
	}
	add_course(start_date, end_date, start_hour, end_hour, days, id_teacher, price, callback){
		this.MongoDAO.add_course(start_date, end_date, start_hour, end_hour, days, id_teacher, price, function(result){
			callback(result);
		})
	}
	user_exists(user_info){
		return this.collection_exists(user_info);
	}
	
	collection_exists(data){
		if(data != undefined && data.length != 0){
			return true;
		}else{
			return false;
		}
	}
}
module.exports = BaseballFacade;