import connectDB from '../../src/lib/mongodb.js';
import { Product } from '../../src/lib/models.js';

export default async function handler(req, res) {
  await connectDB();

  switch (req.method) {
    case 'GET':
      try {
        const products = await Product.find({}).sort({ created_at: -1 });
        res.status(200).json(products);
      } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
      }
      break;

    case 'POST':
      try {
        const { name, description, price, category, image_url, model_image_url, material_details, is_featured } = req.body;
        
        // Validate required fields
        if (!name || !description || !price || !category || !image_url || !model_image_url) {
          return res.status(400).json({ error: 'Missing required fields' });
        }

        // Validate model image (basic validation)
        if (!await validateModelImage(image_url, model_image_url)) {
          return res.status(400).json({ 
            error: 'The model image must show the same jewelry as the product image. Please ensure consistency.' 
          });
        }

        const product = new Product({
          name,
          description,
          price,
          category,
          image_url,
          model_image_url,
          material_details: material_details || {},
          is_featured: is_featured || false
        });

        await product.save();
        res.status(201).json(product);
      } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Failed to create product' });
      }
      break;

    default:
      res.status(405).json({ error: 'Method not allowed' });
  }
}

// Helper function to validate model images
async function validateModelImage(productImageUrl, modelImageUrl) {
  // Basic validation to ensure both URLs are provided
  if (!productImageUrl || !modelImageUrl) {
    return false;
  }
  
  // TODO: Implement AI-based image recognition for jewelry matching
  // In a production environment, this function would:
  // 1. Download both images
  // 2. Use computer vision AI to detect jewelry items in both images
  // 3. Compare features of the jewelry to ensure they match
  // 4. Return True only if the same jewelry item is detected in both images
  
  // For demonstration purposes, we'll log that validation was attempted
  console.log(`Validating jewelry match between product image: ${productImageUrl} and model image: ${modelImageUrl}`);
  
  // For now, we'll return true if both URLs are provided
  // In a real implementation, this would be replaced with actual image comparison logic
  return true;
}