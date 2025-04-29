'use client';
import {ShoppingCart} from 'lucide-react';
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {toggleCartOpen} from "@/store/cartSlice";



export default function CartButton() {

  const totalQuantity = useAppSelector(state => state.cart.totalQuantity);
  const dispatch = useAppDispatch()

  return (
    <button
      className="relative rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
      onClick={() => dispatch(toggleCartOpen())}
    >
      <ShoppingCart className="h-6 w-6"/>
      {totalQuantity > 0 && (
        <span
          className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
          {totalQuantity}
        </span>
      )}
    </button>
  );
}