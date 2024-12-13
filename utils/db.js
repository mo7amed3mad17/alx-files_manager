import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || '27017';
    const database = process.env.DB_DATABASE || 'files_manager';

    const url = `mongodb://${host}:${port}`;
    this.client = new MongoClient(url, { useUnifiedTopology: true });
    this.dbName = database;

    this.client.connect().catch((err) => {
      console.error('Failed to connect to MongoDB:', err);
    });
  }

  isAlive() {
    return this.client && this.client.topology && this.client.topology.isConnected();
  }

  async nbUsers() {
    try {
      const db = this.client.db(this.dbName);
      const usersCollection = db.collection('users');
      return await usersCollection.countDocuments();
    } catch (err) {
      console.error('Error fetching user count:', err);
      return 0;
    }
  }

  async nbFiles() {
    try {
      const db = this.client.db(this.dbName);
      const filesCollection = db.collection('files');
      return await filesCollection.countDocuments();
    } catch (err) {
      console.error('Error fetching file count:', err);
      return 0;
    }
  }
}

const dbClient = new DBClient();
export default dbClient;
