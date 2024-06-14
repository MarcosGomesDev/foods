"use client";

import { create } from "zustand";
import { SideMenuService } from "./sideMenuTypes";

const sideMenuStore = create<SideMenuService>((set) => ({
  menu: false,
  showSideMenu: () =>
    set({
      menu: true,
    }),
  hideSideMenu: () =>
    set({
      menu: false,
    }),
}));

export function useSideMenuZustand(): SideMenuService["menu"] {
  return sideMenuStore((state) => state.menu);
}

export function useSideMenuServiceZustand(): Pick<
  SideMenuService,
  "showSideMenu" | "hideSideMenu"
> {
  const showSideMenu = sideMenuStore((state) => state.showSideMenu);
  const hideSideMenu = sideMenuStore((state) => state.hideSideMenu);

  return {
    showSideMenu,
    hideSideMenu,
  };
}
