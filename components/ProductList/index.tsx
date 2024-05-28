import { Prisma } from "@prisma/client";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";
import { ProductItem } from "../ProductItem";
import { Button } from "../ui/button";

interface ProductListProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  vertical?: boolean;
  hasButton?: boolean;
  href?: string;
  grid?: boolean;
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

export function ProductList({
  className,
  title,
  vertical = false,
  hasButton = false,
  grid = false,
  href = "/products",
  products,
}: ProductListProps) {
  return (
    <div className={twMerge([className])}>
      <div className="mb-6 flex items-center justify-between px-5">
        {title && <h2 className="font-semibold">{title}</h2>}
        {hasButton && (
          <Button
            variant="ghost"
            className="h-fit p-0 text-primary hover:bg-transparent"
            asChild
          >
            <Link href={href}>
              Ver todos
              <ChevronRightIcon size={16} />
            </Link>
          </Button>
        )}
      </div>

      <div
        className={twMerge([
          "flex gap-4 overflow-x-scroll [&::-webkit-scrollbar]:hidden",
          vertical && "mt-6 flex-col gap-6 px-5",
          grid && `grid grid-cols-2 gap-6 px-5`,
        ])}
      >
        {products.map((product, index) => (
          <ProductItem
            key={product.id}
            product={product}
            className={twMerge([
              index === 0 && !vertical && !grid ? "ml-5" : "",
              index === products.length - 1 && !vertical && !grid ? "mr-5" : "",
              (vertical || grid) && "min-w-full",
            ])}
          />
        ))}
      </div>
    </div>
  );
}
