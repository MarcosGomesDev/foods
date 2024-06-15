"use client";

import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface SearchInputProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SearchInput({ className }: SearchInputProps) {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  function handleSearchSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    router.push(`/restaurants?search=${search}`);
  }

  return (
    <form
      className={twMerge(["flex gap-2", className])}
      onSubmit={handleSearchSubmit}
    >
      <Input
        type="search"
        placeholder="Buscar restaurantes"
        className="border-none"
        onChange={handleSearch}
        value={search}
      />
      <Button size="icon" type="submit" aria-label="Enviar pesquisa">
        <SearchIcon size={20} />
      </Button>
    </form>
  );
}
