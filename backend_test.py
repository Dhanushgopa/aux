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
            
            # Verify each featured product has the new fields
            self.assertIn("model_image_url", product)
            self.assertIn("material_details", product)
            self.assertIsInstance(product["material_details"], dict)
            
            # Verify material_details structure
            material_detail_fields = ["material", "gemstones", "weight", "origin"]
            for field in material_detail_fields:
                self.assertIn(field, product["material_details"])
        
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
        
        # Verify the product has the new fields
        self.assertIn("model_image_url", product)
        self.assertIn("material_details", product)
        self.assertIsInstance(product["material_details"], dict)
        
        # Verify material_details structure
        material_detail_fields = ["material", "gemstones", "weight", "origin"]
        for field in material_detail_fields:
            self.assertIn(field, product["material_details"])
        
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
        
    def test_11_enhanced_product_model(self):
        """Test the enhanced product model with new fields"""
        print("\n=== Testing Enhanced Product Model ===")
        
        # Create a product with the new fields
        enhanced_product = {
            "name": "Enhanced Test Diamond Ring",
            "description": "Luxurious diamond ring with enhanced model details",
            "price": 3499.99,
            "category": "Rings",
            "image_url": "https://images.unsplash.com/photo-1605100804763-247f67b3557e",
            "model_image_url": "https://images.unsplash.com/photo-1592179828291-4c180eeff32a",
            "material_details": {
                "material": "18k Rose Gold",
                "gemstones": "Premium Diamonds",
                "weight": "5.2g",
                "origin": "Italy"
            },
            "is_featured": True
        }
        
        # Create the product
        response = requests.post(
            f"{self.api_url}/products",
            json=enhanced_product
        )
        self.assertEqual(response.status_code, 200)
        product = response.json()
        
        # Save the created product ID for cleanup in tearDown
        self.created_product_id = product["id"]
        
        # Verify all fields including new ones
        for key, value in enhanced_product.items():
            if key == "material_details":
                self.assertIsInstance(product[key], dict)
                for detail_key, detail_value in value.items():
                    self.assertEqual(product[key][detail_key], detail_value)
            else:
                self.assertEqual(product[key], value)
        
        # Test updating just the material_details
        update_data = {
            "material_details": {
                "material": "18k White Gold",
                "gemstones": "Natural Diamonds",
                "weight": "4.8g",
                "origin": "Switzerland"
            }
        }
        
        response = requests.put(
            f"{self.api_url}/products/{product['id']}",
            json=update_data
        )
        self.assertEqual(response.status_code, 200)
        updated_product = response.json()
        
        # Verify only material_details was updated
        self.assertEqual(updated_product["name"], enhanced_product["name"])
        self.assertEqual(updated_product["price"], enhanced_product["price"])
        
        # Verify the material_details was updated correctly
        for key, value in update_data["material_details"].items():
            self.assertEqual(updated_product["material_details"][key], value)
            
        print("✅ Enhanced product model testing successful")
        
    def test_12_sample_data_update(self):
        """Test sample data update with new fields"""
        print("\n=== Testing Sample Data Update ===")
        
        # Call init-data endpoint to ensure sample data exists and is updated
        response = requests.post(f"{self.api_url}/init-data")
        self.assertEqual(response.status_code, 200)
        
        # Get all products to verify they have the new fields
        response = requests.get(f"{self.api_url}/products")
        self.assertEqual(response.status_code, 200)
        products = response.json()
        
        # Verify we have at least 8 products
        self.assertGreaterEqual(len(products), 8, "Expected at least 8 sample products")
        
        # Check that all products have the new fields
        for product in products:
            self.assertIn("model_image_url", product)
            self.assertIn("material_details", product)
            
            # Verify material_details structure
            self.assertIsInstance(product["material_details"], dict)
            material_detail_fields = ["material", "gemstones", "weight", "origin"]
            for field in material_detail_fields:
                self.assertIn(field, product["material_details"])
                
            # Verify material field contains expected values
            self.assertIn(product["material_details"]["material"], 
                         ["18k Gold", "18k Yellow Gold", "18k White Gold", "Sterling Silver", "18k Rose Gold"])
                
            # Verify weight field format (should be a string with 'g' suffix)
            self.assertRegex(product["material_details"]["weight"], r"^\d+\.?\d*g$")
            
            # Verify origin field is not empty
            self.assertTrue(product["material_details"]["origin"], "Origin field should not be empty")
        
        # Call init-data again to verify idempotence with new fields
        response = requests.post(f"{self.api_url}/init-data")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        
        # Should indicate data already exists or was updated
        self.assertTrue(
            "Sample data already exists" in data["message"] or 
            "Sample data updated with new fields" in data["message"]
        )
        
        print("✅ Sample data update testing successful")

    def test_13_hover_effect_data_availability(self):
        """Test specifically for hover effect data availability in products"""
        print("\n=== Testing Hover Effect Data Availability ===")
        
        # Test GET /api/products endpoint
        response = requests.get(f"{self.api_url}/products")
        self.assertEqual(response.status_code, 200)
        products = response.json()
        self.assertGreater(len(products), 0, "No products found")
        
        # Verify all products have both image fields
        for product in products:
            self.assertIn("image_url", product, f"Product {product['id']} missing image_url field")
            self.assertIn("model_image_url", product, f"Product {product['id']} missing model_image_url field")
            
            # Verify image URLs are not empty
            self.assertTrue(product["image_url"], f"Product {product['id']} has empty image_url")
            self.assertTrue(product["model_image_url"], f"Product {product['id']} has empty model_image_url")
            
            # Verify image URLs are valid URLs
            self.assertTrue(product["image_url"].startswith("http"), 
                           f"Product {product['id']} has invalid image_url: {product['image_url']}")
            self.assertTrue(product["model_image_url"].startswith("http"), 
                           f"Product {product['id']} has invalid model_image_url: {product['model_image_url']}")
        
        print(f"✅ All {len(products)} products have valid image_url and model_image_url fields")
        
        # Test GET /api/products/featured endpoint
        response = requests.get(f"{self.api_url}/products/featured")
        self.assertEqual(response.status_code, 200)
        featured_products = response.json()
        self.assertGreater(len(featured_products), 0, "No featured products found")
        
        # Verify all featured products have both image fields
        for product in featured_products:
            self.assertIn("image_url", product, f"Featured product {product['id']} missing image_url field")
            self.assertIn("model_image_url", product, f"Featured product {product['id']} missing model_image_url field")
            
            # Verify image URLs are not empty
            self.assertTrue(product["image_url"], f"Featured product {product['id']} has empty image_url")
            self.assertTrue(product["model_image_url"], f"Featured product {product['id']} has empty model_image_url")
            
            # Verify image URLs are valid URLs
            self.assertTrue(product["image_url"].startswith("http"), 
                           f"Featured product {product['id']} has invalid image_url: {product['image_url']}")
            self.assertTrue(product["model_image_url"].startswith("http"), 
                           f"Featured product {product['id']} has invalid model_image_url: {product['model_image_url']}")
        
        print(f"✅ All {len(featured_products)} featured products have valid image_url and model_image_url fields")
        
        # Verify sample data initialization includes model_image_url
        response = requests.post(f"{self.api_url}/init-data")
        self.assertEqual(response.status_code, 200)
        
        # Get all products again to verify sample data
        response = requests.get(f"{self.api_url}/products")
        self.assertEqual(response.status_code, 200)
        products = response.json()
        
        # Check that all sample products have model_image_url
        sample_products_with_model_images = sum(1 for p in products if "model_image_url" in p and p["model_image_url"])
        self.assertEqual(sample_products_with_model_images, len(products), 
                        f"Only {sample_products_with_model_images} out of {len(products)} sample products have model_image_url")
        
        print(f"✅ All {len(products)} sample products have model_image_url field")

if __name__ == "__main__":
    print(f"Testing Premium Jewelry API at: {API_URL}")
    unittest.main(argv=['first-arg-is-ignored'], exit=False)