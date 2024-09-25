import React from "react";
import BtnTheme from "../../components/ui/BtnTheme";
import { House, PlusCircle, UserCircle } from "@phosphor-icons/react";
import { Link, useLocation } from "react-router-dom";

const DashboardPage: React.FC = () => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="fixed top-0 z-10 h-64 rounded-b-full w-[140vw] bg-secondary"></div>
      {/* title */}
      <nav className="fixed top-0 z-20 flex items-center justify-between w-full px-2 py-4 text-secondary-content">
        <div className="flex items-center gap-2">
          <img
            src="https://img.icons8.com/?size=100&id=dCqQaqSmTHQm&format=png&color=000000"
            alt="profile"
            className="w-12 h-12 rounded-box"
          />
          <h3 className="text-xl font-bold">{user?.nama}</h3>
        </div>
        <BtnTheme />
      </nav>

      {/* amount */}
      <div className="z-20 w-11/12 shadow-xl bg-primary mt-28 text-primary-content card">
        <div className="card-body">
          <h2 className="justify-center card-title">Total Amount</h2>
          <p className="text-center">Rp. 0</p>
          <div className="flex items-center justify-between mt-4">
            <div className="text-center">
              <p>income</p>
              <p>Rp.0</p>
            </div>
            <div className="text-center">
              <p>expense</p>
              <p>Rp.0</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <footer className="fixed bottom-0 w-full bg-neutral text-neutral-content">
        <ul className="flex items-center justify-between w-full h-20 px-6 menu menu-horizontal rounded-box">
          <li>
            <Link data-tip="Dashboard" className="tooltip" to="/">
              <House
                size={36}
                weight={location.pathname === "/" ? "fill" : "regular"}
              />
            </Link>
          </li>
          <li>
            <button data-tip="Profile" className="tooltip btn btn-primary">
              <PlusCircle
                size={36}
                weight="bold"
                className="text-primary-content"
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
