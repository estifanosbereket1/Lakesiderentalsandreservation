import { getListing } from "../actions/getListings";
import { getReservations } from "../actions/getReservations";
import { getUser } from "../actions/getUser";
import EmptyState from "../components/EmptyState";
import PropertiesClient from "./PropertiesClient";
import TripsClient from "./PropertiesClient";

const page = async () => {
  const currUser = await getUser();
  if (!currUser) {
    return <EmptyState title="unauthorized" subtitle="Please Login" />;
  }

  const listing = await getListing({ userId: currUser.id });

  if (listing.length === 0) {
    return (
      <EmptyState
        title="No Properties Found"
        subtitle="Looks like you have no Properties"
      />
    );
  }
  return (
    <div>
      <PropertiesClient listing={listing} currUser={currUser} />
    </div>
  );
};
export default page;
