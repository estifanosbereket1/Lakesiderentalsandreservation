import { SafeUser } from "@/app/types";
import Heading from "../Heading";
import { title } from "process";
import Image from "next/image";
import HeartButton from "../HeartButton";
import useCountries from "@/app/hooks/useCountries";

interface ListingHeadProps {
  title: string;
  imageSrc: string;
  locationValue: string;
  id: string;
  currUser?: SafeUser | null | undefined;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  currUser,
  id,
  imageSrc,
  locationValue,
  title,
}) => {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);
  return (
    <>
      <Heading title={title} />
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image
          alt="image"
          src={imageSrc}
          fill
          className="object-cover w-full"
        />
        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} currUser={currUser} />
        </div>
      </div>
    </>
  );
};
export default ListingHead;
