"use client";
import { useSideMenu, useSideMenuService } from "@/services";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

export function SideMenu() {
  const menu = useSideMenu();
  const { hideSideMenu } = useSideMenuService();

  return (
    <Sheet open={menu} onOpenChange={hideSideMenu}>
      <SheetContent className="w-[90vw]">
        <SheetHeader>
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
