import 'dotenv/config';
import seedUsers from './userData.js';

const seedData = async () => {
    try {
        if (process.env.NODE_ENV === 'production') {
            console.log("Status:: Environment In Production Mode | No Seed Data Available")
        } else {
            await seedUsers();
            console.log("Status:: Database Seeded");
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export default seedData;