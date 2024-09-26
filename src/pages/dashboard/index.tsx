import React, { useEffect, useState } from "react";
import BtnTheme from "../../components/ui/BtnTheme";
import {
  ArrowCircleDown,
  ArrowCircleUp,
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
    <div className="flex flex-col items-center justify-start h-screen bg-base-300">
      {/* banner */}
      <div className="fixed top-0 z-10 h-64 rounded-b-full w-[140vw] bg-gradient-to-b from-primary to-neutral"></div>
      {/* nav atas */}
      <nav className="fixed top-0 z-20 flex items-center justify-between w-full px-4 py-2 text-primary-content">
        <div className="flex items-center gap-2">
          <img
            src="https://img.icons8.com/?size=100&id=dCqQaqSmTHQm&format=png&color=000000"
            alt="profile"
            className="w-10 h-10 rounded-box"
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
      <div className="z-20 w-11/12 mt-20 shadow-lg bg-gradient-to-tr from-primary to-secondary text-primary-content shadow-secondary card">
        <div className="card-body">
          {/* <button onClick={() => console.log(total)}>tes</button> */}

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
            <div className="px-4 py-2 text-center rounded-xl bg-error text-base-200">
              <p className="flex justify-center gap-2 font-semibold">
                <ArrowCircleUp size={24} weight="bold" /> Expense
              </p>
              <FormatRupiah value={total.expense} />
            </div>
          </div>
        </div>
      </div>

      {/* history */}
      <div className="z-20 flex flex-col w-11/12 mt-4">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-lg font-bold">Transaction History</h2>
          <button className=" text-slate-500 btn-ghost btn">See all</button>
        </div>
        <div className="">hehe</div>
        <div className="">hehe</div>
        <div className="">hehe</div>
      </div>

      {/* Footer Navigation */}
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
          <li>
            <button className="btn btn-primary">
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
