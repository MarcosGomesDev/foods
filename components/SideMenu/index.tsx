import { Separator } from "../ui/separator";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { LogoutUser } from "./components/LogoutUser";
import { MenuCategories } from "./components/MenuCategories";
import { MenuOptions } from "./components/MenuOptions";
import { UserData } from "./components/UserData";
import { MenuContainer } from "./MenuContainer";

export function SideMenu() {
  return (
    <MenuContainer>
      <SheetContent className="h-[100vh] w-[90vw]">
        <SheetHeader>
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>

        <UserData />

        <Separator className="my-6 bg-gray-300" />

        <MenuOptions />

        <Separator className="my-6 bg-gray-300" />

        <MenuCategories />

        <LogoutUser />
      </SheetContent>
    </MenuContainer>
  );
}
