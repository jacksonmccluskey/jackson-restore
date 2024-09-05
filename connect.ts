// Copyright © 2024 Jackson McCluskey
// GitHub @jacksonmccluskey [https://github.com/jacksonmccluskey]

require('dotenv').config();
import mongoose from 'mongoose';
import config from './config';
import { queryDocumentsAndRestoreData } from './query';
import cron from 'node-cron';

const connectToMongoAndRestoreData = async () => {
	try {
		await mongoose.connect(config.mongoose.url).then(async () => {
			await queryDocumentsAndRestoreData();
		});
	} catch {}
};

const task = cron.schedule('* * * * *', async () => {
	await connectToMongoAndRestoreData();
});

process.on('SIGINT', () => {
	task.stop();
	process.exit(0);
});
