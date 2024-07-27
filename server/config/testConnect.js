import sequelize from './connect.js';

export default async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log("\nStatus:: Connection established successfully.");
    } catch (error) {
        console.error(`Status:: Failed to connect to database: ${error}`);
        console.log("Status:: Exiting");
        process.exit(1);
    }
}