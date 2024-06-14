import { Restaurant } from "@prisma/client";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { RestaurantItem } from "../RestaurantItem";
import { Button } from "../ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

interface RestaurantListProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  hasButton?: boolean;
  href?: string;
  restaurants: Restaurant[];
}

export function RestaurantList({
  className,
  title,
  hasButton = false,
  href = "/restaurants",
  restaurants,
}: RestaurantListProps) {
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
            {restaurants.map((restaurant, index) => (
              <CarouselItem
                key={restaurant.id}
                className={twMerge([
                  "min-w-[266px] max-w-[266px] lg:min-w-[381px] lg:max-w-[381px]",
                  index === 0 && "ml-5 lg:ml-0",
                  index === restaurants.length - 1 && "mr-5 lg:mr-0",
                ])}
              >
                <RestaurantItem restaurant={restaurant} />
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
