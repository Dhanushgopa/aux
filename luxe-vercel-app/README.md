# LUXE - Premium Jewelry Website

A luxurious e-commerce website for premium jewelry built with Next.js and Node.js, designed for seamless deployment on Vercel.

## ✨ Features

- **Premium Design**: Sophisticated UI with luxury color palette and smooth animations
- **Product Showcase**: Elegant product cards with hover effects showing models wearing jewelry
- **Product Management**: Full CRUD operations for jewelry products
- **Featured Collections**: Curated selection of premium pieces
- **Contact System**: Professional contact form with database storage
- **Responsive Design**: Perfect experience across all devices
- **MongoDB Integration**: Robust database with UUID-based product management

## 🏗️ Architecture

### Frontend
- **Framework**: Next.js 14 with React 19
- **Styling**: Tailwind CSS with custom luxury theme
- **Fonts**: Playfair Display (luxury serif) + Inter (modern sans-serif)
- **Images**: Optimized Unsplash integration with model photography

### Backend
- **Serverless Functions**: Vercel API routes with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Models**: Product and Contact schemas with UUID primary keys

### Deployment
- **Platform**: Vercel (unified frontend + backend)
- **Database**: MongoDB Atlas (production)
- **CDN**: Automatic Vercel edge caching

## 📁 Project Structure

```
luxe-vercel-app/
├── api/                          # Vercel serverless functions
│   ├── index.js                  # Health check endpoint
│   ├── contact.js                # Contact form handler
│   ├── init-data.js              # Sample data initialization
│   └── products/                 # Product API endpoints
│       ├── index.js              # GET/POST products
│       ├── featured.js           # Featured products
│       └── [id].js               # Individual product operations
├── src/
│   ├── components/               # React components
│   │   ├── Header.js
│   │   ├── Hero.js
│   │   ├── ProductCard.js
│   │   ├── ProductDetailsModal.js
│   │   ├── CategoryFilters.js
│   │   ├── BrandSection.js
│   │   ├── AboutSection.js
│   │   ├── ContactSection.js
│   │   └── LoadingSpinner.js
│   ├── lib/                      # Utility libraries
│   │   ├── mongodb.js            # Database connection
│   │   └── models.js             # Mongoose schemas
│   ├── pages/                    # Next.js pages
│   │   ├── _app.js
│   │   ├── _document.js
│   │   └── index.js              # Main application
│   └── styles/
│       └── globals.css           # Luxury styling
├── package.json
├── next.config.js
├── tailwind.config.js
├── vercel.json
└── .env.example
```

## 🚀 Quick Start

### 1. Clone and Install
```bash
cd luxe-vercel-app
npm install
```

### 2. Environment Setup
```bash
cp .env.example .env.local
```

Edit `.env.local` with your MongoDB connection:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/luxury_jewelry?retryWrites=true&w=majority
NODE_ENV=development
DB_NAME=luxury_jewelry
NEXT_PUBLIC_API_URL=/api
```

### 3. Development
```bash
npm run dev
```

Visit http://localhost:3000

### 4. Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables via Vercel dashboard:
# - MONGODB_URI
# - DB_NAME
```

## 🛍️ Sample Products

The application includes 8 luxury jewelry pieces:

1. **Elegant Diamond Earrings** - $2,500 (Featured)
2. **Premium Gold Ring** - $1,800 (Featured)
3. **Diamond Eternity Ring** - $3,200 (Featured)
4. **Heart Pendant Necklace** - $950
5. **Minimalist Diamond Necklace** - $1,200 (Featured)
6. **Wedding Ring Set** - $2,800 (Featured)
7. **Classic Silver Ring** - $650
8. **Luxury Ring Collection** - $4,500 (Featured)

Each product includes:
- High-quality product photography
- Model images showing jewelry being worn
- Detailed material specifications
- Origin and craftsmanship information

## 🎨 Design System

### Colors
- **Ivory**: #FFFEF7 (Primary background)
- **Beige**: #F5F5DC (Secondary background)
- **Pearl**: #FEFDF0 (Section backgrounds)
- **Champagne**: #F7E7CE (Accents)
- **Gold**: #FFD700 (Primary CTA)
- **Dark Gold**: #B8860B (Text accents)

### Typography
- **Luxury Headers**: Playfair Display (serif)
- **Body Text**: Inter (sans-serif)
- **Weights**: 300, 400, 500, 600, 700

### Interactions
- Smooth hover transitions
- Product image crossfade effects
- Micro-animations on buttons
- Modal overlays with slide-in effects

## 📱 Responsive Design

- **Desktop**: Full-width hero, 3-column product grid
- **Tablet**: 2-column layout, adjusted spacing
- **Mobile**: Single-column, touch-optimized interactions

## 🔌 API Endpoints

### Products
- `GET /api/products` - All products
- `POST /api/products` - Create product
- `GET /api/products/featured` - Featured products only
- `GET /api/products/[id]` - Single product
- `PUT /api/products/[id]` - Update product
- `DELETE /api/products/[id]` - Delete product

### Utility
- `GET /api/` - Health check
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contacts
- `POST /api/init-data` - Initialize sample data

## 🔒 Production Considerations

### Environment Variables
- MongoDB Atlas connection string
- Proper CORS configuration
- Rate limiting (implement if needed)

### Performance
- Image optimization via Next.js
- Static generation for product pages
- CDN caching via Vercel

### Security
- Input validation on all endpoints
- MongoDB injection protection
- XSS protection via React

## 🛠️ Customization

### Adding New Products
1. Use the POST `/api/products` endpoint
2. Include both `image_url` and `model_image_url`
3. Specify `material_details` object
4. Set `is_featured` for homepage display

### Styling Modifications
- Edit `src/styles/globals.css` for global styles
- Modify `tailwind.config.js` for theme extensions
- Component-specific styles in respective files

### Database Schema Extensions
- Modify `src/lib/models.js` for new fields
- Update API endpoints accordingly
- Ensure frontend components handle new data

## 📄 License

Premium License - Commercial use allowed for licensed users.

---

**LUXE** - Where Luxury Meets Technology ✨