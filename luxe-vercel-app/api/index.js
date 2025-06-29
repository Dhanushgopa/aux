import connectDB from '../src/lib/mongodb.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDB();
    
    res.status(200).json({
      message: 'Premium Jewelry API is running',
      mongodb_status: 'connected',
      database: process.env.DB_NAME || 'luxury_jewelry'
    });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({
      message: 'Premium Jewelry API is running',
      mongodb_status: 'disconnected',
      database: process.env.DB_NAME || 'luxury_jewelry',
      error: error.message
    });
  }
}