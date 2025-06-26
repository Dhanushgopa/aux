#!/usr/bin/env python3
import requests
import json
import unittest
import os
import sys
import uuid
from dotenv import load_dotenv

# Load the backend URL from the frontend .env file
def load_backend_url():
    try:
        with open('/app/frontend/.env', 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    return line.strip().split('=')[1].strip('"\'')
    except Exception as e:
        print(f"Error loading backend URL: {e}")
        sys.exit(1)

BACKEND_URL = load_backend_url()
API_URL = f"{BACKEND_URL}/api"

class PremiumJewelryAPITest(unittest.TestCase):
    """Test suite for Premium Jewelry API"""
    
    def setUp(self):
        """Set up test fixtures before each test method"""
        self.api_url = API_URL
        self.test_product = {
            "name": "Test Diamond Bracelet",
            "description": "Luxurious diamond bracelet for testing purposes",
            "price": 1999.99,
            "category": "Bracelets",
            "image_url": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f",
            "model_image_url": "https://images.unsplash.com/photo-1655693487677-683764e20c08",
            "material_details": {
                "material": "18k White Gold",
                "gemstones": "Natural Diamonds",
                "weight": "4.5g",
                "origin": "Switzerland"
            },
            "is_featured": True
        }
        self.test_contact = {
            "name": "Test Customer",
            "email": "test@example.com",
            "phone": "+1234567890",
            "message": "This is a test message for the contact form."
        }
        self.created_product_id = None
    
    def tearDown(self):
        """Clean up after each test method"""
        # Delete test product if it was created
        if self.created_product_id:
            try:
                requests.delete(f"{self.api_url}/products/{self.created_product_id}")
                self.created_product_id = None
            except:
                pass
    
    def test_01_api_health_check(self):
        """Test API health check endpoint"""
        print("\n=== Testing API Health Check ===")
        response = requests.get(f"{self.api_url}/")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("message", data)
        self.assertEqual(data["message"], "Premium Jewelry API is running")
        print("✅ API health check successful")
    
    def test_02_init_sample_data(self):
        """Test sample data initialization endpoint"""
        print("\n=== Testing Sample Data Initialization ===")
        response = requests.post(f"{self.api_url}/init-data")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("message", data)
        
        # Check if data was initialized or already exists
        self.assertTrue(
            data["message"] == "Sample data initialized successfully" or 
            data["message"] == "Sample data already exists"
        )
        
        # Test idempotence - calling again should say data already exists
        response2 = requests.post(f"{self.api_url}/init-data")
        self.assertEqual(response2.status_code, 200)
        data2 = response2.json()
        self.assertEqual(data2["message"], "Sample data already exists")
        
        print("✅ Sample data initialization successful")
    
    def test_03_get_all_products(self):
        """Test getting all products"""
        print("\n=== Testing GET All Products ===")
        response = requests.get(f"{self.api_url}/products")
        self.assertEqual(response.status_code, 200)
        products = response.json()
        self.assertIsInstance(products, list)
        self.assertGreater(len(products), 0, "No products found, sample data may not be initialized")
        
        # Verify product structure
        product = products[0]
        required_fields = ["id", "name", "description", "price", "category", "image_url", "model_image_url", "material_details", "is_featured"]
        for field in required_fields:
            self.assertIn(field, product)
        
        # Verify material_details structure
        self.assertIsInstance(product["material_details"], dict)
        material_detail_fields = ["material", "gemstones", "weight", "origin"]
        for field in material_detail_fields:
            self.assertIn(field, product["material_details"])
        
        print(f"✅ Successfully retrieved {len(products)} products")
    
    def test_04_get_featured_products(self):
        """Test getting featured products"""
        print("\n=== Testing GET Featured Products ===")
        response = requests.get(f"{self.api_url}/products/featured")
        self.assertEqual(response.status_code, 200)
        products = response.json()
        self.assertIsInstance(products, list)
        
        # Verify all returned products are featured
        for product in products:
            self.assertTrue(product["is_featured"], f"Product {product['id']} is not featured")
        
        print(f"✅ Successfully retrieved {len(products)} featured products")
    
    def test_05_get_single_product(self):
        """Test getting a single product by ID"""
        print("\n=== Testing GET Single Product ===")
        # First get all products to find a valid ID
        response = requests.get(f"{self.api_url}/products")
        self.assertEqual(response.status_code, 200)
        products = response.json()
        self.assertGreater(len(products), 0, "No products found, sample data may not be initialized")
        
        # Get the first product's ID
        product_id = products[0]["id"]
        
        # Test getting that specific product
        response = requests.get(f"{self.api_url}/products/{product_id}")
        self.assertEqual(response.status_code, 200)
        product = response.json()
        self.assertEqual(product["id"], product_id)
        
        # Test invalid product ID
        invalid_id = str(uuid.uuid4())
        response = requests.get(f"{self.api_url}/products/{invalid_id}")
        self.assertEqual(response.status_code, 404)
        
        print("✅ Single product retrieval successful")
    
    def test_06_create_product(self):
        """Test creating a new product"""
        print("\n=== Testing POST Create Product ===")
        response = requests.post(
            f"{self.api_url}/products",
            json=self.test_product
        )
        self.assertEqual(response.status_code, 200)
        product = response.json()
        
        # Save the created product ID for cleanup in tearDown
        self.created_product_id = product["id"]
        
        # Verify the created product has all the correct data
        for key, value in self.test_product.items():
            self.assertEqual(product[key], value)
        
        # Verify the product was actually saved in the database
        response = requests.get(f"{self.api_url}/products/{product['id']}")
        self.assertEqual(response.status_code, 200)
        
        print("✅ Product creation successful")
    
    def test_07_update_product(self):
        """Test updating a product"""
        print("\n=== Testing PUT Update Product ===")
        # First create a product to update
        response = requests.post(
            f"{self.api_url}/products",
            json=self.test_product
        )
        self.assertEqual(response.status_code, 200)
        product = response.json()
        self.created_product_id = product["id"]
        
        # Update the product
        update_data = {
            "name": "Updated Test Bracelet",
            "price": 2499.99,
            "is_featured": False
        }
        
        response = requests.put(
            f"{self.api_url}/products/{product['id']}",
            json=update_data
        )
        self.assertEqual(response.status_code, 200)
        updated_product = response.json()
        
        # Verify the updates were applied
        for key, value in update_data.items():
            self.assertEqual(updated_product[key], value)
        
        # Verify unchanged fields remain the same
        self.assertEqual(updated_product["description"], self.test_product["description"])
        self.assertEqual(updated_product["category"], self.test_product["category"])
        
        # Test updating non-existent product
        invalid_id = str(uuid.uuid4())
        response = requests.put(
            f"{self.api_url}/products/{invalid_id}",
            json=update_data
        )
        self.assertEqual(response.status_code, 404)
        
        print("✅ Product update successful")
    
    def test_08_delete_product(self):
        """Test deleting a product"""
        print("\n=== Testing DELETE Product ===")
        # First create a product to delete
        response = requests.post(
            f"{self.api_url}/products",
            json=self.test_product
        )
        self.assertEqual(response.status_code, 200)
        product = response.json()
        product_id = product["id"]
        
        # Delete the product
        response = requests.delete(f"{self.api_url}/products/{product_id}")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data["message"], "Product deleted successfully")
        
        # Verify the product was actually deleted
        response = requests.get(f"{self.api_url}/products/{product_id}")
        self.assertEqual(response.status_code, 404)
        
        # Test deleting non-existent product
        response = requests.delete(f"{self.api_url}/products/{product_id}")  # Try deleting again
        self.assertEqual(response.status_code, 404)
        
        # No need to set self.created_product_id since we've already deleted it
        print("✅ Product deletion successful")
    
    def test_09_contact_form_submission(self):
        """Test contact form submission"""
        print("\n=== Testing POST Contact Form ===")
        response = requests.post(
            f"{self.api_url}/contact",
            json=self.test_contact
        )
        self.assertEqual(response.status_code, 200)
        contact = response.json()
        
        # Verify the contact has all the correct data
        for key, value in self.test_contact.items():
            self.assertEqual(contact[key], value)
        
        print("✅ Contact form submission successful")
    
    def test_10_get_contacts(self):
        """Test getting all contacts"""
        print("\n=== Testing GET All Contacts ===")
        # First submit a contact to ensure there's at least one
        requests.post(
            f"{self.api_url}/contact",
            json=self.test_contact
        )
        
        # Get all contacts
        response = requests.get(f"{self.api_url}/contacts")
        self.assertEqual(response.status_code, 200)
        contacts = response.json()
        self.assertIsInstance(contacts, list)
        self.assertGreater(len(contacts), 0, "No contacts found")
        
        # Verify contact structure
        contact = contacts[0]
        required_fields = ["id", "name", "email", "message", "created_at"]
        for field in required_fields:
            self.assertIn(field, contact)
        
        print(f"✅ Successfully retrieved {len(contacts)} contacts")

if __name__ == "__main__":
    print(f"Testing Premium Jewelry API at: {API_URL}")
    unittest.main(argv=['first-arg-is-ignored'], exit=False)