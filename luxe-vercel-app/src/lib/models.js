import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

// Product Schema
const productSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuidv4,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  image_url: {
    type: String,
    required: true
  },
  model_image_url: {
    type: String,
    required: true
  },
  material_details: {
    material: String,
    gemstones: String,
    weight: String,
    origin: String
  },
  is_featured: {
    type: Boolean,
    default: false
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

// Contact Schema
const contactSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuidv4,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  message: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

// Export models (prevent re-compilation)
export const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);