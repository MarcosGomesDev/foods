import { DeliveryInfo } from "@/components/DeliveryInfo";
import { Prisma } from "@prisma/client";
import { StarIcon } from "lucide-react";
import Image from "next/image";

interface RestaurantDetailsProps {
  restaurant: Prisma.RestaurantGetPayload<{}>;
}

export function RestaurantDetails({ restaurant }: RestaurantDetailsProps) {
  return (
    <div className="relative z-50 mt-[-1.5rem] rounded-tl-3xl rounded-tr-3xl bg-white py-5">
      <div className="px-5">
        {/* RESTAURANT */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[0.375rem]">
            <div className="relative size-8">
              <Image
                src={restaurant.imageUrl}
                alt={restaurant.name}
                fill
                sizes="20vw"
                className="rounded-full object-cover"
              />
            </div>
            <span className="font-semibold">{restaurant.name}</span>
          </div>

          <div className="flex items-center gap-[3px] rounded-full bg-gray-700 px-3 py-1 text-xs font-semibold">
            <StarIcon size={12} className="fill-yellow-400 text-yellow-400" />
            <span className="text-white">5.0</span>
          </div>
        </div>

        {/* DELIVERY DETAILS */}
        <DeliveryInfo restaurant={restaurant} />
      </div>
    </div>
  );
}
