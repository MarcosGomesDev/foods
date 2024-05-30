"use client";

import { searchForRestaurants } from "@/actions/search";
import { Header } from "@/components/Header";
import { RestaurantList } from "@/components/RestaurantList";
import { Restaurant } from "@prisma/client";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function RestaurantsPage() {
  const searchParams = useSearchParams();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const searchFor = searchParams.get("search");

  useEffect(() => {
    async function fetchRestaurants() {
      if (!searchFor) return;
      const foundRestaurants = await searchForRestaurants(searchFor);

      setRestaurants(foundRestaurants);
    }

    fetchRestaurants();
  }, [searchFor]);

  if (!searchFor) {
    return notFound();
  }

  return (
    <>
      <Header />
      <RestaurantList
        title="Restaurantes Encontrados"
        className="py-6"
        restaurants={restaurants}
        vertical
      />
    </>
  );
}
