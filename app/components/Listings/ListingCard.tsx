"use client";

import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import { Listing, Reservation } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

import { format } from "date-fns";
import Image from "next/image";
import HeartButton from "../HeartButton";
import Button from "../Button";
import useCountries from "@/app/hooks/useCountries";
import Link from "next/link";

interface ListingCardProps {
  data: SafeListing;
  onAction?: (id: string) => void;
  reservation?: SafeReservation;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currUser?: SafeUser | null | undefined;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  actionId = "",
  actionLabel,
  currUser,
  disabled,
  onAction,
  reservation,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);

  const handelCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled) {
        return;
      }
      onAction?.(actionId);
    },
    [onAction, actionId, disabled]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  {
    console.log(location);
  }
  return (
    // <div
    //   className="col-span-1 cursor-pointer group "
    //   onClick={() => router.push(`/listing/${data.id}`)}
    // >
    //   <div className="flex flex-col gap-2 w-full ">
    //     <div className="aspect-square w-full relative overflow-hidden rounded-xl ">
    //       <Image
    //         fill
    //         alt="listing"
    //         src={data.imageSrc}
    //         className="object-contain h-full w-full group-hover:scale-110 transition"
    //       />
    //       <div className="absolute top-3 right-3">
    //         <HeartButton listingId={data.id} currUser={currUser} />
    //       </div>
    //     </div>
    //     <div className="font-semibold text-lg">
    //       {location?.region} - {location?.label}
    //     </div>
    //     <div className="font-light text-neutral-500/70">
    //       {reservationDate || data.category}
    //     </div>
    //     <div className="font-bold text-neutral-900">
    //       {data.bathroomCount} baths{" "}
    //       <span className="text-xl text-neutral-400">.</span> {data.roomCount}{" "}
    //       rooms
    //     </div>
    //     <div className="flex flex-row gap-1">
    //       <div className="font-semibold"> $ {price}</div>
    //       {!reservation && <div className="font-light"> night</div>}
    //     </div>
    //     {actionLabel && onAction && (
    //       <Button
    //         disabled={disabled}
    //         label={actionLabel}
    //         onClick={handelCancel}
    //         small
    //       />
    //     )}
    //   </div>
    // </div>

    <div>
      <div className="relative">
        <div className="relative mx-auto aspect-[100/95] w-full overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={data.imageSrc}
            alt={data.title as string}
            fill
            priority
            quality={90}
            sizes="(max-width: 768px) 100vw"
            className="h-full w-full object-cover"
          />
        </div>
        {/* {tag && (
          <h1 className="absolute start-5 top-5 rounded-lg bg-white px-2.5 py-1.5 text-xs font-semibold dark:bg-gray-200">
            {tag}
          </h1>
        )} */}

        <div className="absolute top-3 right-3">
          <HeartButton listingId={data.id} currUser={currUser} />
        </div>

        {/* <WishlistButton className="absolute end-3 top-3" /> */}
      </div>
      <Link href={`/listing/${data.id}`}>
        <div className="pt-3">
          <div className="mb-1 flex items-center justify-between">
            <div className="max-w-[calc(100%-120px)] flex-grow">
              <h6 className="truncate font-semibold transition-colors hover:text-primary">
                {data.title}
              </h6>
            </div>
          </div>
          {/* <p className="mb-1 truncate">Stay with {hostname}</p> */}
          {/* <div className="flex items-center">
            {features.map((item: string) => (
              <span
                key={`${title}-${item}`}
                className="relative -inset-y-1/2 inline-block px-2 after:absolute after:-end-[1px] after:top-1/2 after:h-1 after:w-1 after:rounded-full after:bg-gray-500 first:ps-0 last:pe-0 last:after:hidden"
              >
                {item}
              </span>
            ))}

          </div> */}

          <div className="font-light text-neutral-500/70">
            {reservationDate || data.category}{" "}
          </div>
          <div className="font-bold text-neutral-900">
            {data.bathroomCount} baths{" "}
            <span className="text-xl text-neutral-400">.</span> {data.roomCount}{" "}
            rooms{" "}
          </div>
          <div className="mt-2 flex items-center font-semibold text-gray-900">
            $ {price} /night
          </div>
        </div>
      </Link>
      {actionLabel && onAction && (
        <Button
          disabled={disabled}
          label={actionLabel}
          onClick={handelCancel}
          small
        />
      )}
    </div>
  );
};
export default ListingCard;
