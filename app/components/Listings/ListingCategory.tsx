"use client";

import useCountries from "@/app/hooks/useCountries";
import { IconType } from "react-icons";

interface ListingCategoryProps {
  icon: IconType;
  description: string;
  label: string;
}

const ListingCategory: React.FC<ListingCategoryProps> = ({
  description,
  icon: Icon,
  label,
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center gap-4">
        <Icon size={40} className="text-neutral-600" />
        <div className="flex flex-col ">
          <div className="text-lg font-semibold">{label}</div>
          <div className="text-neutral-500 font-light">{description}</div>
        </div>
      </div>
    </div>
  );
};
export default ListingCategory;
