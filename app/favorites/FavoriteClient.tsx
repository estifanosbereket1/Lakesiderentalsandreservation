import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/Listings/ListingCard";
import { SafeListing, SafeUser } from "../types";

interface FavoriteClientProps {
  listing: SafeListing[];
  currUser: SafeUser | null | undefined;
}

const FavoriteClient: React.FC<FavoriteClientProps> = ({
  currUser,
  listing,
}) => {
  return (
    <div>
      <Container>
        <Heading
          title="Favorites "
          subtitle="List of places you have favorited"
        />
        <div className="grid mt-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {listing.map((listing) => (
            <ListingCard key={listing.id} data={listing} currUser={currUser} />
          ))}
        </div>
      </Container>
    </div>
  );
};
export default FavoriteClient;
