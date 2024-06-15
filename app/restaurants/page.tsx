import { Suspense } from "react";
import { Restaurants } from "./components/Restaurants";

export default function RestaurantsPage() {
  return (
    <Suspense>
      <Restaurants />
    </Suspense>
  );
}
