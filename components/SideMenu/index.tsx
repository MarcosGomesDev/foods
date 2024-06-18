"use client";

import { useSideMenu, useSideMenuService } from "@/services";
import {
  HeartIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  ScrollTextIcon,
} from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

export function SideMenu() {
  const menu = useSideMenu();
  const { data } = useSession();
  const { hideSideMenu } = useSideMenuService();

  function handleSignOutClick(): void {
    signOut();
  }

  function handleSignInClick(): void {
    signIn();
  }

  return (
    <Sheet open={menu} onOpenChange={hideSideMenu}>
      <SheetContent className="w-[90vw]">
        <SheetHeader>
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>

        {data?.user ? (
          <div className="flex justify-between pt-6">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={data?.user?.image as string | undefined} />
                <AvatarFallback>
                  {data?.user?.name?.charAt(0)}
                  {data?.user?.name?.charAt(1)}
                </AvatarFallback>
              </Avatar>

              <div>
                <h3 className="font-semibold">{data?.user?.name}</h3>
                <span className="block text-xs text-muted-foreground">
                  {data?.user?.email}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between pt-10">
            <h2 className="font-semibold">Olá. Faça seu login!</h2>
            <Button size="icon" onClick={handleSignInClick}>
              <LogInIcon />
            </Button>
          </div>
        )}

        <Separator className="my-6" />

        <div className="space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start space-x-3 text-sm font-normal"
            asChild
          >
            <Link href="/">
              <HomeIcon size={16} />
              <span className="block">Início</span>
            </Link>
          </Button>

          {data?.user && (
            <>
              <Button
                variant="ghost"
                className="w-full justify-start space-x-3 text-sm font-normal"
                asChild
              >
                <Link href="/my-orders">
                  <ScrollTextIcon size={16} />
                  <span className="block">Meus Pedidos</span>
                </Link>
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start space-x-3 text-sm font-normal"
              >
                <HeartIcon size={16} />
                <span className="block">Restaurantes Favoritos</span>
              </Button>
            </>
          )}
        </div>

        <Separator className="my-6" />

        {data?.user && (
          <Button
            variant="ghost"
            className="w-full justify-start space-x-3 text-sm font-normal"
            onClick={handleSignOutClick}
          >
            <LogOutIcon size={16} />
            <span className="block">Sair da conta</span>
          </Button>
        )}
      </SheetContent>
    </Sheet>
  );
}
