'use client';

import {useEffect, useState} from 'react';
import Image from 'next/image';
import {Star} from 'lucide-react';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {useAppDispatch} from "@/store/hooks";
import {addItem} from "@/store/cartSlice";
import {useParams} from "next/navigation";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  rating: number;
  isBestSeller: boolean;
  image: string;
}

export default function ProductPage() {
  const {id} = useParams()
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        if (!response.ok) throw new Error('Product not found');
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;
  if (!product) return <div className="flex justify-center items-center min-h-screen">Product not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative h-[400px] w-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover rounded-lg"
          />
          {product.isBestSeller && (
            <Badge className="absolute right-2 top-2 bg-yellow-400 text-black">
              Best Seller
            </Badge>
          )}
        </div>
        <div className="space-y-6">
          <div>
            <Badge variant="outline" className="bg-blue-50 mb-2">
              {product.category}
            </Badge>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-1 mt-2">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400"/>
              <span className="text-lg font-medium">{product.rating}</span>
            </div>
          </div>
          <p className="text-gray-600 text-lg">{product.description}</p>
          <div className="text-3xl font-bold">${product.price.toFixed(2)}</div>
          <Button
            className="w-full md:w-auto text-lg py-6 bg-blue-500 hover:bg-blue-600"
            onClick={() => dispatch(addItem(product))}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}