"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LogOutIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

export function LogoutUser() {
  const { data } = useSession();

  function handleSignOutClick(): void {
    signOut();
  }

  return (
    <>
      {data?.user && (
        <>
          <Separator className="my-6 bg-gray-300" />
          <Button
            variant="ghost"
            className="w-full justify-start space-x-3 text-sm font-normal"
            onClick={handleSignOutClick}
          >
            <LogOutIcon size={16} />
            <span className="block">Sair da conta</span>
          </Button>
        </>
      )}
    </>
  );
}
