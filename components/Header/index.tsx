"use client";

import { useSideMenuService } from "@/services";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

export function Header() {
  const { showSideMenu } = useSideMenuService();

  return (
    <div className="container flex items-center justify-between px-5 pt-6">
      <Link href="/">
        <Image
          src="/logo.png"
          alt="Foods"
          width={100}
          height={30}
          className="object-cover"
          sizes="100px"
        />
      </Link>
      <Button
        size="icon"
        variant="outline"
        className="border-none bg-transparent"
        onClick={showSideMenu}
      >
        <MenuIcon />
      </Button>
    </div>
  );
}
