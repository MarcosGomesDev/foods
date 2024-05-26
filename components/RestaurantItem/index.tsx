import { formatCurrency } from "@/helpers/price";
import { Restaurant } from "@prisma/client";
import { BikeIcon, HeartIcon, StarIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { twMerge } from "tailwind-merge";
import { Button } from "../ui/button";

interface RestaurantItemProps extends React.HTMLAttributes<HTMLDivElement> {
  restaurant: Restaurant;
}

export function RestaurantItem({ restaurant, className }: RestaurantItemProps) {
  return (
    <div
      className={twMerge(["min-w-[266px] max-w-[266px] space-y-3", className])}
    >
      <div className="relative h-[136px]">
        <Image
          src={restaurant.imageUrl}
          alt={restaurant.name}
          fill
          className=" rounded-lg object-cover"
        />

        <div className="absolute left-2 top-2 flex items-center gap-[2px] rounded-md bg-primary bg-white px-2 py-[2px] text-xs font-semibold">
          <StarIcon size={12} className="fill-yellow-400 text-yellow-400" />
          <span>5.0</span>
        </div>

        <Button
          size="icon"
          className="absolute right-2 top-2 size-7 rounded-full bg-gray-700"
        >
          <HeartIcon size={16} className="fill-white" />
        </Button>
      </div>

      <div>
        <h3 className="text-sm font-semibold">{restaurant.name}</h3>
        <div className="flex gap-3">
          <div className="flex">
            <div className="flex items-center gap-1">
              <BikeIcon className="text-primary" size={14} />
              <span className="text-xs text-muted-foreground">
                {Number(restaurant.deliveryFee) > 0
                  ? `${formatCurrency(Number(restaurant.deliveryFee))}`
                  : "Entrega grátis"}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <TimerIcon className="text-primary" size={14} />
              <span className="text-xs text-muted-foreground">
                {restaurant.deliveryTimeMinutes} min
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
