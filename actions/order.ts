"use server";

import { db } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function createOrder(data: Prisma.OrderCreateInput) {
  await db.order.create({ data });

  revalidatePath("/my-orders");
}
