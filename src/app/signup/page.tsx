"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [buttonDisable, setButtonDisabled] = useState(true);
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [message, setMessage] = useState("");
  const e = () => {
    toast.success("user is already");
  };
  const onSignup = async () => {
    console.log("onSignup");

    try {
      setLoading(true);
      await axios.post("./api/users/signup", user);
      console.log("signup successful");
      toast.success("signup successful");

      router.push("/login");
    } catch (error: any) {
      console.log(error);
      
      if (error.response.data.error == "user already exists") {
        throw toast.error(error.response.data.error);
      }

    }
    finally {
      setLoading(false);
    }
  }
    useEffect(() => {
      if (
        user.email.length > 0 &&
        user.password.length > 0 &&
        user.username.length > 0
      ) {
        setButtonDisabled(true);
      } else {
        setButtonDisabled(false);
      }
    }, [user]);

    return (
      <><Toaster/>
        <div className="flex flex-col items-center justify-center min-h-screen py-2  bg-gray-400">
          <div className="flex flex-col items-center justify-center rounded-xl p-3 w-4/12 min-w-fit bg-black">
            <div className="p-3 m-4 text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 lg:text-6xl ">
              <h1>{loading ? "Processing" : "SignUp"}</h1>
            </div>
            <hr />
            <div className="m-0.5">
              <label className="block" htmlFor="email">
                email
              </label>
              <input
                className="p-2 "
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
                className="p-2 "
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="password"
              />
            </div>
            <div>
              <label className="block" htmlFor="username">
                username
              </label>
              <input
                className="p-2 "
                id="username"
                type="username"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                placeholder="username"
              />
            </div>
            <button
              onClick={onSignup}
              disabled={!buttonDisable}
              className={
                buttonDisable
                  ? " p-2 m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  : "p-2 m-2 bg-white text-black font-bold py-2 px-4 opticity-100 rounded"
              }
            >
              SignUp
            </button>

            <button className="m-4 bg-blue-300 hover:bg-blue-500  text-black font-bold py-1 px-4 rounded">
              <Link href={"./login"}>Already have a Acount : Login</Link>
            </button>
          </div>
        </div>
      </>
    );
  };

