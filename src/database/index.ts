import mongoose from 'mongoose';
import {config} from '../config';


mongoose.connect(config.MONGO_DB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Failed to connect to MongoDB', error);
    });
