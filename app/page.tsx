import { CategoryList } from "./components/CategoryList";
import { Header } from "./components/Header";
import { SearchInput } from "./components/SearchInput";

export default function Home() {
  return (
    <>
      <Header />
      <SearchInput className="px-5 pt-6" />

      <CategoryList className="px-5 pt-6" />
    </>
  );
}
