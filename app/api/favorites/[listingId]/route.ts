import { getUser } from "@/app/actions/getUser";
import prisma from "@/lib/connection";
import { NextResponse } from "next/server";

interface IParams {
  listingId?: string;
}

export const POST = async (
  request: Request,
  { params }: { params: IParams }
) => {
  const currUser = await getUser();
  if (!currUser) {
    return NextResponse.error();
  }
  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid Id");
  }

  let favouriteIds = [...(currUser.favouriteIds || [])];
  favouriteIds.push(listingId);

  const user = await prisma.user.update({
    where: {
      id: currUser.id,
    },
    data: {
      favouriteIds,
    },
  });

  return NextResponse.json(user);
};

export const DELETE = async (
  request: Request,
  { params }: { params: IParams }
) => {
  const currUser = await getUser();
  if (!currUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid Id");
  }

  let favouriteIds = [...(currUser.favouriteIds || [])];

  favouriteIds = favouriteIds.filter((id) => id !== listingId);

  const user = await prisma.user.update({
    where: {
      id: currUser.id,
    },
    data: {
      favouriteIds,
    },
  });

  return NextResponse.json(user);
};
