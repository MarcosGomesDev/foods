import { ProductList } from "@/components/ProductList";
import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { RestaurantDetails } from "./components/RestaurantDetails";
import { RestaurantImage } from "./components/RestaurantImage";

interface RestaurantPageProps {
  params: {
    id: string;
  };
}

export default async function RestaurantPage({
  params: { id },
}: RestaurantPageProps) {
  const restaurant = await db.restaurant.findUnique({
    where: { id },
    include: {
      categories: {
        include: {
          products: {
            where: {
              restaurantId: id,
            },
            include: {
              restaurant: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      products: {
        take: 10,
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!restaurant) {
    return notFound();
  }

  return (
    <div>
      <RestaurantImage restaurant={restaurant} />

      <RestaurantDetails restaurant={restaurant} />

      <div className="mt-3 flex gap-4 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden">
        {restaurant.categories.map((category) => (
          <div
            key={category.id}
            className="min-w-[167px] rounded-lg bg-muted-foreground text-center"
          >
            <span className="text-xs text-muted-foreground">
              {category.name}
            </span>
          </div>
        ))}
      </div>

      <ProductList
        className="mt-6 space-y-4"
        title="Mais Pedidos"
        products={restaurant.products}
      />

      {restaurant.categories.map((category) => (
        <ProductList
          key={category.id}
          className="mt-6 space-y-4"
          title={category.name}
          products={category.products}
        />
      ))}
    </div>
  );
}