import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const url = `mongodb://${host}:${port}`;

    this.client = new MongoClient(url, { useUnifiedTopology: true });
    this.db = null;

    // Connecting MongoClient
    this.client.connect()
      .then(() => {
        this.db = this.client.db(database);
        console.log('Connected successfully to MongoDB server');
      })
      .catch((err) => {
        console.error('MongoDB connection error:', err);
      });
  }

  isAlive() {
    return this.db !== null;
  }

  async nbUsers() {
    if (!this.db) return 0;
    return this.db.collection('users').countDocuments();
  }

  async nbFiles() {
    if (!this.db) return 0;
    return this.db.collection('files').countDocuments();
  }
}

const dbClient = new DBClient();
export default dbClient;

