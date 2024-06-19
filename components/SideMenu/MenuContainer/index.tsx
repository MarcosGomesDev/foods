"use client";

import { Sheet } from "@/components/ui/sheet";
import { useSideMenu, useSideMenuService } from "@/services";

export function MenuContainer({ children }: { children: React.ReactNode }) {
  const menu = useSideMenu();
  const { hideSideMenu } = useSideMenuService();

  return (
    <Sheet open={menu} onOpenChange={hideSideMenu}>
      {children}
    </Sheet>
  );
}
