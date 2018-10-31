module.exports = (app) => {
	
	let listaProdutos = (req, res, next) => {
		let connection = app.infra.connectionFactory();
		let produtosDAO = new app.infra.ProdutosDAO(connection);
		produtosDAO.lista((err, results) => {
			if(err){
				return next(erros);
			}
			res.format({
				'html': () => {
					res.render("produtos/lista", {lista: results});
				},
				'json': () => {
					res.json(results)
				}
			});
		});

		connection.end();
	};

	app.get('/produtos', listaProdutos);

	app.get('/produtos/form', (req, res) => {
		res.render('produtos/form', {errosValidacao:{}, produto:{}});
	});

	app.post('/produtos', (req,res) => {
		
		let produto = req.body;
		
		req.assert('titulo', 'Titulo é obrigatório').notEmpty();
		req.assert('preco', 'Formato inválido').isFloat();

		let erros = req.validationErrors();
		if(erros){
			res.format({
				'html': () => {
					res.status(400).render('produtos/form', {errosValidacao:erros, produto:produto});
				},
				'json': () => {
					res.status(400).json(erros)
				}
			})

			return;
		}

		let connection = app.infra.connectionFactory();
		let produtosDAO = new app.infra.ProdutosDAO(connection);

		produtosDAO.salva(produto, (err, results) => {
			//listaProdutos(req,res)
			console.log(err);
			res.redirect('/produtos');
		});

		connection.end();
	});
}
