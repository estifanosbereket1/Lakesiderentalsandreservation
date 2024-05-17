import { getReservations } from "../actions/getReservations";
import { getUser } from "../actions/getUser";
import EmptyState from "../components/EmptyState";
import ReservationsClient from "./ReservationsClient";

const page = async () => {
  const currUser = await getUser();
  if (!currUser) {
    return <EmptyState title="Unauthorized" subtitle="Please Login" />;
  }
  const reservations = await getReservations({ authorId: currUser.id });
  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No Reservations found"
        subtitle="no reservation on ur property"
      />
    );
  }

  return (
    <div>
      <ReservationsClient reservations={reservations} currUser={currUser} />
    </div>
  );
};
export default page;
