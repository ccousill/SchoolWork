const mainRoutes = require('./main')
const showRoutes = require('./shows')
const searchRoutes = require('./search')
const popularsearches = require('./popularsearches')

const constructorMethod = (app) => {
	app.use('/', mainRoutes);

	app.use('/shows', showRoutes);

	app.use('/search', searchRoutes);

	app.use('/popularsearches',popularsearches)

	app.use('*',(request,response) => {
		response.status(404).render('shows/error', {error: "Page Does Not Exist"});
	});
};

module.exports = constructorMethod;