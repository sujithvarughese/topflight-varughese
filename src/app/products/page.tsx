'use client';

import {useState, useEffect} from 'react';
import {Search, SlidersHorizontal} from 'lucide-react';
import products from "../../../data/products.json"
import {ProductCard} from "@/components/ProductCard";

export type ProductProps = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  rating: number;
  isBestSeller: boolean;
  image: string;
}

export default function ProductsPage() {
  const [filteredProducts, setFilteredProducts] = useState<ProductProps[]>(products);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState({min: 0, max: 200});
  const [showBestSellers, setShowBestSellers] = useState(false);
  const [sortBy, setSortBy] = useState('name');

  const categories = ['all', ...new Set(products.map(p => p.category))];

  useEffect(() => {
    let result = [...products];

    // Search filter
    if (searchQuery) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Price range filter
    result = result.filter(p =>
      p.price >= priceRange.min && p.price <= priceRange.max
    );

    // Best sellers filter
    if (showBestSellers) {
      result = result.filter(p => p.isBestSeller);
    }

    // Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(result);
  }, [searchQuery, selectedCategory, priceRange, showBestSellers, sortBy]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-4 items-center">
            <select
              className="border rounded-lg px-4 py-2"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Sort by Name</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="space-y-6 p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-semibold mb-2">Categories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <label key={category} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === category}
                      onChange={() => setSelectedCategory(category)}
                    />
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Price Range</h3>
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  min="0"
                  max={priceRange.max}
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({...priceRange, min: Number(e.target.value)})}
                  className="w-20 border rounded px-2 py-1"
                />
                <span>to</span>
                <input
                  type="number"
                  min={priceRange.min}
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({...priceRange, max: Number(e.target.value)})}
                  className="w-20 border rounded px-2 py-1"
                />
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={showBestSellers}
                  onChange={(e) => setShowBestSellers(e.target.checked)}
                />
                Best Sellers Only
              </label>
            </div>
          </div>

          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}