import { useQuantitySelector, useQuantitySelectorService } from "@/services";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "../ui/button";

export function QuantitySelector() {
  const quantity = useQuantitySelector();
  const { handleIncreaseQuantity, handleDecreaseQuantity } =
    useQuantitySelectorService();

  return (
    <div className="flex items-center gap-3 text-center">
      <Button
        size="icon"
        variant="ghost"
        disabled={quantity === 1}
        className="border border-solid border-muted-foreground hover:bg-transparent"
        onClick={handleDecreaseQuantity}
      >
        <ChevronLeftIcon />
      </Button>
      <span className="w-4">{quantity}</span>
      <Button size="icon" onClick={handleIncreaseQuantity}>
        <ChevronRightIcon />
      </Button>
    </div>
  );
}
