# Premium Jewelry Website

A luxurious e-commerce website for premium jewelry with React frontend and FastAPI backend.

## Features

- **Frontend**: React with elegant, luxury-focused design
- **Backend**: FastAPI with MongoDB for product and contact management
- **Database**: MongoDB for storing products and customer inquiries
- **Design**: Premium UI with sophisticated styling and micro-interactions

## Quick Start

### Prerequisites

- Node.js (>=16.0.0)
- Python (>=3.8.0)
- MongoDB (running on localhost:27017)

### Installation & Setup

1. **Install all dependencies**:
   ```bash
   npm run install-all
   ```

2. **Start both frontend and backend**:
   ```bash
   npm run dev
   ```

This will start:
- Backend API at http://localhost:8000
- Frontend at http://localhost:3000
- MongoDB connection to localhost:27017

### Available Scripts

- `npm run dev` - Start both frontend and backend together
- `npm run install-all` - Install all dependencies (frontend + backend)
- `npm run backend` - Start only the backend server
- `npm run frontend` - Start only the frontend server
- `npm run test` - Run backend tests
- `npm run build` - Build frontend for production
- `npm run clean` - Clean all dependencies and reinstall

## Project Structure

```
premium-jewelry-website/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── App.js           # Main React component
│   │   ├── App.css          # Luxury styling
│   │   └── index.js         # React entry point
│   ├── package.json         # Frontend dependencies
│   └── .env                 # Frontend environment variables
├── backend/                  # FastAPI backend
│   ├── server.py            # Main FastAPI application
│   ├── requirements.txt     # Python dependencies
│   └── .env                 # Backend environment variables
├── package.json             # Root package.json with dev scripts
└── README.md               # This file
```

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/featured` - Get featured products
- `GET /api/products/{id}` - Get single product
- `POST /api/products` - Create new product
- `PUT /api/products/{id}` - Update product
- `DELETE /api/products/{id}` - Delete product

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contacts` - Get all contacts (admin)

### Data Management
- `POST /api/init-data` - Initialize sample jewelry data
- `GET /api/` - Health check and MongoDB status

## Environment Variables

### Frontend (.env)
```
REACT_APP_BACKEND_URL=http://localhost:8000
WDS_SOCKET_PORT=443
```

### Backend (.env)
```
MONGO_URL=mongodb://localhost:27017
DB_NAME=premium_jewelry
```

## MongoDB Setup

The application expects MongoDB to be running on `localhost:27017`. The backend will:
- Automatically connect to MongoDB on startup
- Retry connection with exponential backoff
- Create the database and collections as needed
- Initialize sample jewelry data on first run

## Development

### Frontend Development
The frontend is built with React and features:
- Luxury design with gold accents and elegant typography
- Product showcase with hover effects
- Responsive design for all devices
- Contact form with backend integration

### Backend Development
The backend uses FastAPI and includes:
- RESTful API for product management
- MongoDB integration with Motor (async driver)
- Input validation with Pydantic models
- CORS middleware for frontend communication
- Comprehensive error handling

## Testing

Run the backend test suite:
```bash
npm run test
```

This will test all API endpoints, database operations, and data validation.

## Production Deployment

1. Build the frontend:
   ```bash
   npm run build
   ```

2. Set production environment variables
3. Deploy backend with a production ASGI server
4. Serve frontend static files
5. Configure MongoDB connection for production

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod`
- Check connection URL in `backend/.env`
- Verify MongoDB is accessible on port 27017

### Frontend-Backend Communication
- Verify `REACT_APP_BACKEND_URL` in `frontend/.env`
- Check CORS configuration in backend
- Ensure backend is running on port 8000

### Dependencies
- Run `npm run clean` to reinstall all dependencies
- Ensure Python 3.8+ and Node.js 16+ are installed
- Check that `python3` and `pip` are available in PATH

## License

MIT License - see LICENSE file for details.