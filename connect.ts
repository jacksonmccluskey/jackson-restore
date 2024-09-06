// Copyright © 2024 Jackson McCluskey
// GitHub @jacksonmccluskey [https://github.com/jacksonmccluskey]

require('dotenv').config();

import mongoose from 'mongoose';
import config from './config';
import { queryDocumentsAndRestoreData } from './query';
import cron from 'node-cron';

export interface IJacksonTracker {
	isRunning: boolean;
	isReady: boolean;
}

const jacksonTracker = {
	isRunning: false,
	isReady: true,
};

const connectToMongoAndRestoreData = async () => {
	await mongoose.connect(config.mongoose.url);
	await queryDocumentsAndRestoreData(jacksonTracker);
};

if (config.isProduction) {
	const task = cron.schedule(config.cronExpression, () => {
		if (!jacksonTracker.isRunning && jacksonTracker.isReady) {
			connectToMongoAndRestoreData();
		}
	});

	process.on('SIGINT', () => {
		task.stop();
		process.exit(0);
	});
} else {
	process.on('SIGINT', () => {
		process.exit(0);
	});

	if (!jacksonTracker.isRunning && jacksonTracker.isReady) {
		connectToMongoAndRestoreData();
	}
}
