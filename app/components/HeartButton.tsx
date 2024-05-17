"use client";

import { User } from "@prisma/client";
import { SafeUser } from "../types";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import useFav from "../hooks/useFav";

interface HeartButtonProps {
  listingId: string;
  currUser: SafeUser | null | undefined;
}

const HeartButton: React.FC<HeartButtonProps> = ({ currUser, listingId }) => {
  console.log(currUser);
  const { hasFav, toggleFav } = useFav({ listingId, currUser });

  return (
    <div
      className="transition cursor-pointer hover:opacity-80 relative"
      onClick={toggleFav}
    >
      <AiOutlineHeart
        size={28}
        className="-top-[2px] -right-[2px] fill-white absolute"
      />
      <AiFillHeart
        size={24}
        className={`${hasFav ? "fill-rose-500" : "fill-neutral-500/70"}`}
      />
    </div>
  );
};
export default HeartButton;
