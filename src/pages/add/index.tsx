import { useState } from "react";
import BtnTheme from "../../components/ui/BtnTheme";
import FooterNav from "../../components/ui/FooterNav";
import { insertTransactions } from "../../api";

function AddPages() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [dataInput, setDataInput] = useState({
    user_id: user?.id,
    type: "",
    date: new Date().toISOString().slice(0, 10),
    description: "",
    amount: 0,
  });
  const [loading, setLoading] = useState({
    pages: false,
    btn: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setDataInput({
      ...dataInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading({
      ...loading,
      btn: true,
    });

    try {
      await insertTransactions(dataInput);
    } catch (error) {
      console.log("Error insert transaction: ", error);
    } finally {
      setTimeout(() => {
        setLoading({
          ...loading,
          btn: false,
        });
      }, 2000);
    }
  };

  return (
    <>
      {/* Nav Atas */}
      <nav className="fixed top-0 z-20 flex items-center justify-between w-full px-4 py-2 text-primary-content">
        <img
          src="https://img.icons8.com/?size=100&id=dCqQaqSmTHQm&format=png&color=000000"
          alt="profile"
          className="w-10 h-10 rounded-box"
        />
        <h1 className="text-lg font-semibold">Add New Transactions</h1>
        <BtnTheme />
      </nav>

      {/* form input */}
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="z-20 flex flex-col w-11/12 gap-2 p-4 mt-20 font-semibold rounded-lg shadow-lg bg-base-300 text-slate-500"
      >
        {/* type */}
        <div className="flex flex-col gap-2">
          <label className="label">Type</label>
          <select
            name="type"
            id="type"
            className="w-full rounded-md bg-base-300 select select-bordered"
            required
            onChange={(e) => handleChange(e)}
          >
            <option disabled selected>
              -- Select Type --
            </option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        {/* amount */}
        <div className="flex flex-col gap-2">
          <label className="label">Amount</label>
          <input
            type="number"
            name="amount"
            id="amount"
            className="w-full rounded-md input input-bordered bg-base-300"
            placeholder="Amount"
            onChange={(e) => handleChange(e)}
          />
        </div>

        {/* date */}
        <div className="flex flex-col gap-2">
          <label className="label">Date</label>
          <input
            type="date"
            name="date"
            id="date"
            className="w-full rounded-md input input-bordered bg-base-300"
            defaultValue={dataInput.date}
            onChange={(e) => handleChange(e)}
          />
        </div>

        {/* description */}
        <div className="flex flex-col gap-2">
          <label className="label">Description</label>
          <input
            type="text"
            name="description"
            id="description"
            className="w-full rounded-md input input-bordered bg-base-300"
            placeholder="Description"
            onChange={(e) => handleChange(e)}
          />
        </div>

        {/* button add */}
        <button
          type="submit"
          className="mt-4 font-extrabold rounded-md btn btn-primary"
          disabled={loading.btn}
        >
          Add New
        </button>
      </form>

      {/* footer nav */}
      <FooterNav />
    </>
  );
}

export default AddPages;
