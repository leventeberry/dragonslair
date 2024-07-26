import { User } from '../models/index.js';
import UserJson from './json/users.json' assert { type: 'json' };
import db from '../config/connect.js';
import syncTables from '../config/sync.js';
import 'dotenv/config';

const seedData = async () => {
    try {
        if (process.env.NODE_ENV === 'production') {
            console.log('Environment In Production Mode')
        } else {
            await syncTables();
            console.log('Database Seeded');
        }
    } catch (error) {
        throw new Error(error);
    }
};

export default seedData;