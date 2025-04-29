"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import {useAppSelector} from "@/store/hooks";


const CheckoutPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });


  // Calculate total and tax
  const items = useAppSelector(state => state.cart.items)
  const subtotal = items.reduce((total, item) => total + item.price, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Payment Submitted");
    console.log(formData); // Handle payment processing here
  };

  return (
    <div className="p-6 space-y-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-center">Checkout</h1>

      {/* Shopping Cart Section */}
      <Card className="p-6 shadow-md">
        <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
        <ul className="space-y-4">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center border-b pb-4"
            >
              <div className="flex items-center space-x-4">
                <Image src={item.image} alt="image" width={120} height={120} className="rounded-lg" />
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                  <p className="text-sm text-gray-500">Category: {item.category}</p>
                </div>
              </div>

              <p className="text-lg font-bold">${item.price.toFixed(2)}</p>
            </li>
          ))}
        </ul>

        {/* Total Price Section */}
        <div className="mt-6 pt-4 border-t">
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p className="font-bold">{subtotal}</p>
          </div>
          <div className="flex justify-between">
            <p>Tax (7%)</p>
            <p className="font-bold">{(subtotal)}</p>
          </div>
          <div className="flex justify-between mt-2">
            <p className="text-lg font-semibold">Total</p>
            <p className="text-lg font-bold">{(subtotal)}</p>
          </div>
        </div>
      </Card>

      {/* User Information Form */}
      <Card className="p-6 shadow-md">
        <h2 className="text-xl font-semibold mb-4">Personal Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Address */}
          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              type="text"
              id="address"
              name="address"
              placeholder="Your Address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </div>

          <h3 className="text-lg font-medium mt-6">Payment Information</h3>

          {/* Card Number */}
          <div>
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              type="text"
              id="cardNumber"
              name="cardNumber"
              placeholder="1234 5678 1234 5678"
              value={formData.cardNumber}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Expiry Date */}
          <div className="flex space-x-4">
            <div>
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                type="month"
                id="expiryDate"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="cvv">CVV</Label>
              <Input
                type="password"
                id="cvv"
                name="cvv"
                placeholder="123"
                value={formData.cvv}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            Complete Purchase
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default CheckoutPage;