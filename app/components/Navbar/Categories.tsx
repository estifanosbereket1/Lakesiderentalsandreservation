"use client";

import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import Container from "../Container";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import CategoryBox from "../CategoryBox";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import qs from "querystring";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";

export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This property is close to the beach",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "This property has windmills",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This property is Villa",
  },
  {
    label: "CountrySide",
    icon: TbMountain,
    description: "This property is in the country side",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "This property has Pool",
  },
  {
    label: "Island",
    icon: GiIsland,
    description: "This property is on Island",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This property is close to a lake",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "This property has skiing activities",
  },
  {
    label: "Castle",
    icon: GiCastle,
    description: "This property is in a Castle",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "This property has camping activities",
  },
  {
    label: "Arctic",
    icon: BsSnow,
    description: "This property is in Arctic ",
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    description: "This property has cave entrance",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "This property is in the Desret",
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "This property is in Barn",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "This property is Luxourious",
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");

  const pathName = usePathname();
  const isMainPage = pathName === "/";
  if (!isMainPage) {
    return null;
  }
  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
};
export default Categories;
