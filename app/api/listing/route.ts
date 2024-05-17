// import { getUser } from "@/app/actions/getUser";
// import prisma from "@/lib/connection";
// import { NextResponse } from "next/server";

// export const POST = async (request: Request) => {
//   const currUser = await getUser();
//   if (!currUser) {
//     return NextResponse.error();
//   }

//   const body = await request.json();

//   const {
//     title,
//     description,
//     imageSrc,
//     category,
//     roomCount,
//     bathroomCount,
//     guestCount,
//     location,
//     price,
//   } = body;

//   const listing = await prisma.listing.create({
//     data: {
//       title,
//       bathroomCount,
//       category,
//       description,
//       imageSrc,
//       roomCount,
//       guestCount,
//       price: parseInt(price, 10),
//       locationValue: location.value,
//       user: { connect: { id: currUser.id } },
//       // userId: currUser.id,
//     },
//   });
//   return NextResponse.json(listing);
// };

import { getUser } from "@/app/actions/getUser";
import prisma from "@/lib/connection";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const currUser = await getUser();
  if (!currUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  const {
    title,
    description,
    imageSrc,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    location, // Expecting { latlng: [latitude, longitude], town: 'Town Name' }
    price,
  } = body;

  // Ensure location is provided and correctly structured
  if (!location || !location.latlng || location.latlng.length !== 2) {
    return NextResponse.error();
  }

  const [latitude, longitude] = location.latlng;

  const listing = await prisma.listing.create({
    data: {
      title,
      bathroomCount,
      category,
      description,
      imageSrc,
      roomCount,
      guestCount,
      price: parseInt(price, 10),
      locationValue: JSON.stringify({
        latitude,
        longitude,
        town: location.town,
      }),
      user: { connect: { id: currUser.id } },
    },
  });

  return NextResponse.json(listing);
};
