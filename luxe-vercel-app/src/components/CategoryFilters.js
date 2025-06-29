import React from 'react';

const CategoryFilters = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="category-filters">
      {categories.map(category => (
        <button 
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`category-filter ${selectedCategory === category ? 'active' : ''}`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilters;