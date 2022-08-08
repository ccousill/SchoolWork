const mainRoutes = require('./main')
const showRoutes = require('./shows')
const searchRoutes = require('./search')

const constructorMethod = (app) => {
	app.use('/', mainRoutes);

	app.use('/shows', showRoutes);

	app.use('/search', searchRoutes);

	app.use('*',(req,res) => {
		res.status(404).json({error:'Not found'})
	});
};

module.exports = constructorMethod;