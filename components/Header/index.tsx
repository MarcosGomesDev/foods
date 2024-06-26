"use client";

import { useSideMenuService } from "@/services";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { SearchInput } from "../SearchInput";
import { Button } from "../ui/button";

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  hiddenInput?: boolean;
}

export function Header({ hiddenInput = false, className }: HeaderProps) {
  const { showSideMenu } = useSideMenuService();

  return (
    <div
      className={twMerge([
        "sticky top-0 z-50 flex items-center border-b bg-white py-5",
        className,
      ])}
    >
      <div className="container flex items-center justify-between px-5">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Foods"
            width={100}
            height={30}
            priority
            className="object-cover"
            sizes="100px"
          />
        </Link>

        {!hiddenInput && (
          <SearchInput className="hidden max-w-[600px] flex-auto lg:flex" />
        )}

        <Button
          size="icon"
          variant="outline"
          className="border-none bg-transparent"
          onClick={showSideMenu}
          aria-label="Abrir menu lateral"
        >
          <MenuIcon />
        </Button>
      </div>
    </div>
  );
}
