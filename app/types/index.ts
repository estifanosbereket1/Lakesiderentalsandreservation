import { Listing, Reservation, User } from "@prisma/client";

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | undefined;
};

export type SafeListing = Omit<Listing, "createdAt"> & {
  createdAt: string;
};

export type SafeReservation = Omit<
  Reservation,
  "createdAt" | "updatedAt" | "endDate" | "listing " | "startDate"
> & {
  createdAt: string;
  updatedAt: string;
  endDate: string;
  listing: SafeListing;
  startDate: string;
};
