// Copyright © 2024 Jackson McCluskey
// GitHub @jacksonmccluskey [https://github.com/jacksonmccluskey]

const config = {
	cronExpression: '* * * * *',
	env: process.env.ENV,
	scriptInterval: process.env.SCRIPT_INTERVAL
		? parseInt(process.env.SCRIPT_INTERVAL)
		: 300000,
	isProduction: process.env.ENV == 'PRODUCTION',
	isScript: process.env.ENV !== 'PRODUCTION',
	mongoose: {
		urls: process.env.MONGODB_URIs.includes(',')
			? process.env.MONGODB_URIs.split(',')
			: [process.env.MONGODB_URIs],
	},
	collection: process.env.COLLECTION,
	status: process.env.STATUS,
	data: process.env.DATA,
	route: process.env.ROUTE,
	limit: process.env.LIMIT ? parseInt(process.env.LIMIT) : 1,
	apis: process.env.APIs.includes(',')
		? process.env.APIs.split(',')
		: [process.env.APIs],
	authorization: process.env.AUTHORIZATION,
	contentType: process.env.CONTENT_TYPE,
	interval: process.env.INTERVAL ? parseInt(process.env.INTERVAL) : 1000,
};

export default config;
