import { db } from "@/lib/prisma";
import React from "react";
import { twMerge } from "tailwind-merge";
import { CategoryItem } from "../CategoryItem";

interface CategoryListProps extends React.HTMLAttributes<HTMLDivElement> {}

export async function CategoryList({ className }: CategoryListProps) {
  const categories = await db.category.findMany();

  return (
    <div className={twMerge(["flex gap-3 overflow-x-scroll", className])}>
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
}
