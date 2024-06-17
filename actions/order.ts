"use server";

import { db } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function createOrder(data: Prisma.OrderCreateInput) {
  const order = await db.order.create({ data });

  return order;
}
