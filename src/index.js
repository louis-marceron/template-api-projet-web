const http = require('http');

// Empêche le programme de crasher en production, car il n'y pas dotenv
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const app = require('./app'); 
const sequelize = require('./config/database');

// Défini le port où le serveur écoutera les requêtes entrantes
const PORT = process.env.PORT || 3000;

(async () => {
  try {
      await sequelize.authenticate();
      await sequelize.sync();
      console.log('Database connection established and models synced.');

      const server = http.createServer(app);
      server.listen(PORT, () => {
          console.log(`Server is running on port ${PORT}`);
      });
  } catch (error) {
      console.error('Unable to connect to the database or sync models:', error);
  }
})();
