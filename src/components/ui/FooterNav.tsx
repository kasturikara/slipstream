import { House, PlusCircle, UserCircle } from "@phosphor-icons/react";
import { Link, useLocation } from "react-router-dom";

function FooterNav() {
  const location = useLocation();

  return (
    <footer className="fixed bottom-0 w-full bg-neutral text-neutral-content">
      <ul className="flex items-center justify-between w-full h-16 px-6 py-2 menu menu-horizontal rounded-box">
        <li>
          <Link data-tip="Dashboard" className="tooltip" to="/">
            <House
              size={36}
              weight={location.pathname === "/" ? "fill" : "regular"}
            />
          </Link>
        </li>
        {location.pathname !== "/add" && (
          <li>
            <Link to="/add" className="rounded-md btn btn-primary">
              <PlusCircle
                size={36}
                weight="bold"
                className="text-primary-content"
              />
            </Link>
          </li>
        )}
        <li>
          <Link data-tip="Profile" className="tooltip" to="/profile">
            <UserCircle
              size={36}
              weight={location.pathname === "/profile" ? "fill" : "regular"}
            />
          </Link>
        </li>
      </ul>
    </footer>
  );
}

export default FooterNav;
