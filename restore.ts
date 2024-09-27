// Copyright © 2024 Jackson McCluskey
// GitHub @jacksonmccluskey [https://github.com/jacksonmccluskey]

import axios from 'axios';
import config from './config';
import Log from './models';

export const restoreDocuments = async ({
	documents,
}: {
	documents: any[];
}): Promise<void> => {
	for (const document of documents) {
		try {
			const data = document[config.data];
			const route = document[config.route];

			if (data === undefined || route === undefined) {
				if (config.isScript)
					console.log(
						`🟨 Skipping Document *data*: ${JSON.stringify(data).substring(
							0,
							24
						)} route: ${route}`
					);
				continue;
			}

			const currentAPI =
				config.apis[Math.floor(Math.random() * config.apis.length)];

			const currentURL =
				currentAPI + route + `?Environment=${config.env},Restore=true`;

			if (config.isScript)
				console.log(`🚀 Attempting To Restore Document To ${currentURL}...`);

			const response = await axios.post(currentURL, data, {
				headers: {
					Authorization: config.authorization,
					'Content-Type': config.contentType,
				},
			});

			if (response.status == 200) {
				await Log.findByIdAndDelete(document._id);
				console.log(`✅ Restored Document #${document._id}`);
			}
		} catch (error) {
			if (config.isScript) console.log('🟥 ' + error.message);
		}
	}
};
