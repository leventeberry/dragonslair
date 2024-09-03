import express from 'express';
import {createServer} from 'http';
import cors from 'cors';
import path from 'path';
import seedData from './seed/seed.js';
import { Server } from 'socket.io';
import 'dotenv/config'
import testConnection from './config/testConnect.js';
import sequelize from './config/connect.js';
import routes from './routes/index.js';

//set port number
const PORT = process.env.PORT || 3002;

// Required logic for integrating with Express
const app = express();
const httpServer = createServer(app);

/* SOCKET.IO CONNECTION SETUP */
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5173"]
  }
});

io.on("connection", (socket) => {
  console.log(socket.id);
});


const startServer = async () => {
  try {
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cors());
    app.use(routes);

    if (process.env.NODE_ENV === 'production') {
      console.log("Deployment Status:: Production");
      app.use(express.static(path.join(__dirname, '../client/dist')));

      app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/dist/index.html'));
      });

      await sequelize.sync({ force: true });
      httpServer.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    } else {
      console.log("Deployment Status:: Development");
      console.log("Status:: Attemting Database Connection \n");
      try {
        await testConnection();
        console.log("\nStatus:: Starting Database Sync\n");
        await sequelize.sync({ force: true });
        console.log("Status:: Database Synced");
        await seedData();
      } catch (error) {
        console.error(error);
      }
      console.log("\nStatus:: Starting Server")
      httpServer.listen(PORT, () => {
        console.log(`Status:: Server is running on port ${PORT}`);
      });
    }
  } catch (error) {
    console.error('Server failed to start:', error);
    process.exit(1); // Exit the process with a failure code
  }
};

startServer();