import { getReservations } from "../actions/getReservations";
import { getUser } from "../actions/getUser";
import EmptyState from "../components/EmptyState";
import TripsClient from "./TripsClient";

const page = async () => {
  const currUser = await getUser();
  if (!currUser) {
    return <EmptyState title="unauthorized" subtitle="Please Login" />;
  }

  const reservations = await getReservations({ userId: currUser.id });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title=" No Trips Found"
        subtitle="Looks like you havent reserved any trips"
      />
    );
  }
  return (
    <div>
      <TripsClient reservations={reservations} currUser={currUser} />
    </div>
  );
};
export default page;
