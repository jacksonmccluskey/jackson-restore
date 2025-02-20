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
			const attempts = document[config.attempts];
			const passingStatusCodes = config.passingStatusCodes.map(
				(passingStatusCode) => parseInt(passingStatusCode)
			);

			if (data === undefined || route === undefined || attempts > 3) {
				if (config.isScript)
					console.log(
						`🟨 Skipping Document *data*: ${JSON.stringify(data).substring(
							0,
							24
						)} route: ${route} attempts: ${attempts}`
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

			if (passingStatusCodes.includes(response.status)) {
				await Log.findByIdAndDelete(document._id);
				if (config.isScript)
					console.log(`✅ Restored Document #${document._id}`);
			} else {
				await Log.findByIdAndUpdate(
					document._id,
					{ $inc: { attempts: 1 } },
					{ new: true }
				);
			}
		} catch (error) {
			if (error.response && error.response.status === 404) {
				await Log.findByIdAndDelete(document._id);
				if (config.isScript)
					console.log(`🔍 Deleted Document Not Found ${document._id}`);
			} else {
				if (config.isScript) console.log('🟥 ' + error.message);
				await Log.findByIdAndUpdate(
					document._id,
					{ $inc: { attempts: 1 } },
					{ new: true }
				);
			}
		}
	}
};
