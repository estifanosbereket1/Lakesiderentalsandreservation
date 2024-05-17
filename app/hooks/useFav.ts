import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import toast from "react-hot-toast";

import { SafeUser } from "../types";
import useLogin from "./useLogin";
import { list } from "postcss";

interface IUseFav {
  listingId: string;
  currUser: SafeUser | null | undefined;
}

const useFav = ({ listingId, currUser }: IUseFav) => {
  const router = useRouter();
  const loginModal = useLogin();

  const hasFav = useMemo(() => {
    const list = currUser?.favouriteIds || [];
    return list.includes(listingId);
  }, [currUser, listingId]);

  const toggleFav = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (!currUser) {
        return loginModal.onOpen();
      }

      try {
        let request;

        if (hasFav) {
          request = () => axios.delete(`/api/favorites/${listingId}`);
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`);
        }

        await request();
        router.refresh();
        toast.success("sucess");
      } catch (error) {
        toast.error("stg went wrong");
      }
    },
    [currUser, hasFav, listingId, loginModal, router]
  );
  return {
    hasFav,
    toggleFav,
  };
};

export default useFav;
