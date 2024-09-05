// Copyright © 2024 Jackson McCluskey
// GitHub @jacksonmccluskey [https://github.com/jacksonmccluskey]

const config = {
	env: process.env.ENV,
	mongoose: {
		url: process.env.MONGODB,
	},
	collection: process.env.COLLECTION,
	data: process.env.DATA,
	route: process.env.ROUTE,
	limit: process.env.LIMIT ? parseInt(process.env.LIMIT) : 1,
	api: process.env.API,
	authorization: process.env.AUTHORIZATION,
	contentType: process.env.CONTENT_TYPE,
};

export default config;
