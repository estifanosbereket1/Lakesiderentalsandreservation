import { getFavListings } from "../actions/getFavListings";
import { getListing } from "../actions/getListings";
import { getUser } from "../actions/getUser";
import EmptyState from "../components/EmptyState";
import Heading from "../components/Heading";
import FavoriteClient from "./FavoriteClient";

const page = async () => {
  const currUser = await getUser();

  const fav = await getFavListings();
  if (fav.length === 0) {
    return (
      <Heading
        title="No Favorites Found"
        subtitle="Looks like you have no favorite Listing"
      />
    );
  }
  return (
    <div>
      <FavoriteClient listing={fav} currUser={currUser} />
    </div>
  );
};
export default page;
