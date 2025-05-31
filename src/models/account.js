const { generateToken } = require('../utils/tokenGenerator');

class Account {
  static async create(db, accountData) {
    const { email, accountName, website } = accountData;
    const accountId = `ACC_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const appSecretToken = generateToken();

    const query = `
      INSERT INTO accounts (email, accountId, accountName, appSecretToken, website)
      VALUES (?, ?, ?, ?, ?)
    `;

    const result = await db.run(query, [email, accountId, accountName, appSecretToken, website]);
    return { id: result.lastID, email, accountId, accountName, appSecretToken, website };
  }

  static async findById(db, id) {
    return db.get('SELECT * FROM accounts WHERE id = ?', [id]);
  }

  static async findByAccountId(db, accountId) {
    return db.get('SELECT * FROM accounts WHERE accountId = ?', [accountId]);
  }

  static async findByToken(db, token) {
    return db.get('SELECT * FROM accounts WHERE appSecretToken = ?', [token]);
  }

  static async update(db, id, accountData) {
    const { email, accountName, website } = accountData;
    await db.run(
      'UPDATE accounts SET email = ?, accountName = ?, website = ? WHERE id = ?',
      [email, accountName, website, id]
    );
    return this.findById(db, id);
  }

  static async delete(db, id) {
    await db.run('DELETE FROM accounts WHERE id = ?', [id]);
    return { message: 'Account deleted successfully' };
  }

  static async findAll(db) {
    return db.all('SELECT * FROM accounts');
  }
}

module.exports = Account;