/********************************************

Copyright (c) Prabhat 2015

*********************************************/

'use strict';
console.log('inside api.js');
//var metamodels = require('../models/metamodels.js');
//var models = metamodels();
var express = require('express');
var restful = require('node-restful');
var fs = require('fs');
var mongoose = restful.mongoose;
var router = express.Router();
//var schemas = models.modules;

//var schema= metamodels;
var mongooseschema = [];
var restfulmodel = [];


fs.readFile('models/metamodels.json', 'utf8', function (err, data) {
    if (err) throw err;
    var obj = JSON.parse(data);
   // console.log(data);

    for (var i = 0; i < obj.metamodels.length; ++i) {
        console.log("This is inside API.js",obj.metamodels[i].ModelName);
        console.log("----------------------------------------");
    }

    for(var i=0;i< obj.metamodels.length; i++){
        console.log ('creating api : ' + obj.metamodels[i].ModelName);
        console.log("API successfully created... Visit http://localhost:3000/api/"+obj.metamodels[i].ModelName);
      //  console.log ('creating api defination: ' + obj.metamodels[i].defination);
            mongooseschema[i] = new mongoose.Schema(obj.metamodels[i].defination);
			restfulmodel[i] = restful.model(obj.metamodels[i].ModelName, mongooseschema[i])
             .methods(['get','post','put','delete'])
            .register(router,'/' + obj.metamodels[i].ModelName);
           // .register(router,'/' + obj.metamodels[i].ModelName/);
    }

});



//set up the api
/*
for(var i=0; i<schemas.length; i++){
	console.log ('creating api: ' + schemas[i].modelname);
	mongooseschema[i] = new mongoose.Schema(schemas[i].definition);
	restfulmodel[i] = restful.model(schemas[i].modelname, mongooseschema[i])
		.methods(['get','post','put','delete'])
		.register(router,'/' + schemas[i].modelname);
}*/

module.exports = router;