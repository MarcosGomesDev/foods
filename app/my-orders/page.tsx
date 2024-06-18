import { Header } from "@/components/Header";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { OrderItem } from "./components/OrderItem";

export default async function MyOrdersPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect("/");
  }

  const orders = await db.order.findMany({
    where: { userId: session.user.id },
    include: {
      restaurant: true,
      products: {
        include: {
          product: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <Header />

      <div className="container px-5 py-6">
        <h2 className="text-lg font-semibold">Meus Pedidos</h2>

        <div className="space-y-3 pt-6">
          {orders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </div>
      </div>
    </>
  );
}
