import connectDB from '../../src/lib/mongodb.js';
import { Product } from '../../src/lib/models.js';

export default async function handler(req, res) {
  const { id } = req.query;
  await connectDB();

  switch (req.method) {
    case 'GET':
      try {
        const product = await Product.findOne({ id });
        if (!product) {
          return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(product);
      } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ error: 'Failed to fetch product' });
      }
      break;

    case 'PUT':
      try {
        const existingProduct = await Product.findOne({ id });
        if (!existingProduct) {
          return res.status(404).json({ error: 'Product not found' });
        }

        const updateData = req.body;
        
        // Validate model image if both image URLs are being updated
        if (updateData.image_url && updateData.model_image_url) {
          if (!await validateModelImage(updateData.image_url, updateData.model_image_url)) {
            return res.status(400).json({
              error: 'The model image must show the same jewelry as the product image. Please ensure consistency.'
            });
          }
        }
        // If only model_image_url is being updated, validate against existing product image
        else if (updateData.model_image_url) {
          if (!await validateModelImage(existingProduct.image_url, updateData.model_image_url)) {
            return res.status(400).json({
              error: 'The model image must show the same jewelry as the product image. Please ensure consistency.'
            });
          }
        }
        // If only image_url is being updated, validate against existing model image
        else if (updateData.image_url) {
          if (!await validateModelImage(updateData.image_url, existingProduct.model_image_url)) {
            return res.status(400).json({
              error: 'The model image must show the same jewelry as the product image. Please ensure consistency.'
            });
          }
        }

        const updatedProduct = await Product.findOneAndUpdate(
          { id },
          updateData,
          { new: true, runValidators: true }
        );

        res.status(200).json(updatedProduct);
      } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Failed to update product' });
      }
      break;

    case 'DELETE':
      try {
        const deletedProduct = await Product.findOneAndDelete({ id });
        if (!deletedProduct) {
          return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
      } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Failed to delete product' });
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
  console.log(`Validating jewelry match between product image: ${productImageUrl} and model image: ${modelImageUrl}`);
  
  return true;
}