module.exports = (app) => {
	app.get("/promocoes/form", (req,res) => {
		let connection = app.infra.connectionFactory();
		let produtosDAO = new app.infra.ProdutosDAO(connection);
		produtosDAO.lista((erros,resultados) => {
			res.render('promocoes/form',{lista:resultados});
		});
		connection.end();
	});

	app.post("/promocoes", (req,res) => {
		let promocao = req.body;
		console.log(promocao);
		app.get('io').emit('novaPromocao', promocao);
		res.redirect('promocoes/form');
	});
};