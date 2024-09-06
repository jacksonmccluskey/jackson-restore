// Copyright © 2024 Jackson McCluskey
// GitHub @jacksonmccluskey [https://github.com/jacksonmccluskey]

const config = {
	cronExpression: '* * * * *',
	env: process.env.ENV,
	isProduction: process.env.ENV == 'PRODUCTION',
	isScript: process.env.ENV !== 'PRODUCTION',
	mongoose: {
		url: process.env.MONGODB,
	},
	collection: process.env.COLLECTION,
	status: process.env.STATUS,
	data: process.env.DATA,
	route: process.env.ROUTE,
	limit: process.env.LIMIT ? parseInt(process.env.LIMIT) : 1,
	api: process.env.API,
	authorization: process.env.AUTHORIZATION,
	contentType: process.env.CONTENT_TYPE,
	interval: process.env.INTERVAL ? parseInt(process.env.INTERVAL) : 1000,
};

export default config;
