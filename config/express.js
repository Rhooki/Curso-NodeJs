var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

module.exports = () => {
	console.log("Carregando configurações do express");

	var app = express();

	app.use(express.static('./app/public'));
	app.set('view engine', 'ejs');
	app.set('views', './app/views');

	app.use(bodyParser.urlencoded({extended:true})); 
	app.use(bodyParser.json());
	app.use(expressValidator());

	load('routes', {cwd: 'app'})
		.then('infra')
		.into(app)

	app.use((req,res,next) => {
		res.status(404).render('erros/404');
		//res.redirect('home/index');
		next();
	});

	//sempre que tem error na frente a rota é chamada antes
	app.use((error,req,res,next) => {
		if(process.env.NODE_ENV == 'production'){
			res.status(500).render('erros/500');
			next();
		}
	})

	return app;
}