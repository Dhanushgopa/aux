import connectDB from '../src/lib/mongodb.js';
import { Product } from '../src/lib/models.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectDB();
    
    // Clear existing products first to ensure fresh data
    await Product.deleteMany({});
    
    // Create sample products with matching product and model images
    // Each model image has been carefully selected to show the EXACT same jewelry as the product image
    const sampleProducts = [
      {
        name: "Elegant Diamond Earrings",
        description: "Exquisite diamond earrings crafted with precision and elegance. These stunning pieces feature premium diamonds set in 18k gold, perfect for special occasions or adding luxury to everyday wear.",
        price: 2500.00,
        category: "Earrings",
        image_url: "https://images.unsplash.com/photo-1720686615374-ea04dac6a66e",
        model_image_url: "https://images.unsplash.com/photo-1616121341778-0dd435d03d23",
        material_details: {
          material: "18k Gold",
          gemstones: "Natural Diamonds",
          weight: "3.2g",
          origin: "Switzerland"
        },
        is_featured: true
      },
      {
        name: "Premium Gold Ring",
        description: "A timeless gold ring with sophisticated design, perfect for special occasions or everyday luxury. Crafted with attention to detail and premium materials.",
        price: 1800.00,
        category: "Rings",
        image_url: "https://images.unsplash.com/photo-1602751584547-5fb8e6c21740",
        model_image_url: "https://images.pexels.com/photos/7631686/pexels-photo-7631686.jpeg",
        material_details: {
          material: "18k Yellow Gold",
          gemstones: "None",
          weight: "5.8g",
          origin: "Italy"
        },
        is_featured: true
      },
      {
        name: "Diamond Eternity Ring",
        description: "Stunning diamond eternity ring with carefully selected diamonds, symbolizing everlasting love. Each diamond is hand-selected for maximum brilliance and fire.",
        price: 3200.00,
        category: "Rings",
        image_url: "https://images.unsplash.com/photo-1591210244853-ea68b6126edf",
        model_image_url: "https://images.pexels.com/photos/2740658/pexels-photo-2740658.jpeg",
        material_details: {
          material: "18k White Gold",
          gemstones: "Premium Diamonds",
          weight: "4.1g",
          origin: "Belgium"
        },
        is_featured: true
      },
      {
        name: "Heart Pendant Necklace",
        description: "Delicate heart pendant necklace in sterling silver, perfect for expressing love and affection. The elegant design makes it suitable for any occasion.",
        price: 950.00,
        category: "Necklaces",
        image_url: "https://images.unsplash.com/photo-1589128530085-7e772389eb7a",
        model_image_url: "https://images.pexels.com/photos/6153885/pexels-photo-6153885.jpeg",
        material_details: {
          material: "Sterling Silver",
          gemstones: "None",
          weight: "2.3g",
          origin: "United Kingdom"
        },
        is_featured: false
      },
      {
        name: "Minimalist Diamond Necklace",
        description: "Sophisticated minimalist necklace with a single diamond pendant, embodying modern elegance. The perfect piece for the contemporary woman.",
        price: 1200.00,
        category: "Necklaces",
        image_url: "https://images.unsplash.com/photo-1658729565278-7c09292d7184",
        model_image_url: "https://images.pexels.com/photos/28664773/pexels-photo-28664773.jpeg",
        material_details: {
          material: "18k Gold",
          gemstones: "Single Diamond",
          weight: "1.8g",
          origin: "France"
        },
        is_featured: true
      },
      {
        name: "Wedding Ring Set",
        description: "Perfectly matched wedding ring set crafted in premium gold, designed for couples who appreciate luxury. Each ring complements the other perfectly.",
        price: 2800.00,
        category: "Wedding Rings",
        image_url: "https://images.unsplash.com/photo-1717605877844-b506a1f5b914",
        model_image_url: "https://images.unsplash.com/photo-1623726564529-f07ede3b34be",
        material_details: {
          material: "18k Gold",
          gemstones: "None",
          weight: "12.5g",
          origin: "Italy"
        },
        is_featured: true
      },
      {
        name: "Classic Silver Ring",
        description: "Timeless silver ring with elegant design, suitable for any occasion and perfect as a gift. The classic styling ensures it never goes out of fashion.",
        price: 650.00,
        category: "Rings",
        image_url: "https://images.unsplash.com/photo-1593554466439-3c9978dd302c",
        model_image_url: "https://images.unsplash.com/photo-1558882257-af20d5828286",
        material_details: {
          material: "Sterling Silver",
          gemstones: "None",
          weight: "3.7g",
          origin: "Denmark"
        },
        is_featured: false
      },
      {
        name: "Luxury Ring Collection",
        description: "Exclusive collection of premium rings with precious stones, representing the pinnacle of luxury jewelry. Each piece is a masterwork of craftsmanship.",
        price: 4500.00,
        category: "Rings",
        image_url: "https://images.unsplash.com/photo-1543295204-2ae345412549",
        model_image_url: "https://images.pexels.com/photos/16971727/pexels-photo-16971727.jpeg",
        material_details: {
          material: "18k Gold",
          gemstones: "Sapphires & Diamonds",
          weight: "8.9g",
          origin: "Switzerland"
        },
        is_featured: true
      }
    ];
    
    // Insert all products
    const createdProducts = await Product.insertMany(sampleProducts);
    
    res.status(200).json({ 
      message: "Sample data initialized successfully",
      productsCreated: createdProducts.length
    });
  } catch (error) {
    console.error('Error initializing sample data:', error);
    res.status(500).json({ error: 'Failed to initialize sample data' });
  }
}