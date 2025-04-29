"use client"

import * as React from "react"
import {Button} from "@/components/ui/button"
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import {ProductCard} from "./ProductCard"
import products from "../../data/products.json"

export function ProductCarousel() {
  const [currentScroll, setCurrentScroll] = React.useState(0)
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current
    if (!container) return

    const scrollAmount = 300
    const newScroll = direction === "left"
      ? currentScroll - scrollAmount
      : currentScroll + scrollAmount

    container.scrollTo({
      left: newScroll,
      behavior: "smooth",
    })
    setCurrentScroll(newScroll)
  }

  return (
    <div className="relative max-w-6xl mx-auto">
      <div className="flex items-center">
        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 z-10 h-8 w-8 rounded-full"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-4 w-4"/>
        </Button>
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto px-8 pb-4 pt-4 scrollbar-hide"
        >
          {products?.map((product) => (
            <div key={product.id} className="flex-none">
              <ProductCard {...product} />
            </div>
          ))}
        </div>
        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 z-10 h-8 w-8 rounded-full"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-4 w-4"/>
        </Button>
      </div>
    </div>
  )
}