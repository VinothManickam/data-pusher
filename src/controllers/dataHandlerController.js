const axios = require('axios');
const Account = require('../models/account');
const Destination = require('../models/destination');

exports.handleIncomingData = async (req, res) => {
  try {
    // Validate JSON content type
    if (!req.is('application/json')) {
      return res.status(400).json({ error: 'Invalid Data' });
    }

    // Validate token
    const token = req.headers['cl-x-token'];
    if (!token) {
      return res.status(401).json({ error: 'Un Authenticate' });
    }

    // Find account by token
    const account = await Account.findByToken(req.app.get('db'), token);
    if (!account) {
      return res.status(401).json({ error: 'Un Authenticate' });
    }

    // Get destinations for account
    const destinations = await Destination.findByAccountId(req.app.get('db'), account.id);

    // Send data to all destinations
    const promises = destinations.map(dest => {
      const config = {
        url: dest.url,
        method: dest.httpMethod,
        headers: dest.headers,
      };

      if (dest.httpMethod.toUpperCase() === 'GET') {
        config.params = req.body;
      } else {
        config.data = req.body;
      }

      return axios(config).catch(error => ({
        error: true,
        destination: dest.url,
        message: error.message,
      }));
    });

    await Promise.all(promises);
    res.json({ message: 'Data processed successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};