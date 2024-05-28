import { Header } from "@/components/Header";
import { RestaurantList } from "@/components/RestaurantList";
import { db } from "@/lib/prisma";

export default async function RecommendedRestaurantsPage() {
  const restaurants = await db.restaurant.findMany({});

  return (
    <>
      <Header />
      <RestaurantList
        title="Restaurantes Recomendados"
        className="py-6"
        restaurants={restaurants}
        vertical
      />
    </>
  );
}
