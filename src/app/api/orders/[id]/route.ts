import {NextResponse} from "next/server";
import products from "../../../../../data/products.json"
import orders from "../../../../../data/orders.json"

export async function GET(
  request: Request,
  {params}: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    if (!id) {
      return NextResponse.json(
        {error: "Product ID is required"},
        {status: 400}
      );
    }
    const order = orders.find(order => order.id === id)
    const cartItems = order?.cart.map(item => products.find(product => product.id === item))
    return NextResponse.json({ ...order, cart: cartItems });
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      {error: "Failed to fetch product"},
      {status: 500},
    );
  }
}