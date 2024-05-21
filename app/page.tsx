import Image from "next/image";
import { CategoryList } from "./components/CategoryList";
import { Header } from "./components/Header";
import { ProductList } from "./components/ProductList";
import { SearchInput } from "./components/SearchInput";

export default function Home() {
  return (
    <>
      <Header />
      <SearchInput className="px-5 pt-6" />

      <CategoryList className="px-5 pt-6" />

      <div className="px-5 pt-6">
        <Image
          src="/promo-banner-01.png"
          alt="Até 30% de desconto em pizzas"
          width={0}
          height={0}
          className="h-auto w-full object-contain"
          sizes="100vw"
          quality={100}
        />
      </div>

      <ProductList className="space-y-4 px-5 pt-6" />
    </>
  );
}
