import { getListingById } from "@/app/actions/getListingById";
import { getUser } from "@/app/actions/getUser";
import EmptyState from "@/app/components/EmptyState";
import { list } from "postcss";
import ListingClient from "./ListingClient";
import { log } from "console";
import { getReservations } from "@/app/actions/getReservations";

interface IParams {
  listingId: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);

  const currUser = getUser();
  const reservations = await getReservations(params);

  if (!listing) {
    return <EmptyState />;
  }
  console.log(listing);

  return (
    <div>
      <ListingClient
        listing={listing}
        reservations={reservations}
        currUser={currUser}
      />
    </div>
  );
};
export default ListingPage;
