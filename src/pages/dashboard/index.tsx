import React, { useEffect, useState } from "react";
import BtnTheme from "../../components/ui/BtnTheme";
import { ArrowCircleDown, ArrowCircleUp } from "@phosphor-icons/react";
import { getHistory, getTotalPerMonth, getUser } from "../../api";
import { months } from "../../utils/monthValue";
import { FormatRupiah } from "@arismun/format-rupiah";
import {
  defaultSelectedDate,
  formatDate,
  isToday,
  isYesterday,
} from "../../utils/lib";
import FooterNav from "../../components/ui/FooterNav";

const DashboardPage: React.FC = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [userDB, setUserDB] = useState<any>({});
  // total income & expense
  const [total, setTotal] = useState<{ income: number; expense: number }>({
    income: 0,
    expense: 0,
  });
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>(
    defaultSelectedDate()
  );
  const [history, setHistory] = useState<any[] | null>(null);

  useEffect(() => {
    fetchBalance();
  }, [selectedDate]);

  const fetchBalance = async () => {
    setLoading(true);

    try {
      const takeUser = await getUser(user?.id);
      if (takeUser) {
        setUserDB(takeUser);
        localStorage.setItem("user", JSON.stringify(takeUser));
      }

      const takeBalance = await getTotalPerMonth(user?.id, selectedDate);
      if (takeBalance) {
        setTotal({
          income: takeBalance.total_income,
          expense: takeBalance.total_expense,
        });
      }

      const takeHistory = await getHistory(user?.id);
      if (takeHistory) {
        setHistory(takeHistory);
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
    <>
      {/* nav atas */}
      <nav className="fixed top-0 z-20 flex items-center justify-between w-full px-4 py-2 text-primary-content">
        <img
          src="https://img.icons8.com/?size=100&id=dCqQaqSmTHQm&format=png&color=000000"
          alt="profile"
          className="w-10 h-10 rounded-box"
        />
        <select
          value={selectedDate}
          onChange={handleDateChange}
          className="bg-transparent border-0 rounded-sm select select-ghost"
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
            <FormatRupiah value={userDB?.total} />
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
      <div className="z-20 flex items-center justify-between w-11/12 mt-4">
        <h2 className="text-lg font-bold">Transaction History</h2>
        <button className=" text-slate-500 btn-ghost btn">See all</button>
      </div>
      <div className="z-20 flex flex-col w-11/12 gap-2 overflow-y-auto max-h-64">
        {/* card history */}
        {history ? (
          history.map((item: any) => (
            <div key={item.id} className="flex items-center justify-between">
              <div className="">
                <h4 className="text-lg font-bold">{item.deskripsi}</h4>
                <h6 className="text-sm text-slate-500">
                  {isToday(item.tanggal)
                    ? "Today"
                    : isYesterday(item.tanggal)
                    ? "Yesterday"
                    : formatDate(item.tanggal)}
                </h6>
              </div>
              <p
                className={`text-lg font-extrabold text-${
                  item.tipe === "income" ? "success" : "error"
                }
                `}
              >
                {item.tipe === "income" ? "+" : "-"}{" "}
                <FormatRupiah value={item.jumlah} />
              </p>
            </div>
          ))
        ) : (
          <span className="my-6 text-center text-slate-500">no data</span>
        )}
      </div>

      {/* Footer Navigation */}
      <FooterNav />
    </>
  );
};

export default DashboardPage;
