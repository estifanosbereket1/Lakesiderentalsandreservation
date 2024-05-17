"use client";

import toast from "react-hot-toast";
import { SafeReservation, SafeUser } from "../types";
import axios from "axios";
import { useCallback, useState } from "react";
import Heading from "../components/Heading";
import Container from "../components/Container";
import ListingCard from "../components/Listings/ListingCard";
import { useRouter } from "next/navigation";

interface ReservationsClientProps {
  reservations: SafeReservation[];
  currUser: SafeUser;
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
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
    <div>
      <Container>
        <Heading title="reservations" subtitle="Bookings on your properties" />
        <div className="grid mt-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {reservations.map((reservations) => (
            <ListingCard
              key={reservations.id}
              data={reservations.listing}
              reservation={reservations}
              actionId={reservations.id}
              onAction={onCancel}
              disabled={deletingId === reservations.id}
              actionLabel="Cancel Your Reservation"
            />
          ))}
        </div>
      </Container>
    </div>
  );
};
export default ReservationsClient;
