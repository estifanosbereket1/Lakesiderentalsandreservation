import { getUser } from "@/app/actions/getUser";
import prisma from "@/lib/connection";
import { NextResponse } from "next/server";

interface IParams {
  listingId?: string;
}

export const DELETE = async (
  request: Request,
  { params }: { params: IParams }
) => {
  const { listingId } = params;
  const currUser = await getUser();
  if (!currUser) {
    return NextResponse.error();
  }

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid Id");
  }

  const listing = await prisma.listing.deleteMany({
    where: {
      id: listingId,
      userId: currUser.id,
    },
  });

  return NextResponse.json(listing);
};
