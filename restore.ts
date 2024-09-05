// Copyright © 2024 Jackson McCluskey
// GitHub @jacksonmccluskey [https://github.com/jacksonmccluskey]

import axios from 'axios';
import config from './config';
import Log from './models';

export const restoreDocuments = async (documents: any[]) => {
	for (const logDocument of documents) {
		try {
			const data = logDocument[config.data];
			const route = logDocument[config.route];

			if (!data || !route) {
				continue;
			}

			console.log('url: ' + config.api + route + `?Environment=${config.env}`);
			console.log('data: ' + JSON.stringify(data));
			console.log(
				'headers: ' +
					JSON.stringify({
						Authorization: config.authorization,
						'Content-Type': config.contentType,
					})
			);

			const response = await axios.post(
				config.api + route + `?Environment=${config.env}`,
				data,
				{
					headers: {
						Authorization: config.authorization,
						'Content-Type': config.contentType,
					},
				}
			);

			if (response.status == 200) {
				await Log.findByIdAndDelete(logDocument._id);
			}
		} catch (error: any) {
			console.log(error?.message);
		}
	}
};
