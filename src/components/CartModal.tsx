'use client';
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import Link from "next/link";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {removeItem, toggleCartOpen} from "@/store/cartSlice";

const CartModal = () => {

  const items = useAppSelector(state => state.cart.items)
  const isCartOpen = useAppSelector(state => state.cart.isCartOpen)
  const totalQuantity = useAppSelector(state => state.cart.totalQuantity)
  const dispatch = useAppDispatch()

  return (
    <Sheet open={isCartOpen} onOpenChange={() => dispatch(toggleCartOpen())}>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <Card className="w-full max-w-3xl mx-auto mt-10 border border-gray-200 shadow-lg rounded-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Your Shopping Cart</CardTitle>
              <CardDescription>
                Review the items in your cart before proceeding to checkout.
              </CardDescription>
            </CardHeader>

            <CardContent>
              {items.length > 0 ? (
                items.map((item) => (
                  <div
                    key={item?.id}
                    className="border-b border-gray-200 py-4 flex justify-between items-center"
                  >
                    {/* Left Section: Item details */}
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold">{item?.name}</h3>
                      <p className="text-sm text-gray-500">{item?.description}</p>
                      <p className="text-sm text-gray-400">Category: {item?.category}</p>
                    </div>

                    {/* Right Section: Price and Remove Button */}
                    <div className="flex items-center space-x-4">
                      <span className="font-bold text-gray-700">{item?.price}</span>
                      <Button
                        variant="ghost"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => dispatch(removeItem(item.id))}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">Your cart is empty.</p>
              )}
            </CardContent>

            <CardFooter>
              {/* Total Price */}
              <div className="flex items-center w-full justify-end">
                <p>Subtotal:&nbsp;</p>
                <p className="text-lg font-bold">{items.reduce((acc, curr) => Number(acc) + Number(curr.price), 0)}</p>
              </div>

              <Link href="/checkout" className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-md text-center">
                Proceed to Checkout
              </Link>

            </CardFooter>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default CartModal