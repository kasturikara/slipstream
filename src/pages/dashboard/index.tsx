import React from "react";
import BtnTheme from "../../components/ui/BtnTheme";
import { House, PlusCircle, UserCircle } from "@phosphor-icons/react";
import { Link, useLocation } from "react-router-dom";

const DashboardPage: React.FC = () => {
  const location = useLocation();

  return (
    <div>
      <nav>
        <BtnTheme />
      </nav>

      <footer className="fixed bottom-0 w-full bg-primary text-primary-content">
        <ul className="flex justify-between w-full px-6 menu menu-horizontal rounded-box">
          <li>
            <Link data-tip="Dashboard" className="tooltip" to="/">
              <House
                size={36}
                weight={location.pathname === "/" ? "fill" : "regular"}
              />
            </Link>
          </li>
          <li>
            <button data-tip="Profile" className="tooltip btn btn-accent">
              <PlusCircle
                size={36}
                weight="bold"
                className="text-accent-content"
              />
            </button>
          </li>
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
    </div>
  );
};

export default DashboardPage;
