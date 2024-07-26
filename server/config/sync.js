import sequelize from './connect.js';

export default async function syncTables() {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ force: true });
        console.log("Connection established successfully. All models synchronized.");
    } catch (error) {
        console.error('Failed to synchronize models:', error);
    }
}