const Account = require('../models/account');

exports.createAccount = async (req, res) => {
  try {
    const { email, accountName, website } = req.body;
    if (!email || !accountName) {
      return res.status(400).json({ error: 'Email and accountName are required' });
    }

    const account = await Account.create(req.app.get('db'), { email, accountName, website });
    res.status(201).json(account);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAccount = async (req, res) => {
  try {
    const account = await Account.findById(req.app.get('db'), req.params.id);
    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }
    res.json(account);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAccount = async (req, res) => {
  try {
    const { email, accountName, website } = req.body;
    if (!email || !accountName) {
      return res.status(400).json({ error: 'Email and accountName are required' });
    }
    const account = await Account.update(req.app.get('db'), req.params.id, { email, accountName, website });
    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }
    res.json(account);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const result = await Account.delete(req.app.get('db'), req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllAccounts = async (req, res) => {
  try {
    const accounts = await Account.findAll(req.app.get('db'));
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};