import React, { useEffect, useState } from "react";
import BtnTheme from "../../components/ui/BtnTheme";
import {
  ArrowCircleDown,
  House,
  PlusCircle,
  UserCircle,
} from "@phosphor-icons/react";
import { Link, useLocation } from "react-router-dom";
import { getTotalPerMonth } from "../../api";
import { months, Month } from "../../utils/monthValue";
import { FormatRupiah } from "@arismun/format-rupiah";

const DashboardPage: React.FC = () => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [balancePerMonth, setBalancePerMonth] = useState<any[] | null>(null);
  // total income & expense
  const [total, setTotal] = useState<{ income: number; expense: number }>({
    income: 0,
    expense: 0,
  });
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("2024-09-01");

  useEffect(() => {
    fetchBalance();
  }, []);

  const fetchBalance = async () => {
    setLoading(true);

    try {
      const takeBalance = await getTotalPerMonth(user?.id, selectedDate);
      if (takeBalance) {
        setTotal({
          income: takeBalance.total_income,
          expense: takeBalance.total_expense,
        });
      }
    } catch (error) {
      console.log("Error get balance: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSelectedDate = event.target.value;
    setSelectedDate(newSelectedDate);
  };

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
        </div>
        <select
          value={selectedDate}
          onChange={handleDateChange}
          className="select select-ghost"
        >
          {months.map((item) => (
            <option key={item.value} value={item.value + "-01"}>
              {item.label}
            </option>
          ))}
        </select>
        <BtnTheme />
      </nav>

      {/* amount */}
      <div className="z-20 w-11/12 shadow-xl bg-primary mt-28 text-primary-content card">
        <div className="card-body">
          <button onClick={() => console.log(total)}>tes</button>

          <h2 className="justify-center text-lg card-title">Total Balance</h2>
          <p className="text-4xl font-extrabold text-center">
            <FormatRupiah value={user?.total} />
          </p>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {/* card income */}
            <div className="px-4 py-2 text-center rounded-xl bg-success text-base-200">
              <p className="flex justify-center gap-2 font-semibold">
                <ArrowCircleDown size={24} weight="bold" /> Income
              </p>
              <FormatRupiah value={total.income} />
            </div>
            {/* card expense */}
            <div className="px-4 py-2 text-center rounded-xl bg-warning text-base-200">
              <p className="flex justify-center gap-2 font-semibold">
                <ArrowCircleDown size={24} weight="bold" /> Expense
              </p>
              <FormatRupiah value={total.expense} />
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
