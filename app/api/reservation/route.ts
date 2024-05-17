import { getUser } from "@/app/actions/getUser";
import prisma from "@/lib/connection";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const currUser = await getUser();

  if (!currUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  const { listingId, startDate, endDate, totalPrice } = body;

  if (!listingId || !startDate || !endDate) {
    return NextResponse.error();
  }

  const listingAndReservation = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      reservations: {
        create: {
          userId: currUser.id,
          startDate,
          endDate,
          totalPrice,
          createdAt: new Date(),
        },
      },
    },
  });

  return NextResponse.json(listingAndReservation);
};
