"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogInIcon } from "lucide-react";
import { signIn, useSession } from "next-auth/react";

export function UserData() {
  const { data } = useSession();

  function handleSignInClick(): void {
    signIn();
  }

  return (
    <>
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
    </>
  );
}
