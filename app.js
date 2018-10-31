let app = require('./config/express')();
let http = require('http').Server(app)
let io = require('socket.io')(http);
//var produtos = require("./app/routes/rotasProdutos")(app);
let ip = "localhost";
let porta = 3000;

app.set('io', io);

http.listen(porta, (req, res) => {
	console.log("Servidor Rodando na porta: " + porta)
});