const pokemon = require('./pokemon')
const constructorMethod = (app) => {
	app.use('/pokemon', pokemon);

	app.use('*',(req,res) => {
		res.status(404).json({error:'Page Error'})
	});
};

module.exports = constructorMethod;