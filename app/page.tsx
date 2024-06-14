import Image from "next/image";
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
      <Header hiddenInput />
      <SearchInput className="px-5 pt-6 lg:hidden" />

      <div className="relative hidden h-[500px] w-full justify-between overflow-hidden bg-red-600 px-28 lg:flex">
        <div className="flex h-full flex-col justify-center space-y-4 text-left text-white">
          <h3 className=" text-5xl font-bold ">Esta com fome?</h3>
          <p>
            Com apenas alguns cliques, encontre refeições acessíveis perto de
            você.
          </p>
          <div className="flex h-[88px] w-[658px] items-center rounded-md bg-white p-5">
            <SearchInput className="w-full text-black" />
          </div>
        </div>
        <div className="absolute bottom-0 right-36 drop-shadow-2xl">
          <Image
            src="/banner-desktop.png"
            alt="Imagem banner"
            priority
            width={372}
            height={372}
            className="h-auto w-[372px]"
          />
        </div>
      </div>

      <CategoryList className="px-5 pb-1 pt-6 lg:mt-10" />

      <div className="px-5 pt-6 lg:hidden">
        <PromoBanner
          href={"/"}
          src="/promo-banner-01.png"
          alt="Até 30% de desconto em pizzas"
          priority
        />
      </div>

      <ProductList
        className="space-y-4 pt-6 lg:mt-10"
        title="Pedidos Recomendados"
        hasButton
        products={products}
        href="/products/recommended"
      />

      <div className="px-5 pt-6 lg:hidden">
        <PromoBanner
          href={"/"}
          src="/promo-banner-02.png"
          alt="A partir de R$ 17,90 em lanches"
          priority
        />
      </div>

      <div className="container mt-10 hidden justify-center gap-4 px-5 pt-6 lg:flex">
        <PromoBanner
          href={"/"}
          src="/promo-banner-01-desk.png"
          alt="Até 30% de desconto em pizzas"
          priority
          className="w-[610px]"
        />
        <PromoBanner
          href={"/"}
          src="/promo-banner-02-desk.png"
          alt="A partir de R$ 17,90 em lanches"
          priority
          className="w-[610px]"
        />
      </div>

      <RestaurantList
        className="space-y-4 py-6 lg:mt-10"
        title="Restaurantes Recomendados"
        hasButton
        restaurants={restaurants}
        href="/restaurants/recommended"
      />
    </>
  );
}
