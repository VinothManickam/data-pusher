const Destination = require('../models/destination');
const Account = require('../models/account');

exports.createDestination = async (req, res) => {
  try {
    const { accountId, url, httpMethod, headers } = req.body;
    if (!accountId || !url || !httpMethod || !headers) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const account = await Account.findById(req.app.get('db'), accountId);
    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }

    const destination = await Destination.create(req.app.get('db'), {
      accountId,
      url,
      httpMethod,
      headers,
    });
    res.status(201).json(destination);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDestinationsByAccountId = async (req, res) => {
  try {
    const { accountId } = req.params;
    const account = await Account.findById(req.app.get('db'), accountId);
    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }
    const destinations = await Destination.findByAccountId(req.app.get('db'), accountId);
    res.json(destinations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDestination = async (req, res) => {
  try {
    const destination = await Destination.findById(req.app.get('db'), req.params.id);
    if (!destination) {
      return res.status(404).json({ error: 'Destination not found' });
    }
    res.json(destination);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDestination = async (req, res) => {
  try {
    const { url, httpMethod, headers } = req.body;
    if (!url || !httpMethod || !headers) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const destination = await Destination.update(req.app.get('db'), req.params.id, {
      url,
      httpMethod,
      headers,
    });
    if (!destination) {
      return res.status(404).json({ error: 'Destination not found' });
    }
    res.json(destination);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteDestination = async (req, res) => {
  try {
    const result = await Destination.delete(req.app.get('db'), req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};