'use client';
import {useEffect, useState} from 'react';
import {useParams, useRouter} from 'next/navigation';
import Image from "next/image";
import {ProductProps} from "@/app/products/page";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {convertToUSD} from "@/utils/convertToUSD";
import {useSession} from "next-auth/react";

type OrderDetailsProps = {
  id: string;
  cart: ProductProps[];
  total: number;
  name: string;
  status: string;
  date: string;
};

const TAX_RATE = 0.07;

export default function OrderPage() {
  const {id} = useParams();
  const [order, setOrder] = useState<OrderDetailsProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/orders/${id}`);
        if (!response.ok) {
          throw new Error('Order not found');
        }
        const data = await response.json();
        setOrder(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch product');
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  const handleStatusChange = (id: string, newStatus: OrderDetailsProps["status"]) => {
    setOrder(prev => prev ? {...prev, status: newStatus} : null);
  }

  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status !== "authenticated") {
      router.push("/")
    }
  }, [status]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">Order not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="border-b pb-4">
            <h1 className="text-2xl font-semibold text-gray-800">Order Receipt</h1>
            <p className="text-gray-600 mt-1">Order #{order?.id}</p>
          </div>

          <div className="py-4 border-b">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600">Customer Name</p>
                <p className="font-medium">{order?.name}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-600">Date</p>
                <p className="font-medium">{new Date(order?.date).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <div className="py-4 border-b">
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">Status:</span>
              <div className={`rounded text-sm font-medium border
                  ${order?.status === 'processing' ? 'bg-blue-100 text-blue-800' : ''}
                  ${order?.status === 'delivered' ? 'bg-green-100 text-green-800' : ''}
                  ${order?.status === 'cancelled' ? 'bg-red-100 text-red-800' : ''}
                `}>
                <Select
                  value={order?.status}
                  onValueChange={(value: OrderDetailsProps["status"]) => handleStatusChange(order?.id, value)}
                >
                  <SelectTrigger>
                    <SelectValue>{order?.status}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="">
              <div className="flex justify-between items-center gap-4 mb-4">
                <p className="font-semibold">Order ID</p>
                <p>{order?.id}</p>
              </div>
              <div className="flex justify-between items-center gap-4 mb-4">
                <p className="font-semibold">Customer Name</p>
                <p>{order?.name}</p>
              </div>
              <div className="flex justify-between items-center gap-4 mb-4">
                <p className="font-semibold">Date</p>
                <p>{new Date(order?.date).toDateString()}</p>
              </div>
              <div>
                <p className="font-semibold">Items</p>
                {order?.cart.map(item =>
                  <div key={item?.id} className="flex justify-between items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Image src={item?.image} alt="image" width={100} height={100} className="rounded-md" />
                      <p>{item?.name}</p>
                    </div>
                    <p>{convertToUSD(item?.price)}</p>
                  </div>
                )}
              </div>

              <div className="flex justify-end pt-4 mt-4">
                <p>Subtotal:&nbsp;</p><p className="font-bold">{convertToUSD(order?.total)}</p>
              </div>
              <div className="flex justify-end border-t border-gray-200 pt-4 mt-4">
                <p>Tax:&nbsp;</p><p className="font-bold">{convertToUSD(order?.total * TAX_RATE)}</p>
              </div>

            </div>
          </div>

          <div className="p-4 border-t">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-lg font-semibold">{convertToUSD(order.total, TAX_RATE)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}