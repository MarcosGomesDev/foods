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

  const juices = await db.product.findMany({
    where: {
      category: {
        name: "Sucos",
      },
    },
    include: {
      restaurant: true,
    },
    take: 10,
  });

  if (!product) {
    return notFound();
  }

  return (
    <div>
      <ProductImage product={product} />

      {/* TITLE & PRICE */}
      <ProductDetails product={product} suggestedProducts={juices} />
    </div>
  );
}
