class Destination {
  static async create(db, destinationData) {
    const { accountId, url, httpMethod, headers } = destinationData;
    const query = `
      INSERT INTO destinations (accountId, url, httpMethod, headers)
      VALUES (?, ?, ?, ?)
    `;
    const result = await db.run(query, [accountId, url, httpMethod.toUpperCase(), JSON.stringify(headers)]);
    return { id: result.lastID, accountId, url, httpMethod, headers };
  }

  static async findById(db, id) {
    const destination = await db.get('SELECT * FROM destinations WHERE id = ?', [id]);
    if (destination) {
      destination.headers = JSON.parse(destination.headers);
    }
    return destination;
  }

  static async findByAccountId(db, accountId) {
    const destinations = await db.all('SELECT * FROM destinations WHERE accountId = ?', [accountId]);
    return destinations.map(dest => ({
      ...dest,
      headers: JSON.parse(dest.headers),
    }));
  }

  static async update(db, id, destinationData) {
    const { url, httpMethod, headers } = destinationData;
    await db.run(
      'UPDATE destinations SET url = ?, httpMethod = ?, headers = ? WHERE id = ?',
      [url, httpMethod.toUpperCase(), JSON.stringify(headers), id]
    );
    return this.findById(db, id);
  }

  static async delete(db, id) {
    await db.run('DELETE FROM destinations WHERE id = ?', [id]);
    return { message: 'Destination deleted successfully' };
  }
}

module.exports = Destination;