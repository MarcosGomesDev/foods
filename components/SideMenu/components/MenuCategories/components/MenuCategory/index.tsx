"use client";

import { Button } from "@/components/ui/button";
import { useSideMenuService } from "@/services";
import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface CategoryProps {
  category: Category;
}

export function MenuCategory({ category }: CategoryProps) {
  const { hideSideMenu } = useSideMenuService();
  const pathname = usePathname();

  return (
    <Button
      variant={pathname.includes(category.id) ? "default" : "ghost"}
      className="flex items-center justify-start gap-2 px-4 py-[0.50rem] font-normal"
      asChild
      onClick={hideSideMenu}
    >
      <Link href={`/categories/${category.id}/products`}>
        <Image
          src={category.imageUrl}
          width={22}
          height={22}
          alt={category.name}
        />
        <p className="text-sm">{category.name}</p>
      </Link>
    </Button>
  );
}
