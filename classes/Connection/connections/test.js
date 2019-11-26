"use strict"
var MongoDBConnection = require('./MongoDBConnection.js');

var mongoConnection = new MongoDBConnection('baseball').getConnection();

console.log(mongoConnection);