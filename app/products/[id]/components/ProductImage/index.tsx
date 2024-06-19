"use client";

import { Button } from "@/components/ui/button";
import { Product } from "@prisma/client";
import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductImageProps {
  product: Pick<Product, "name" | "imageUrl">;
}

export function ProductImage({ product }: ProductImageProps) {
  const router = useRouter();

  function handleBackClick() {
    router.back();
  }

  return (
    <div className="relative h-[360px] w-full rounded-md shadow-md lg:h-[500px] lg:min-w-[600px] lg:max-w-[600px]">
      <Image
        src={product.imageUrl}
        alt={product.name}
        fill
        priority
        sizes="100vw"
        className="object-cover lg:rounded-md"
      />

      <Button
        className="absolute left-4 top-4 rounded-full border-[0.4px] border-solid border-muted-foreground bg-white text-foreground hover:border-none hover:text-white lg:hidden"
        size="icon"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>
    </div>
  );
}
