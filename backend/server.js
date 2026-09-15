import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { query } from './db.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/health', async (req, res) => {
  try {
    const dbResult = await query('SELECT NOW()');
    res.status(200).json({
      status: 'healthy',
      database: 'connected',
      time: dbResult.rows[0].now,
      environment: process.env.NODE_ENV || 'development'
    });
  } catch (error) {
    console.error('Health check database error:', error);
    res.status(503).json({
      status: 'unhealthy',
      database: 'disconnected',
      error: error.message
    });
  }
});

app.listen(port, () => {
  console.log(`Easy Code backend listening on port ${port}`);
});
