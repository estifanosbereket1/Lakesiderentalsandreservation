"use client";

import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { SafeUser } from "@/app/types";
import Categories from "./Categories";

interface NavbarProps {
  user?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  return (
    <div className="fixed shadow-sm z-10 w-full bg-white">
      <div className="border-b-[1px] py-4">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu user={user} />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  );
};
export default Navbar;
