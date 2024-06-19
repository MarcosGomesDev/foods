import { DeliveryInfo } from "@/components/DeliveryInfo";
import { Prisma } from "@prisma/client";
import { StarIcon } from "lucide-react";
import Image from "next/image";

interface RestaurantDetailsProps {
  restaurant: Prisma.RestaurantGetPayload<{
    include: {
      categories: {
        select: {
          id: true;
          name: true;
        };
      };
    };
  }>;
}

export function RestaurantDetails({ restaurant }: RestaurantDetailsProps) {
  return (
    <>
      {/* MOBILE LAYOUT */}
      <div className="relative z-50 mt-[-1.5rem] rounded-tl-3xl rounded-tr-3xl bg-white py-5 pb-10 lg:hidden">
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

      {/* DESKTOP LAYOUT */}
      <div className="hidden w-[530px] lg:flex">
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

          <div className="mt-3 grid grid-cols-2 gap-4">
            {restaurant.categories.map((category) => (
              <div
                key={category.id}
                className="min-w-[167px] rounded-lg bg-gray-200 py-1 text-center"
              >
                <span className="text-xs text-muted-foreground">
                  {category.name}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-3">
            <h3 className="font-semibold">Sobre</h3>
            <p className="text-sm text-muted-foreground">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque
              est, magni error sed a assumenda. Harum suscipit quae et! Ullam
              vitae, aut impedit itaque porro eligendi rerum at et possimus.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
