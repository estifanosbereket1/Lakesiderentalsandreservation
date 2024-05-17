import { getUser } from "@/app/actions/getUser";
import prisma from "@/lib/connection";
import { NextResponse } from "next/server";

interface IParams {
  reservationId?: string;
}

export const DELETE = async (
  request: Request,
  { params }: { params: IParams }
) => {
  const { reservationId } = params;
  const currUser = await getUser();

  if (!currUser) {
    return NextResponse.error();
  }

  if (!reservationId || typeof reservationId !== "string") {
    throw new Error("invalid id");
  }

  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [{ userId: currUser.id }, { listing: { userId: currUser.id } }],
    },
  });

  return NextResponse.json(reservation);
};
