import mongoose from 'mongoose';
import {config} from '../config';
import logger from '../util/beautyLog';


mongoose.connect(config.MONGO_DB_URI)
    .then(() => {
       logger.info('Connected to MongoDB');
    })
    .catch((error) => {
        logger.error('Failed to connect to MongoDB', error);
    });
