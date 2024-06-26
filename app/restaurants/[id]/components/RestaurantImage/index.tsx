"use client";

import { Button } from "@/components/ui/button";
import { Restaurant } from "@prisma/client";
import { ChevronLeftIcon, HeartIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface RestaurantImageProps {
  restaurant: Pick<Restaurant, "imageUrl" | "name">;
}

export function RestaurantImage({ restaurant }: RestaurantImageProps) {
  const router = useRouter();

  function handleBackClick() {
    router.back();
  }

  return (
    <div className="relative h-[250px] w-full lg:h-[380px] lg:w-[750px]">
      <Image
        src={restaurant.imageUrl}
        alt={restaurant.name}
        fill
        priority
        sizes="100vw"
        className="object-cover lg:rounded-md"
      />

      <Button
        className="absolute left-4 top-4 rounded-full bg-white text-foreground hover:text-white lg:hidden"
        size="icon"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>

      <Button
        size="icon"
        className="absolute right-4 top-4 rounded-full bg-gray-700"
      >
        <HeartIcon size={20} className="fill-white" />
      </Button>
    </div>
  );
}
