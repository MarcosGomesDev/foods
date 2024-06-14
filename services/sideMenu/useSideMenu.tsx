"use client";

import { SideMenuService } from "./sideMenuTypes";
import {
  useSideMenuServiceZustand,
  useSideMenuZustand,
} from "./useSideMenuZustand";

export function useSideMenu(): SideMenuService["menu"] {
  return useSideMenuZustand();
}

export function useSideMenuService(): Pick<
  SideMenuService,
  "showSideMenu" | "hideSideMenu"
> {
  return useSideMenuServiceZustand();
}
