"use server";

import { db } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

interface GetCategoriesInput {
  skip?: number;
  take?: number;
  cursor?: Prisma.CategoryWhereUniqueInput;
  where?: Prisma.CategoryWhereInput;
  orderBy?: Prisma.CategoryOrderByWithRelationInput;
}

export async function getCategories({
  take,
  skip,
  cursor,
  where,
  orderBy,
}: GetCategoriesInput = {}) {
  return db.category.findMany({
    take,
    skip,
    cursor,
    where,
    orderBy,
  });
}
