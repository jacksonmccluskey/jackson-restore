// Copyright © 2024 Jackson McCluskey
// GitHub @jacksonmccluskey [https://github.com/jacksonmccluskey]

import Log from './models';
import config from './config';
import { restoreDocuments } from './restore';

export const queryDocumentsAndRestoreData = async (jacksonTracker: any) => {
	jacksonTracker.isRunning = true;
	jacksonTracker.isReady = false;

	let page = 1;

	while (true) {
		try {
			const queryForTheDocumentsThatWeAreRestoring = {
				[config.status]: 'ERROR',
				[config.route]: { $ne: undefined },
				[config.data]: { $ne: undefined },
			};

			const totalDocumentsInitially = await Log.countDocuments(
				queryForTheDocumentsThatWeAreRestoring
			);

			if (!totalDocumentsInitially) {
				break;
			}

			const { results, totalPages } = await Log.paginate(
				queryForTheDocumentsThatWeAreRestoring,
				{
					page,
					limit: config.limit,
				}
			);

			await restoreDocuments(results);

			if (page >= totalPages) break;

			page++;
		} catch (error) {
			if (config.isScript) console.log(`🟥 ${error.message}`);
		}

		await new Promise((resolve) => setTimeout(resolve, config.interval));
	}

	jacksonTracker.isRunning = false;
	jacksonTracker.isReady = true;

	if (config.isScript) {
		console.log('😜👏 jackson-restore Complete!');
		process.exit(0);
	}
};
