import { db } from "@/app/lib/prisma";
import { ChevronRightIcon } from "lucide-react";
import React from "react";
import { twMerge } from "tailwind-merge";
import { ProductItem } from "../ProductItem";
import { Button } from "../ui/button";

interface ProductListProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  hasButton?: boolean;
}

export async function ProductList({
  className,
  title,
  hasButton = false,
}: ProductListProps) {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 10,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });

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
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
