import { Header } from "@/components/Header";
import { RestaurantItem } from "@/components/RestaurantItem";
import { db } from "@/lib/prisma";

export default async function RecommendedRestaurantsPage() {
  const restaurants = await db.restaurant.findMany({});

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
