const dotenv = require('dotenv');

const { app } = require('./app');

// Utils

const { db } = require('./utils/database.util');

dotenv.config({ path: './config.env' });

const startServer = async () => {
	try {
		await db.authenticate();

		// Establish the relations between models


		await db.sync();

		// Set server to listen
		const PORT = 4000;

		app.listen(PORT, () => {
			console.log('Express app ready to the party!');
		});
	} catch (error) {
		console.log(error);
	}
};

startServer();