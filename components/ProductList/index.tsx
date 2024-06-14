import { Prisma } from "@prisma/client";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";
import { ProductItem } from "../ProductItem";
import { Button } from "../ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

interface ProductListProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  hasButton?: boolean;
  href?: string;
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
  hasButton = false,
  href = "/products",
  products,
}: ProductListProps) {
  return (
    <div className={twMerge([className, "container"])}>
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

      <div className="md:flex md:justify-center">
        <Carousel
          opts={{
            align: "start",
          }}
          className="max-w-screen-md lg:max-w-[880px] xl:max-w-[1140px]"
        >
          <CarouselContent>
            {products.map((product, index) => (
              <CarouselItem
                key={product.id}
                className={twMerge([
                  "min-w-[140px] max-w-[140px] lg:min-w-[180px] lg:max-w-[180px]",
                  index === 0 && "ml-5 lg:ml-0",
                  index === products.length - 1 && "mr-5 lg:mr-0",
                ])}
              >
                <ProductItem product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden lg:flex" />
          <CarouselNext className="hidden lg:flex" />
        </Carousel>
      </div>
    </div>
  );
}
