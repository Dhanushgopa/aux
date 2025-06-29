import connectDB from '../../src/lib/mongodb.js';
import { Product } from '../../src/lib/models.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectDB();
    const featuredProducts = await Product.find({ is_featured: true }).sort({ created_at: -1 });
    res.status(200).json(featuredProducts);
  } catch (error) {
    console.error('Error fetching featured products:', error);
    res.status(500).json({ error: 'Failed to fetch featured products' });
  }
}