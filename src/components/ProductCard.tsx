import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Star} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {useAppDispatch} from "@/store/hooks";
import {addItem} from "@/store/cartSlice";
import {convertToUSD} from "@/utils/convertToUSD";

interface ProductCardProps {
  id: number;
  name: string;
  description: string;
  category: string;
  rating: number;
  price: number;
  isBestSeller: boolean;
  image: string;
}

export function ProductCard(product: ProductCardProps) {

  const {id, name, description, category, rating, price, isBestSeller, image } = product
  const dispatch = useAppDispatch()

  return (
    <Card className="w-[250px] overflow-hidden transition-all hover:shadow-lg pt-0">
      <Link href={`/products/${id}`} className="relative h-[200px] w-full">
        <Image
          src={image}
          alt={name}
          fill
          sizes="100"
          className="object-cover"
        />
        {isBestSeller && (
          <Badge className="absolute right-2 top-2 bg-yellow-400 text-black">
            Best Seller
          </Badge>
        )}
      </Link>
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="bg-blue-50">
            {category}
          </Badge>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400"/>
            <span className="text-sm font-medium">{rating}</span>
          </div>
        </div>
        <CardTitle className="line-clamp-1">{name}</CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex items-center justify-between">
        <span className="text-xl font-bold">{convertToUSD(price)}</span>
        <div className="flex gap-2">
          <Button
            className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 cursor-pointer transition-colors duration-300"
            onClick={() => dispatch(addItem(product))}
          >
            Add to Cart
          </Button>
        </div>
      </CardFooter>
    </Card>


  );
}