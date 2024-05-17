import prisma from "@/lib/connection";
import { NextResponse } from "next/server";
import { getUser } from "./getUser";

export const getFavListings = async () => {
  try {
    const currUser = await getUser();
    if (!currUser) {
      return [];
    }

    const fav = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currUser.favouriteIds || [])],
        },
      },
    });

    const safeFav = fav.map((fav) => ({
      ...fav,
      createdAt: fav.createdAt.toISOString(),
    }));

    return safeFav;
  } catch (error: any) {
    throw new Error(error);
  }
};
