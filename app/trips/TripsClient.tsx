"use client";

import { useRouter } from "next/navigation";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeReservation, SafeUser } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/Listings/ListingCard";

interface TripsClientProps {
  reservations: SafeReservation[];
  currUser: SafeUser | null;
}

const TripsClient: React.FC<TripsClientProps> = ({
  currUser,
  reservations,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");
  const onCancel = useCallback(
    async (id: string) => {
      setDeletingId(id);

      try {
        await axios.delete(`/api/reservation/${id}`);
        toast.success("reservation cancelled");
        router.refresh();
      } catch (error) {
        toast.error(`Error,${error}`);
      } finally {
        setDeletingId("");
      }
    },
    [router]
  );
  return (
    <div className="pt-10">
      <Container>
        <Heading
          title="Trips"
          subtitle="Where you've been and where you are going"
        />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {reservations.map((reservation) => (
            <ListingCard
              key={reservation.id}
              data={reservation.listing}
              reservation={reservation}
              actionId={reservation.id}
              onAction={onCancel}
              disabled={deletingId === reservation.id}
              actionLabel="Cancel Reservation"
              currUser={currUser}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};
export default TripsClient;
