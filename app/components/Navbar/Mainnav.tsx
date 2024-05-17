import { SafeUser } from "@/app/types";
import Navbar from "./Navbar";

interface MainNavProps {
  user?: SafeUser | null | undefined;
}

const Mainnav: React.FC<MainNavProps> = ({ user }) => {
  return (
    <div className="flex justify-between">
      <div>
        <Navbar user={user} />
      </div>
    </div>
  );
};
export default Mainnav;
