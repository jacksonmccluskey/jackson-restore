// Copyright © 2024 Jackson McCluskey
// GitHub @jacksonmccluskey [https://github.com/jacksonmccluskey]

require('dotenv').config();
import mongoose from 'mongoose';
import config from './config';
import { queryDocumentsAndRestoreData } from './query';

const connectToMongoAndRestoreData = () => {
	try {
		mongoose.connect(config.mongoose.url).then(async () => {
			await queryDocumentsAndRestoreData();
		});
	} catch {}
};

connectToMongoAndRestoreData();
