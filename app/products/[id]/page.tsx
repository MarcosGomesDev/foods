import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";
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
    <div>
      <ProductImage product={product} />

      {/* TITLE & PRICE */}
      <ProductDetails product={product} suggestedProducts={juices} />
    </div>
  );
}
