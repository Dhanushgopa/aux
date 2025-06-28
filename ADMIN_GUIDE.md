# Premium Jewelry Admin Guide

## Managing Product Images

This guide provides instructions for administrators on how to maintain consistency between product images and model images in the Premium Jewelry e-commerce platform.

### Image Requirements

#### Product Images
- High-resolution (minimum 1200x1200 pixels)
- Clean white background
- Jewelry item clearly visible and centered
- Consistent lighting to accurately show metal color and gemstone brilliance
- File format: JPG or PNG

#### Model Images
- High-resolution (minimum 1200x1600 pixels)
- Neutral background
- **Must show the exact same jewelry item as the product image**
- Model should be positioned to clearly showcase the jewelry
- Consistent lighting to accurately show metal color and gemstone brilliance
- File format: JPG or PNG

### Image Naming Convention

To maintain organization and traceability:

1. Product images: `[product_id]_product.jpg`
2. Model images: `[product_id]_model.jpg`

Example:
- `diamond-earrings-001_product.jpg`
- `diamond-earrings-001_model.jpg`

### Adding New Products

When adding new products to the system:

1. Prepare both product and model images according to the requirements above
2. Ensure both images show the exact same jewelry item
3. Upload both images to the image hosting service
4. Add the product to the system with both image URLs
5. The system will validate that both images are provided

### Updating Existing Products

When updating product images:

1. If updating only the product image, ensure the new image shows the same jewelry as the existing model image
2. If updating only the model image, ensure the new image shows the same jewelry as the existing product image
3. Ideally, update both images together to maintain consistency

### Image Validation

The system includes validation to ensure consistency between product and model images:

1. Basic validation ensures both image URLs are provided
2. In a production environment, AI-based image recognition would verify that the same jewelry appears in both images
3. Failed validation will prevent product creation or updates

### Best Practices

1. **Same-Day Photography**: Photograph both product and model images on the same day to ensure the jewelry appears identical
2. **Consistent Styling**: Maintain consistent styling across all product categories
3. **Quality Control**: Implement a review process where a second person verifies image consistency
4. **Documentation**: Keep records of which physical jewelry items were used in which photoshoots
5. **Regular Audits**: Periodically review the product catalog to ensure all products maintain image consistency

### Troubleshooting

If you encounter issues with image validation:

1. Verify that both image URLs are valid and accessible
2. Ensure both images show the exact same jewelry item
3. Check that image formats and dimensions meet requirements
4. If the system rejects valid images, contact the development team

## Contact

For technical support with the image management system, contact the development team at dev@luxejewelry.com.