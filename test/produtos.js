let express = require('../config/express')();

let request = require('supertest')(express);

describe('#ProdutosController', function(){

	beforeEach((done) => {
		var conn = express.infra.connectionFactory();
		conn.query("delete from livros", (err,results) => {
			if(!err){
				done();
			};
		});
		conn.end();
	});

	it('#Listagem HTML',(done) => {
		request.get('/produtos')
		.set('Accept','text/html')
		.expect('Content-Type',/text\/html/)
		.expect(200,done);
	});

	it('#Listagem JSON',(done) => {
		request.get('/produtos')
		.set('Accept','application/json')
		.expect('Content-Type',/json/)
		.expect(200,done);
	});

	it('#Cadastro de novo produto com dados inválidos', (done) => {
		request.post('/produtos')
		.send({titulo:"",descricao:"novo livro"})
		.expect(400,done);
	});

	it('#Cadastro de novo produto com dados Validos', (done) => {
		request.post('/produtos')
		.send({titulo:"Livro de Angular", preco:39.50,descricao:"novo livro"})
		.expect(302,done);
	});

});



//#Código antigo 
/*var http = 		require('http');
var assert = 	require('assert');

describe('#ProdutosController', function(){
	it('#Listagem JSON',function(done){
		var configuracao = {
			hostname: 'localhost',
			port: 3000,
			path: '/produtos',
			headers:{
				'Accept':'application/json' 
			}
		};
		http.get(configuracao, function(res){
			assert.equal(res.statusCode, 200);	
			assert.equal(res.headers['content-type'], 'application/json; charset=utf-8');
			done();
		});
		
	});

	it('#Validação de Dados',function(){
		console.log('Teste de verificação');
	});
});	 */