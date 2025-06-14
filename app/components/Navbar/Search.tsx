"use client";

import useCountries from "@/app/hooks/useCountries";
import useSearch from "@/app/hooks/useSearch";
import { differenceInDays } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi";

const Search = () => {
  const searchModal = useSearch();

  const params = useSearchParams();

  const { getByValue } = useCountries();

  const locationValue = params?.get("locationValue");
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");
  const guestCount = params?.get("guestCount");
  const bathroomCount = params?.get("bathroomCount");
  const roomCount = params?.get("roomCount");

  // const locationLabel = useMemo(() => {
  //   if (locationValue) {
  //     return getByValue(locationValue as string)?.label;
  //   }
  //   return "Anywhere";
  // }, [getByValue, locationValue]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      let diff = differenceInDays(end, start);
      if (diff === 0) {
        diff = 1;
      }
      return `${diff} days`;
    }
    return "Any week";
  }, [startDate, endDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} guests`;
    }
    return "Add guests";
  }, [guestCount]);

  return (
    <div
      className="border-[1px] w-full md:w-auto rounded-full hover:shadow-md transition cursor-pointer"
      onClick={searchModal.onOpen}
    >
      <div className="flex flex-row items-center justify-between">
        <div className="text-sm font-semibold px-6">Any Where</div>
        <div className="hidden sm:block text-sm font font-semibold px-6 border-x-[1px] flex-1 text-center">
          {durationLabel}
        </div>
        <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
          <div className="hidden sm:block"> {guestLabel}</div>
          <div className="p-2 bg-black rounded-full text-white">
            <BiSearch />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Search;
