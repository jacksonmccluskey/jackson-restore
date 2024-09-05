// Copyright © 2024 Jackson McCluskey
// GitHub @jacksonmccluskey [https://github.com/jacksonmccluskey]

import Log from './models';
import config from './config';
import { restoreDocuments } from './restore';

export const queryDocumentsAndRestoreData = async () => {
	let hasMoreDocuments = true;

	while (hasMoreDocuments) {
		try {
			const logDocuments = await Log.find({ status: 'ERROR' }).limit(
				config.limit
			);

			if (!logDocuments.length) {
				hasMoreDocuments = false;
				break;
			}

			await restoreDocuments(logDocuments);

			if (logDocuments.length < config.limit) {
				hasMoreDocuments = false;
			}
		} catch {
			hasMoreDocuments = false;
			break;
		}

		await new Promise((resolve) => setTimeout(resolve, 1000));
	}
};
