import { getCategories } from "@/actions/get-categories";
import { MenuCategory } from "./components/MenuCategory";

export async function MenuCategories() {
  const categories = await getCategories({ take: 7 });

  return (
    <div>
      <div className="space-y-3">
        {categories.map((category) => (
          <MenuCategory key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
