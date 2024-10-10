"use client";

import { useEffect, useState } from 'react';

const ProductForm = () => {
  const [product, setProduct] = useState({ name: '', price: '', img_url: '' });
  const [products, setProducts] = useState([]); // State to hold fetched products
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error('Failed to create product');
      }

      const data = await response.json();
      setSuccess(data.message);
      setProduct({ name: '', price: '', img_url: '' }); // Reset form fields
      fetchProducts(); // Fetch updated products
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/admin/products'); // Update this to your actual GET endpoint
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError('Failed to fetch products');
    }
  };

  useEffect(() => {
    fetchProducts(); // Fetch products on component mount
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="text-red-600">{error}</div>}
        {success && <div className="text-green-600">{success}</div>}
        <div>
          <label className="block text-gray-700">Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Image URL</label>
          <input
            type="text"
            name="img_url"
            value={product.img_url}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">Add Product</button>
      </form>

      {/* Displaying the fetched products */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold">Existing Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((prod) => (
            <div key={prod._id} className="border border-gray-300 p-4 rounded">
              <img src={prod.img_url} alt={prod.name} className="w-full h-32 object-cover mb-2" />
              <h3 className="text-lg">{prod.name}</h3>
              <p className="text-gray-600">${prod.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
