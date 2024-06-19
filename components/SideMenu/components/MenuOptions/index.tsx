"use client";

import { Button } from "@/components/ui/button";
import { useSideMenuService } from "@/services";
import { HeartIcon, HomeIcon, ScrollTextIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MenuOptions() {
  const { data } = useSession();
  const pathname = usePathname();
  const { hideSideMenu } = useSideMenuService();

  return (
    <div className="space-y-2">
      <Button
        variant={pathname === "/" ? "default" : "ghost"}
        className="w-full justify-start space-x-3 text-sm font-normal"
        asChild
      >
        <Link href="/" onClick={hideSideMenu}>
          <HomeIcon size={16} />
          <span className="block">Início</span>
        </Link>
      </Button>

      {data?.user && (
        <>
          <Button
            variant={pathname === "/my-orders" ? "default" : "ghost"}
            className="w-full justify-start space-x-3 text-sm font-normal"
            asChild
            onClick={hideSideMenu}
          >
            <Link href="/my-orders">
              <ScrollTextIcon size={16} />
              <span className="block">Meus Pedidos</span>
            </Link>
          </Button>

          <Button
            variant={pathname === "/favorites" ? "default" : "ghost"}
            className="w-full justify-start space-x-3 text-sm font-normal"
            onClick={hideSideMenu}
          >
            <HeartIcon size={16} />
            <span className="block">Restaurantes Favoritos</span>
          </Button>
        </>
      )}
    </div>
  );
}
