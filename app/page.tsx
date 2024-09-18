import Main from "./_components/Main";
import ProductsList from "./_components/ProductsList";
import ScrollToTopButton from "./_components/ScrollToTopButton";
import Footer from "./_components/Footer";
import { Suspense } from "react";
import Spinner from "./loading";
import NavBarServer from "./_components/NavBarServer";
import { Session } from "next-auth";
import { SearchProvider } from "./_components/SearchContext";

interface HomepageProps {
  session: Session | null;
  products: { id: number; name: string }[];
}

export default function Homepage({ session, products }: HomepageProps) {
  return (
    <SearchProvider products={products}>
      <div>
        <NavBarServer showSearch={true} session={session} />
      </div>
      <Main>
        <Suspense fallback={<Spinner />}>
          <ProductsList />
        </Suspense>
        <ScrollToTopButton />
      </Main>
      <Footer />
    </SearchProvider>
  );
}
