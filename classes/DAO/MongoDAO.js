"use strict";
const assert = require('assert');

class MongoDAO{
	constructor(connection){
		this.connection = connection;
	}
	
	insert_user(role, fullName, birthDate, RH, gender, address, phone, email, password, callback){
		var collection = this.connection.collection('users');
		var user = {
			'role': role,
			'name':fullName,
			'birth_date': birthDate,
			'RH': RH,
			'gender':gender,
			'address': address,
			'phone': phone,
			'email': email,
			'password': password
		};
		collection.insertOne(user,function(err,result){
			assert.equal(err, null);;
			callback(result);
		});
		
	}
	
	validate_user(email, password, callback){
		var collection = this.connection.collection('users');
		collection.find({'email':email, 'password':password}).toArray(function(err,docs){
			assert.equal(err, null);
			callback(docs);
		});
	}
	
	get_user(email, callback){
		var collection = this.connection.collection('users');
		collection.find({'email':email}).toArray(function(err,docs){
			assert.equal(err, null);
			callback(docs);
		})
	}
	
	get_users(callback){
		var collection = this.connection.collection('users');
		collection.find({}).toArray(function(err, docs){
			assert.equal(err, null);
			callback(docs);
		});
	}

	get_teachers(callback){
		var collection = this.connection.collection('users');
		collection.find({'role':'TEACHER'}).toArray(function(err,docs){
			assert.equal(err, null);
			callback(docs);
		});
	}
	
	get_player(callback){
		var collection = this.connection.collection('users');
		collection.find({'role':'PLAYER'}).toArray(function(err,docs){
			assert.equal(err, null);
			callback(docs);
		});
	}
	
	get_player_course(id_course, callback){
		var collection = this.connection.collection('users');
		collection.find({'classes.schedules.id':id_course}).toArray(function(err,docs){
			assert.equal(err, null);
			callback(docs);
		})
	}
	
	add_paymenth_method(card_name, address, total, cardNumber, month_exp, year_exp, ccv, email_address, callback){
		var collection = this.connection.collection('users');
		var payment = {
			'card_name':card_name,
			'address': address,
			'total': total,
			'card_number': cardNumber,
			'exp_date':{
				'year': year_exp,
				'month': month_exp
			},
			'ccv': ccv
		}
		collection.update({email:email_address}, {$set:{paymet_data:payment}},function(err, result){
			assert.equal(err, null);
			callback(result);
		});
	}

	add_course(start_date, end_date, start_hour, end_hour, days, id_teacher, price, callback){
		var collection = this.connection.collection('courses');
		var course = {
			'start_date': start_date,
			'end_date': end_date,
			'start_hour': start_hour,
			'end_hour': end_hour,
			'days': days,
			'id_teacher': id_teacher,
			'price': price
		};
		collection.insertOne([course], function(err,result){
			assert.equal(err, null);
			callback(result);
		});
	}
	
	get_courses(callback){
		var collection = this.connection.collection('courses');
		collection.find({}).toArray(function(err,docs){
			assert.equal(err, null);
			callback(docs);
		});
	}
	
	get_courses_by_teacher(id_teacher, callback){
		var collection = this.connection.collection('courses');
		collection.find({'id_teacher':id_teacher}).toArray(function(err,docs){
			assert.equal(err, null);
			callback(docs);
		});
	}
	
	get_course(id_course, callback){
		var collection = this.connection.collection('courses');
		collection.find({'_id': id_course}).toArray(function(err,docs){
			assert.equal(err, null);
			callback(docs);
		});
	}
	
	add_userToCourse(email, course_id, callback){
		var collection = this.connection.collection('users');
		var schedule = {
			'id': course_id,
			'paid': false
		}
		this.get_user(email, function(result){
			if(result != undefined && result.length!=0){
				collection.updateOne({ "_id": ObjectId(result[0]._id) },{ "$push": { "courses": schedule } },function(err, resultf){
					assert.equal(err, null);
					console.log(resultf);
				});
			}
		});
	}
	
	add_teacherToCourse(email, course_id, callback){
		var collection = this.connection.collection('users');
		var schedule = {
			'id': course_id
		}
		this.get_user(email, function(result){
			if(result != undefined && result.length!=0){
				collection.updateOne({ "_id": ObjectId(result[0]._id) },{ "$push": { "courses": schedule } },function(err, resultf){
					assert.equal(err, null);
					console.log(resultf);
				});
			}
		});
	}
	

}
module.exports = MongoDAO;