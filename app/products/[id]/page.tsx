import { Header } from "@/components/Header";
import { ProductList } from "@/components/ProductList";
import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { AddToBagButton } from "./components/AddToBagButton";
import { ProductDetails } from "./components/ProductDetails";
import { ProductImage } from "./components/ProductImage";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({
  params: { id },
}: ProductPageProps) {
  const product = await db.product.findUnique({
    where: { id },
    include: {
      restaurant: true,
    },
  });

  if (!product) {
    return notFound();
  }

  const juices = await db.product.findMany({
    where: {
      category: {
        name: "Sucos",
      },
      restaurantId: {
        equals: product.restaurantId,
      },
    },
    include: {
      restaurant: true,
    },
    take: 10,
  });

  return (
    <>
      <Header className="hidden lg:flex" />
      <div className="container">
        <div className="flex flex-col lg:mt-6 lg:flex-row lg:gap-6 lg:px-5">
          <ProductImage product={product} />

          {/* TITLE & PRICE */}
          <ProductDetails product={product} />
        </div>

        <ProductList
          title="Sucos"
          products={juices}
          className="space-y-4 pt-6"
        />

        <div className="mt-6 px-5 lg:hidden">
          <AddToBagButton product={product} />
        </div>
      </div>
    </>
  );
}
