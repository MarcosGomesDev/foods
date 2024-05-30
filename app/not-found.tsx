"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex h-screen w-full flex-col justify-center px-12 py-8 md:flex-row md:py-28">
      <div className="flex w-full justify-center">
        <div className="relative mr-8 flex size-44 justify-center md:mr-0 md:h-auto md:w-auto">
          <Image src="/error.svg" alt="Error" fill className="object-cover" />
        </div>
      </div>
      <div className="mt-4 flex h-full flex-col md:ml-8 md:mt-0 md:px-8">
        <h2 className="pb-5 text-3xl md:text-6xl">Ops!</h2>
        <div className="h-4 pb-10 text-6xl font-bold md:text-8xl">404</div>
        <p className="mb-4 mt-10 text-lg md:mt-20 md:text-4xl">
          Você tentou acessar uma página que se perdeu pelo caminho.
        </p>
        <span className="md:text-xl">
          A página que você tentou acessar não existe mais, mas você pode
          começar um novo caminho voltando para a página inicial :)
        </span>

        <Button className="mt-6 w-36" onClick={() => router.push("/")}>
          Voltar ao início
        </Button>
      </div>
    </div>
  );
}
