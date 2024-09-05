const config = {
	mongoose: {
		url: process.env.MONGODB,
	},
	collection: process.env.COLLECTION,
	data: process.env.DATA,
	limit: process.env.LIMIT ? parseInt(process.env.LIMIT) : 1,
	api: process.env.API,
};

export default config;
