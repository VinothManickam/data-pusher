// Optional middleware for additional validation if needed
exports.validateAccount = (req, res, next) => {
  const { email, accountName } = req.body;
  if (req.method !== 'GET' && (!email || !accountName)) {
    return res.status(400).json({ error: 'Email and accountName are required' });
  }
  next();
};

exports.validateDestination = (req, res, next) => {
  const { accountId, url, httpMethod, headers } = req.body;
  if (req.method !== 'GET' && (!accountId || !url || !httpMethod || !headers)) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  next();
};