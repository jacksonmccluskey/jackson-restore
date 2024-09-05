import axios from 'axios';
import path from 'path';
import config from './config';
import Log from './models';

export const restoreDocuments = async (documents: any[]) => {
	for (const logDocument of documents) {
		console.log(JSON.stringify(logDocument));

		try {
			if (!logDocument[config.data]) {
				continue;
			}

			// const response = await axios.post(
			// 	path.join(config.api, logDocument.url),
			// 	logDocument[config.data]
			// );

			const response = {
				status: 200,
			};

			if (response.status != 200) {
				continue;
			}

			await axios.put(path.join(config.api, '/jackson/log'), {
				status: 'SUCCESS',
			});

			await await Log.findByIdAndUpdate(logDocument._id, { status: 'SUCCESS' });
		} catch {}
	}
};
