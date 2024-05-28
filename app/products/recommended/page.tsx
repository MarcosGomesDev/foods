import { Header } from "@/components/Header";
import { ProductList } from "@/components/ProductList";
import { db } from "@/lib/prisma";

export default async function RecommendedProductsPage() {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 20,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <>
      <Header />

      <ProductList
        className="py-6"
        title="Pedidos Recomendados"
        products={products}
        grid
      />
    </>
  );
}
