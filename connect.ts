// Copyright © 2024 Jackson McCluskey
// GitHub @jacksonmccluskey [https://github.com/jacksonmccluskey]

require('dotenv').config();

import mongoose from 'mongoose';
import config from './config';
import { queryDocumentsAndRestoreData } from './query';

export interface IJacksonTracker {
	isRunning: boolean;
	isReady: boolean;
}

const jacksonTracker: IJacksonTracker = {
	isRunning: false,
	isReady: true,
};

const mongoURIs = config.mongoose.urls;

const connectToMongoAndRestoreData = async (mongoURI: string) => {
	console.log(`Connecting To Mongo URI: ${mongoURI}`);
	await mongoose.connect(mongoURI);

	try {
		await queryDocumentsAndRestoreData({ jacksonTracker });
	} catch (error) {
		if (config.isScript)
			console.log(`🟥 Error Processing URI ${mongoURI}: ${error?.message}`);
	} finally {
		await mongoose.disconnect();
	}
};

const runTask = async () => {
	if (!jacksonTracker.isRunning && jacksonTracker.isReady) {
		jacksonTracker.isRunning = true;

		for (const mongoURI of mongoURIs) {
			try {
				await connectToMongoAndRestoreData(mongoURI);
			} catch (error) {
				if (config.isScript)
					console.log(`🟥 Error During Task Execution: ${error?.message}`);
			}
		}

		jacksonTracker.isRunning = false;

		setTimeout(runTask, config.scriptInterval);
	}
};

runTask();

process.on('SIGINT', () => {
	process.exit(0);
});
