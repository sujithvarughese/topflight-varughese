'use client';

import {useState, useEffect} from 'react';
import {Search} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import orders from "../../../data/orders.json"
import products from "../../../data/products.json"
import Link from "next/link";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";

interface Order {
  id: string;
  date: string;
  cart: number[];
  name: string;
  total: number;
  status: 'delivered' | 'processing' | 'cancelled';
}

const ITEMS_PER_PAGE = 10;

export default function OrdersPage() {
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState({start: '', end: ''});
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let result = [...orders].map(order => ({
      ...order,
      status: order.status as Order['status'],
    }));

    if (searchQuery) {
      result = result.filter(order =>
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.cart.map(item => products[item].name).join(" ").toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (dateRange.start && dateRange.end) {
      result = result.filter(order =>
        order.date >= dateRange.start && order.date <= dateRange.end
      );
    }

    if (statusFilter !== 'all') {
      result = result.filter(order => order.status === statusFilter);
    }

    setFilteredOrders(result);
  }, [orders, searchQuery, dateRange, statusFilter]);

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status !== "authenticated") {
      router.push("/")
    }
  }, [status]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
            <Input
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-4">
            <Input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
            />
            <Input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
            />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status"/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Cart</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell><Link href={`/orders/${order.id}`}>{order.id}</Link></TableCell>
                <TableCell>{new Date(order?.date).toDateString()}</TableCell>
                <TableCell>{order.cart.map(item => <p key={item}>{products[item] && products[item].name}</p>)}</TableCell>
                <TableCell>{order.name}</TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
                <TableCell>{order.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex justify-center gap-2">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="flex items-center px-4">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}