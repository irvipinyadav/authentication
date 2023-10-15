"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios, { Axios } from "axios";
import toast, { Toaster } from "react-hot-toast";
export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [buttonDisable, setButtonDisabled] = useState(true);
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const onLogin = async () => {
    console.log("onlogin", user);
    try {
      setLoading(true);
      await axios.post("./api/users/login", user);
      toast.success("login successful");
      setTimeout(() => {
        router.push("/profile");
      }, 2000);
    } catch (err: any) {
      if (err.response.data.error == "user does not exist") {
        throw toast.error(err.response.data.error);
      }
      if (err.response.data.error == "invalid password") {
        throw toast.error("password is incorrect");
      }

      // setUser({
      //   email: "",
      //   password: ""
      // })
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    // toast("loading...")
    if (
      user.email.length > 0 &&
      user.password.length > 0
      // && user.username.length > 0
    ) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [user]);

  return (
    <>
      <Toaster />
      <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-400 ">
        <div className="flex flex-col items-center justify-center rounded-xl p-3 bg-black">

        <h1 className="p-3 m-4 text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 text-5xl lg:text-6xl ">
          {loading ? "loading" : "Login"}
        </h1>
        <hr />
        <div className="m-0.5">
          <label className="block" htmlFor="email">
            email
          </label>
          <input
            className="p-2 rounded-xl  text-black focus:bg-black focus:text-white"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="email"
            />
        </div>
        <div>
          <label className="block" htmlFor="password">
            password
          </label>
          <input
            className="p-2 rounded-xl text-black focus:bg-black focus:text-white"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="password"
            />
        </div>

        <button
          onClick={onLogin}
          disabled={!buttonDisable}
          className={
              buttonDisable
              ? " p-2 m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              : "p-2 m-2 bg-white text-black font-bold py-2 px-4 opticity-100 rounded"
            }
            >
          Login
        </button>

        <button className="m-4 bg-blue-300 hover:bg-blue-500 text-black font-bold py-1 px-4 rounded">
          <Link href={"./signup"}>don't have account: SignUp</Link>
        </button>
            </div>
      </div>
    </>
  );
}
