import { Restaurant } from "@prisma/client";
import { ChevronRightIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { RestaurantItem } from "../RestaurantItem";
import { Button } from "../ui/button";

interface RestaurantListProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  hasButton?: boolean;
  restaurants: Restaurant[];
}

export function RestaurantList({
  className,
  title,
  hasButton = false,
  restaurants,
}: RestaurantListProps) {
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
        {restaurants.map((restaurant, index) => (
          <RestaurantItem
            key={restaurant.id}
            restaurant={restaurant}
            className={twMerge([
              index === 0 ? "ml-5" : "",
              index === restaurants.length - 1 ? "mr-5" : "",
            ])}
          />
        ))}
      </div>
    </div>
  );
}
