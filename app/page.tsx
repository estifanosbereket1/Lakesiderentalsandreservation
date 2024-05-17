import Image from "next/image";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import { IListingParams, getListing } from "./actions/getListings";
import ListingCard from "./components/Listings/ListingCard";
import { getURL } from "next/dist/shared/lib/utils";
import { getUser } from "./actions/getUser";
import { SafeListing } from "./types";
import { Suspense } from "react";

interface HomeProps {
  searchParams: IListingParams;
}

const LoadingFallback: React.FC = () => (
  <div className="flex justify-center items-center h-40">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListing(searchParams);
  const currUser = await getUser();

  let isEmpty = true;
  if (listings) {
    isEmpty = false;
  }

  if (isEmpty) {
    return <EmptyState showReset />;
  }
  return (
    <div>
      <Container>
        <div className="pt-40 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {listings.map((listing: SafeListing) => (
            <Suspense fallback={<LoadingFallback />} key={listing.id}>
              <ListingCard
                key={listing.id}
                data={listing}
                currUser={currUser}
              />
            </Suspense>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Home;
