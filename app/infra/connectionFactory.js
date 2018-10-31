let mysql = require('mysql');

console.log("Carregando as configurações de conexão com o BD");
function createDBConnection(){
	if(!process.env.NODE_ENV){
		return mysql.createConnection({
				host:'localhost',
				user:'root',
				password: 'mysqlsenha',
				database: 'casadocodigo_nodejs'
		});			
	}

	if(process.env.NODE_ENV == 'test'){
		return mysql.createConnection({
				host:'localhost',
				user:'root',
				password: 'mysqlsenha',
				database: 'casadocodigo_nodejs_test'
		});	
	}
} 

//wrapper
module.exports = function(){
	return createDBConnection;
}