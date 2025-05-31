const express = require('express');
const initializeDB = require('./config/database');
const accountRoutes = require('./routes/accountRoutes');
const destinationRoutes = require('./routes/destinationRoutes');
const dataHandlerRoutes = require('./routes/dataHandlerRoutes');

const app = express();

app.use(express.json());

// Initialize database
(async () => {
  const db = await initializeDB();
  app.set('db', db);
})();

app.use('/api/accounts', accountRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/server', dataHandlerRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});