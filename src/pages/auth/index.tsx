import React from "react";
import { Lock, User } from "@phosphor-icons/react";
import { useState } from "react";
import { authenticateUser } from "../../api";

interface LoginPagesProps {
  setIsLogin: (isLogin: boolean) => void;
}

const LoginPages: React.FC<LoginPagesProps> = ({ setIsLogin }) => {
  const [data, setData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = await authenticateUser(data);
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        setIsLogin(true);
      }
    } catch (error) {
      console.log("Error Submit Login: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen gap-4 p-4 bg-base-100">
      <div className="flex flex-col items-start justify-start w-full gap-1 py-8">
        <h1 className="text-3xl font-bold">
          Log in to{" "}
          <span className="p-1 rounded-lg text-base-100 bg-primary">
            Slipstream
          </span>
        </h1>
        <h5 className="text-lg">Enter your username and password</h5>
      </div>

      {/* form input */}
      <form className="flex flex-col w-full gap-4 " onSubmit={handleSubmit}>
        {/* username */}
        <div className="">
          <label htmlFor="username" className="font-semibold label">
            Username
          </label>
          <label className="flex items-center gap-2 input input-bordered">
            <User size={24} />
            <input
              type="text"
              name="username"
              placeholder="Username"
              id="username"
              value={data.username}
              onChange={handleChange}
            />
          </label>
        </div>

        {/* password */}
        <div className="">
          <label htmlFor="password" className="font-semibold label">
            Password
          </label>
          <label className="flex items-center gap-2 input input-bordered">
            <Lock size={24} />
            <input
              type="password"
              name="password"
              placeholder="* * * * * * *"
              id="password"
              value={data.password}
              onChange={handleChange}
            />
          </label>
        </div>

        <button
          className="mt-4 btn btn-primary text-primary-content"
          type="submit"
          disabled={loading}
        >
          Log in
        </button>
      </form>
    </div>
  );
};

export default LoginPages;
