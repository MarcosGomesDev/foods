import { Prisma } from "@prisma/client";
import { ChevronRightIcon } from "lucide-react";
import React from "react";
import { twMerge } from "tailwind-merge";
import { ProductItem } from "../ProductItem";
import { Button } from "../ui/button";

interface ProductListProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  hasButton?: boolean;
  products: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
        };
      };
    };
  }>[];
}

export async function ProductList({
  className,
  title,
  hasButton = false,
  products,
}: ProductListProps) {
  return (
    <div className={twMerge([className])}>
      <div className="flex items-center justify-between px-5">
        {title && <h2 className="font-semibold">{title}</h2>}
        {hasButton && (
          <Button
            variant="ghost"
            className="h-fit p-0 text-primary hover:bg-transparent"
          >
            Ver todos
            <ChevronRightIcon size={16} />
          </Button>
        )}
      </div>

      <div className="flex gap-4 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
        {products.map((product, index) => (
          <ProductItem
            key={product.id}
            product={product}
            className={twMerge([
              index === 0 ? "ml-5" : "",
              index === products.length - 1 ? "mr-5" : "",
            ])}
          />
        ))}
      </div>
    </div>
  );
}
