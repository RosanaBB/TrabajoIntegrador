import React, { useState, useEffect } from 'react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [titleFilter, setTitleFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');

  useEffect(() => {
    // Fetch categories to populate the filter dropdown
    fetch('https://fakeapi.platzi.com/categories')
      .then((response) => response.json())
      .then((data) => setCategories(data));

    // Fetch products
    fetch('https://fakeapi.platzi.com/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      });
  }, []);

  useEffect(() => {
    // Apply filters when titleFilter, categoryFilter, or priceFilter change
    filterProducts();
  }, [titleFilter, categoryFilter, priceFilter]);

  const filterProducts = () => {
    let filtered = products;

    if (titleFilter) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(titleFilter.toLowerCase())
      );
    }

    if (categoryFilter) {
      filtered = filtered.filter(
        (product) => product.category === categoryFilter
      );
    }

    if (priceFilter) {
      filtered = filtered.filter(
        (product) => product.price <= parseFloat(priceFilter)
      );
    }

    setFilteredProducts(filtered);
  };

  return (
    <div>
      <h2>Products</h2>

      <div>
        <label>Title:</label>
        <input
          type="text"
          value={titleFilter}
          onChange={(e) => setTitleFilter(e.target.value)}
        />
      </div>

      <div>
        <label>Category:</label>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Max Price:</label>
        <input
          type="number"
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
        />
      </div>

      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>
            {product.name} - {product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
