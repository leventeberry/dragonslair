import express from 'express';
import { expressMiddleware } from '@apollo/server/express4'
import http from 'http';
import cors from 'cors';
import path from 'path';
import db from './config/connect.js';
import seedData from './seeders/seed.js';
import { Server } from 'socket.io';
import 'dotenv/config';

//set port number
const PORT = process.env.PORT || 3002;

// Required logic for integrating with Express
const app = express();

// Our httpServer handles incoming requests to our Express app.
// Below, we tell Apollo Server to "drain" this httpServer,
// enabling our servers to shut down gracefully.
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5173"]
  }
});

io.on("connection", (socket) => {
  console.log(socket.id);
});


db.on('open', async () => {
  try {
    app.use(express.urlencoded({ extended: false }));

    app.use(
      '/graphql',
      cors(),
      express.json(),
      expressMiddleware(server, { context: async ({ req }) => ({ token: req.headers.token }) })
    );

    if (process.env.NODE_ENV === 'production') {
      console.log("Deployment Status: Production")
      app.use(express.static(path.join(__dirname, '../client/dist')));

      app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/dist/index.html'));
      });

      await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
    } else {
      //seed the database with base data
      await seedData();
      console.log("Deployment Status: Develompent");
      await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
      console.log(`Server running on http://localhost:${PORT}/`);
    }
  } catch (error) {
    console.error('Server failed to start:', error);
  }
});