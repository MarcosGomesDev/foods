import { Product } from "@prisma/client";
import { ArrowDownIcon } from "lucide-react";
import React from "react";
import { twMerge } from "tailwind-merge";

interface DiscountBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  product: Pick<Product, "discountPercentage">;
}

export function DiscountBadge({
  product: { discountPercentage },
  className,
}: DiscountBadgeProps) {
  return (
    <div
      className={twMerge([
        "flex items-center gap-[2px] rounded-md bg-primary px-2 py-[2px] text-xs font-semibold text-white",
        className,
      ])}
    >
      <ArrowDownIcon size={12} />
      <span>{discountPercentage}%</span>
    </div>
  );
}
