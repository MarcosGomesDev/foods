import { CategoryList } from "../components/CategoryList";
import { Header } from "../components/Header";
import { ProductList } from "../components/ProductList";
import { PromoBanner } from "../components/PromoBanner";
import { RestaurantList } from "../components/RestaurantList";
import { SearchInput } from "../components/SearchInput";
import { db } from "../lib/prisma";

export default async function Home() {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 10,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });

  const restaurants = await db.restaurant.findMany({
    take: 10,
  });

  return (
    <>
      <Header />

      <SearchInput className="px-5 pt-6" />

      <CategoryList className="px-5 pb-1 pt-6" />

      <div className="px-5 pt-6">
        <PromoBanner
          src="/promo-banner-01.png"
          alt="Até 30% de desconto em pizzas"
          priority
        />
      </div>

      <ProductList
        className="space-y-4 pt-6"
        title="Pedidos Recomendados"
        hasButton
        products={products}
        href="/products/recommended"
      />

      <div className="px-5 pt-6">
        <PromoBanner
          src="/promo-banner-02.png"
          alt="A partir de R$ 17,90 em lanches"
          priority
        />
      </div>

      <RestaurantList
        className="space-y-4 py-6"
        title="Restaurantes Recomendados"
        hasButton
        restaurants={restaurants}
        href="/restaurants/recommended"
      />
    </>
  );
}
