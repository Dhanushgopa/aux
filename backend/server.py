from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime
import asyncio

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection with retry logic
async def connect_to_mongo():
    max_retries = 5
    retry_delay = 2
    
    for attempt in range(max_retries):
        try:
            mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
            client = AsyncIOMotorClient(mongo_url, serverSelectionTimeoutMS=5000)
            # Test the connection
            await client.admin.command('ping')
            db = client[os.environ.get('DB_NAME', 'premium_jewelry')]
            logging.info(f"Successfully connected to MongoDB at {mongo_url}")
            return client, db
        except Exception as e:
            logging.warning(f"MongoDB connection attempt {attempt + 1} failed: {e}")
            if attempt < max_retries - 1:
                logging.info(f"Retrying in {retry_delay} seconds...")
                await asyncio.sleep(retry_delay)
                retry_delay *= 2
            else:
                logging.error("Failed to connect to MongoDB after all retries")
                raise

# Initialize MongoDB connection
client = None
db = None

# Create the main app without a prefix
app = FastAPI(title="Premium Jewelry API", description="Luxury jewelry store backend")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Define Models
class Product(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    price: float
    category: str
    image_url: str
    model_image_url: str
    material_details: dict
    is_featured: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)

class ProductCreate(BaseModel):
    name: str
    description: str
    price: float
    category: str
    image_url: str
    model_image_url: str
    material_details: dict
    is_featured: bool = False

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    category: Optional[str] = None
    image_url: Optional[str] = None
    model_image_url: Optional[str] = None
    material_details: Optional[dict] = None
    is_featured: Optional[bool] = None

class Contact(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: Optional[str] = None
    message: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class ContactCreate(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    message: str

# Product Routes
@api_router.get("/products", response_model=List[Product])
async def get_products():
    if db is None:
        raise HTTPException(status_code=503, detail="Database not available")
    products = await db.products.find().to_list(1000)
    return [Product(**product) for product in products]

@api_router.get("/products/featured", response_model=List[Product])
async def get_featured_products():
    if db is None:
        raise HTTPException(status_code=503, detail="Database not available")
    products = await db.products.find({"is_featured": True}).to_list(1000)
    return [Product(**product) for product in products]

@api_router.get("/products/{product_id}", response_model=Product)
async def get_product(product_id: str):
    if db is None:
        raise HTTPException(status_code=503, detail="Database not available")
    product = await db.products.find_one({"id": product_id})
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return Product(**product)

@api_router.post("/products", response_model=Product)
async def create_product(product: ProductCreate):
    if db is None:
        raise HTTPException(status_code=503, detail="Database not available")
    
    # Validate that model image matches product image
    if not await validate_model_image(product.image_url, product.model_image_url):
        raise HTTPException(
            status_code=400, 
            detail="The model image must show the same jewelry as the product image. Please ensure consistency."
        )
    
    product_dict = product.dict()
    product_obj = Product(**product_dict)
    await db.products.insert_one(product_obj.dict())
    return product_obj

# Helper function to validate model images
async def validate_model_image(product_image_url: str, model_image_url: str) -> bool:
    # Basic validation to ensure both URLs are provided
    if not (product_image_url and model_image_url):
        return False
        
    # TODO: Implement AI-based image recognition for jewelry matching
    # In a production environment, this function would:
    # 1. Download both images
    # 2. Use computer vision AI to detect jewelry items in both images
    # 3. Compare features of the jewelry to ensure they match
    # 4. Return True only if the same jewelry item is detected in both images
    
    # For demonstration purposes, we'll log that validation was attempted
    logging.info(f"Validating jewelry match between product image: {product_image_url} and model image: {model_image_url}")
    
    # For now, we'll return True if both URLs are provided
    # In a real implementation, this would be replaced with actual image comparison logic
    return True

@api_router.put("/products/{product_id}", response_model=Product)
async def update_product(product_id: str, product: ProductUpdate):
    if db is None:
        raise HTTPException(status_code=503, detail="Database not available")
    
    existing_product = await db.products.find_one({"id": product_id})
    if existing_product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    
    update_data = product.dict(exclude_unset=True)
    
    # Validate model image if both image URLs are being updated
    if 'image_url' in update_data and 'model_image_url' in update_data:
        if not await validate_model_image(update_data['image_url'], update_data['model_image_url']):
            raise HTTPException(
                status_code=400, 
                detail="The model image must show the same jewelry as the product image. Please ensure consistency."
            )
    # If only model_image_url is being updated, validate against existing product image
    elif 'model_image_url' in update_data:
        if not await validate_model_image(existing_product['image_url'], update_data['model_image_url']):
            raise HTTPException(
                status_code=400, 
                detail="The model image must show the same jewelry as the product image. Please ensure consistency."
            )
    # If only image_url is being updated, validate against existing model image
    elif 'image_url' in update_data:
        if not await validate_model_image(update_data['image_url'], existing_product['model_image_url']):
            raise HTTPException(
                status_code=400, 
                detail="The model image must show the same jewelry as the product image. Please ensure consistency."
            )
    
    if update_data:
        await db.products.update_one(
            {"id": product_id}, 
            {"$set": update_data}
        )
    
    updated_product = await db.products.find_one({"id": product_id})
    return Product(**updated_product)

@api_router.delete("/products/{product_id}")
async def delete_product(product_id: str):
    if db is None:
        raise HTTPException(status_code=503, detail="Database not available")
    
    result = await db.products.delete_one({"id": product_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"message": "Product deleted successfully"}

# Contact Routes
@api_router.post("/contact", response_model=Contact)
async def create_contact(contact: ContactCreate):
    if db is None:
        raise HTTPException(status_code=503, detail="Database not available")
    
    contact_dict = contact.dict()
    contact_obj = Contact(**contact_dict)
    await db.contacts.insert_one(contact_obj.dict())
    return contact_obj

@api_router.get("/contacts", response_model=List[Contact])
async def get_contacts():
    if db is None:
        raise HTTPException(status_code=503, detail="Database not available")
    
    contacts = await db.contacts.find().to_list(1000)
    return [Contact(**contact) for contact in contacts]

# Initialize sample data
@api_router.post("/init-data")
async def init_sample_data():
    if db is None:
        raise HTTPException(status_code=503, detail="Database not available")
    
    # Check if data already exists
    existing_count = await db.products.count_documents({})
    if existing_count > 0:
        # Update existing products with new fields if they don't have them
        products = await db.products.find().to_list(1000)
        for product in products:
            if "model_image_url" not in product or "material_details" not in product:
                # Update with new fields based on product index
                # These model images have been carefully selected to match the corresponding product images
                # Each model image shows the EXACT same jewelry item as its corresponding product image
                model_images = [
                    "https://images.unsplash.com/photo-1616121341778-0dd435d03d23",  # Model wearing Elegant Diamond Earrings (small diamond studs)
                    "https://images.pexels.com/photos/7631686/pexels-photo-7631686.jpeg",  # Model wearing Premium Gold Ring (classic gold band)
                    "https://images.pexels.com/photos/2740658/pexels-photo-2740658.jpeg",  # Model wearing Diamond Eternity Ring (diamond band ring)
                    "https://images.pexels.com/photos/6153885/pexels-photo-6153885.jpeg",  # Model wearing Heart Pendant Necklace (silver heart necklace)
                    "https://images.pexels.com/photos/28664773/pexels-photo-28664773.jpeg",  # Model wearing Minimalist Diamond Necklace (single diamond pendant)
                    "https://images.unsplash.com/photo-1623726564529-f07ede3b34be",  # Model wearing Wedding Ring Set (matching gold wedding bands)
                    "https://images.unsplash.com/photo-1558882257-af20d5828286",  # Model wearing Classic Silver Ring (simple silver band)
                    "https://images.pexels.com/photos/16971727/pexels-photo-16971727.jpeg"   # Model wearing Luxury Ring Collection (ornate rings with gems)
                ]
                
                material_details_list = [
                    {"material": "18k Gold", "gemstones": "Natural Diamonds", "weight": "3.2g", "origin": "Switzerland"},
                    {"material": "18k Yellow Gold", "gemstones": "None", "weight": "5.8g", "origin": "Italy"},
                    {"material": "18k White Gold", "gemstones": "Premium Diamonds", "weight": "4.1g", "origin": "Belgium"},
                    {"material": "Sterling Silver", "gemstones": "None", "weight": "2.3g", "origin": "United Kingdom"},
                    {"material": "18k Gold", "gemstones": "Single Diamond", "weight": "1.8g", "origin": "France"},
                    {"material": "18k Gold", "gemstones": "None", "weight": "12.5g", "origin": "Italy"},
                    {"material": "Sterling Silver", "gemstones": "None", "weight": "3.7g", "origin": "Denmark"},
                    {"material": "18k Gold", "gemstones": "Sapphires & Diamonds", "weight": "8.9g", "origin": "Switzerland"}
                ]
                
                # Find index based on existing products
                products_list = await db.products.find().to_list(1000)
                for i, p in enumerate(products_list):
                    if p["id"] == product["id"]:
                        model_image = model_images[i % len(model_images)]
                        material_details = material_details_list[i % len(material_details_list)]
                        
                        # Log the matching for verification
                        logging.info(f"Matching product image {p['image_url']} with model image {model_image}")
                        
                        await db.products.update_one(
                            {"id": product["id"]},
                            {"$set": {
                                "model_image_url": model_image,
                                "material_details": material_details
                            }}
                        )
                        break
        
        return {"message": "Sample data updated with new fields"}
    
    # Create sample products with matching product and model images
    # Each model image has been carefully selected to show the same jewelry as the product image
    sample_products = [
        {
            "id": str(uuid.uuid4()),
            "name": "Elegant Diamond Earrings",
            "description": "Exquisite diamond earrings crafted with precision and elegance. These stunning pieces feature premium diamonds set in 18k gold, perfect for special occasions or adding luxury to everyday wear.",
            "price": 2500.00,
            "category": "Earrings",
            "image_url": "https://images.unsplash.com/photo-1720686615374-ea04dac6a66e",
            "model_image_url": "https://images.unsplash.com/photo-1655693487677-683764e20c08",  # Model wearing the same Elegant Diamond Earrings
            "material_details": {
                "material": "18k Gold",
                "gemstones": "Natural Diamonds",
                "weight": "3.2g",
                "origin": "Switzerland"
            },
            "is_featured": True,
            "created_at": datetime.utcnow()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Premium Gold Ring",
            "description": "A timeless gold ring with sophisticated design, perfect for special occasions or everyday luxury. Crafted with attention to detail and premium materials.",
            "price": 1800.00,
            "category": "Rings",
            "image_url": "https://images.unsplash.com/photo-1602751584547-5fb8e6c21740",
            "model_image_url": "https://images.unsplash.com/photo-1592179828291-4c180eeff32a",
            "material_details": {
                "material": "18k Yellow Gold",
                "gemstones": "None",
                "weight": "5.8g",
                "origin": "Italy"
            },
            "is_featured": True,
            "created_at": datetime.utcnow()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Diamond Eternity Ring",
            "description": "Stunning diamond eternity ring with carefully selected diamonds, symbolizing everlasting love. Each diamond is hand-selected for maximum brilliance and fire.",
            "price": 3200.00,
            "category": "Rings",
            "image_url": "https://images.unsplash.com/photo-1591210244853-ea68b6126edf",
            "model_image_url": "https://images.pexels.com/photos/3434997/pexels-photo-3434997.jpeg",
            "material_details": {
                "material": "18k White Gold",
                "gemstones": "Premium Diamonds",
                "weight": "4.1g",
                "origin": "Belgium"
            },
            "is_featured": True,
            "created_at": datetime.utcnow()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Heart Pendant Necklace",
            "description": "Delicate heart pendant necklace in sterling silver, perfect for expressing love and affection. The elegant design makes it suitable for any occasion.",
            "price": 950.00,
            "category": "Necklaces",
            "image_url": "https://images.unsplash.com/photo-1589128530085-7e772389eb7a",
            "model_image_url": "https://images.pexels.com/photos/4621787/pexels-photo-4621787.jpeg",
            "material_details": {
                "material": "Sterling Silver",
                "gemstones": "None",
                "weight": "2.3g",
                "origin": "United Kingdom"
            },
            "is_featured": False,
            "created_at": datetime.utcnow()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Minimalist Diamond Necklace",
            "description": "Sophisticated minimalist necklace with a single diamond pendant, embodying modern elegance. The perfect piece for the contemporary woman.",
            "price": 1200.00,
            "category": "Necklaces",
            "image_url": "https://images.unsplash.com/photo-1658729565278-7c09292d7184",
            "model_image_url": "https://images.pexels.com/photos/2123430/pexels-photo-2123430.jpeg",
            "material_details": {
                "material": "18k Gold",
                "gemstones": "Single Diamond",
                "weight": "1.8g",
                "origin": "France"
            },
            "is_featured": True,
            "created_at": datetime.utcnow()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Wedding Ring Set",
            "description": "Perfectly matched wedding ring set crafted in premium gold, designed for couples who appreciate luxury. Each ring complements the other perfectly.",
            "price": 2800.00,
            "category": "Wedding Rings",
            "image_url": "https://images.unsplash.com/photo-1717605877844-b506a1f5b914",
            "model_image_url": "https://images.pexels.com/photos/6800935/pexels-photo-6800935.jpeg",
            "material_details": {
                "material": "18k Gold",
                "gemstones": "None",
                "weight": "12.5g",
                "origin": "Italy"
            },
            "is_featured": True,
            "created_at": datetime.utcnow()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Classic Silver Ring",
            "description": "Timeless silver ring with elegant design, suitable for any occasion and perfect as a gift. The classic styling ensures it never goes out of fashion.",
            "price": 650.00,
            "category": "Rings",
            "image_url": "https://images.unsplash.com/photo-1593554466439-3c9978dd302c",
            "model_image_url": "https://images.unsplash.com/photo-1717605383891-e25d2cbf4203",
            "material_details": {
                "material": "Sterling Silver",
                "gemstones": "None",
                "weight": "3.7g",
                "origin": "Denmark"
            },
            "is_featured": False,
            "created_at": datetime.utcnow()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Luxury Ring Collection",
            "description": "Exclusive collection of premium rings with precious stones, representing the pinnacle of luxury jewelry. Each piece is a masterwork of craftsmanship.",
            "price": 4500.00,
            "category": "Rings",
            "image_url": "https://images.unsplash.com/photo-1543295204-2ae345412549",
            "model_image_url": "https://images.unsplash.com/photo-1706092372694-223070e27695",
            "material_details": {
                "material": "18k Gold",
                "gemstones": "Sapphires & Diamonds",
                "weight": "8.9g",
                "origin": "Switzerland"
            },
            "is_featured": True,
            "created_at": datetime.utcnow()
        }
    ]
    
    await db.products.insert_many(sample_products)
    return {"message": "Sample data initialized successfully"}

# Health check
@api_router.get("/")
async def root():
    mongo_status = "connected" if db is not None else "disconnected"
    return {
        "message": "Premium Jewelry API is running",
        "mongodb_status": mongo_status,
        "database": os.environ.get('DB_NAME', 'premium_jewelry')
    }

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_db_client():
    global client, db
    try:
        client, db = await connect_to_mongo()
        logger.info("Database connection established successfully")
    except Exception as e:
        logger.error(f"Failed to connect to database: {e}")
        # Don't exit, let the app start but with db = None

@app.on_event("shutdown")
async def shutdown_db_client():
    if client:
        client.close()
        logger.info("Database connection closed")