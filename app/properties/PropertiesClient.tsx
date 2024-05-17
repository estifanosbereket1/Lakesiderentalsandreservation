"use client";

import { useRouter } from "next/navigation";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeListing, SafeReservation, SafeUser } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/Listings/ListingCard";

interface PropertiesClientProps {
  listing: SafeListing[];
  currUser: SafeUser | null;
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
  currUser,
  listing,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");
  const onCancel = useCallback(
    async (id: string) => {
      setDeletingId(id);

      try {
        await axios.delete(`/api/listing/${id}`);
        toast.success("Listing Deleted");
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
        <Heading title="Properties" subtitle="List of your properties" />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {listing.map((listing) => (
            <ListingCard
              key={listing.id}
              data={listing}
              actionId={listing.id}
              onAction={onCancel}
              disabled={deletingId === listing.id}
              actionLabel="Delete Property"
              currUser={currUser}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};
export default PropertiesClient;
