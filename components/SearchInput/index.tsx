import { SearchIcon } from "lucide-react";
import React from "react";
import { twMerge } from "tailwind-merge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface SearchInputProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SearchInput({ className }: SearchInputProps) {
  return (
    <div className={twMerge(["flex gap-2", className])}>
      <Input
        type="search"
        placeholder="Buscar restaurantes"
        className="border-none bg-white"
      />
      <Button size="icon">
        <SearchIcon size={20} />
      </Button>
    </div>
  );
}
