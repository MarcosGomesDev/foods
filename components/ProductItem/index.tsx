import { calculateProductTotalPrice, formatCurrency } from "@/helpers/price";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { DiscountBadge } from "../DiscountBadge";

interface ProductItemProps extends React.HTMLAttributes<HTMLDivElement> {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
        };
      };
    };
  }>;
}

export function ProductItem({ product, className }: ProductItemProps) {
  return (
    <Link
      className={twMerge(["min-w-[150px] max-w-[150px]", className])}
      href={`/products/${product.id}`}
    >
      <div className="w-full space-y-2">
        <div className="relative aspect-square w-full">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="rounded-lg object-cover shadow-md"
          />

          {product.discountPercentage && (
            <DiscountBadge
              product={product}
              className="absolute left-2 top-2"
            />
          )}
        </div>

        <div>
          <h2 className="truncate text-sm">{product.name}</h2>
          <div className="flex items-center gap-1">
            <h3 className="font-semibold">
              {formatCurrency(calculateProductTotalPrice(product))}
            </h3>
            {product.discountPercentage > 0 && (
              <span className="text-xs text-muted-foreground line-through">
                {formatCurrency(Number(product.price))}
              </span>
            )}
          </div>

          <span className="block text-xs text-muted-foreground">
            {product.restaurant.name}
          </span>
        </div>
      </div>
    </Link>
  );
}
