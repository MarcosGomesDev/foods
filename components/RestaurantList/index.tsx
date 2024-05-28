import { Restaurant } from "@prisma/client";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { RestaurantItem } from "../RestaurantItem";
import { Button } from "../ui/button";

interface RestaurantListProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  hasButton?: boolean;
  vertical?: boolean;
  href?: string;
  grid?: boolean;
  restaurants: Restaurant[];
}

export function RestaurantList({
  className,
  title,
  hasButton = false,
  vertical = false,
  grid = false,
  href = "/restaurants",
  restaurants,
}: RestaurantListProps) {
  return (
    <div className={twMerge([className])}>
      <div className="mb-6 flex items-center justify-between px-5">
        {title && <h2 className="font-semibold">{title}</h2>}
        {hasButton && (
          <Link href={href}>
            <Button
              variant="ghost"
              className="h-fit p-0 text-primary hover:bg-transparent"
            >
              Ver todos
              <ChevronRightIcon size={16} />
            </Button>
          </Link>
        )}
      </div>

      <div
        className={twMerge([
          "flex gap-4 overflow-x-scroll [&::-webkit-scrollbar]:hidden",
          vertical && "mt-6 flex-col gap-6 px-5",
          grid && `grid grid-cols-2 gap-6`,
        ])}
      >
        {restaurants.map((restaurant, index) => (
          <RestaurantItem
            key={restaurant.id}
            restaurant={restaurant}
            className={twMerge([
              index === 0 && !vertical && !grid ? "ml-5" : "",
              index === restaurants.length - 1 && !vertical && !grid
                ? "mr-5"
                : "",
              (vertical || grid) && "min-w-full",
            ])}
          />
        ))}
      </div>
    </div>
  );
}
