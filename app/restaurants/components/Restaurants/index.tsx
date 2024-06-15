"use client";

import { searchForRestaurants } from "@/actions/search";
import { Header } from "@/components/Header";
import { RestaurantItem } from "@/components/RestaurantItem";
import { Restaurant } from "@prisma/client";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function Restaurants() {
  const searchParams = useSearchParams();

  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    async function fetchRestaurants() {
      const searchFor = searchParams.get("search");

      if (!searchFor) return;
      const foundRestaurants = await searchForRestaurants(searchFor);

      setRestaurants(foundRestaurants);
    }

    fetchRestaurants();
  }, [searchParams]);

  const searchFor = searchParams.get("search");

  if (!searchFor) {
    return notFound();
  }

  return (
    <>
      <Header />
      <div className="container px-5 py-6">
        <h2 className="mb-6 text-lg font-semibold">
          Restaurantes Recomendados
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              key={restaurant.id}
              restaurant={restaurant}
              className="min-w-full"
            />
          ))}
        </div>
      </div>
    </>
  );
}
