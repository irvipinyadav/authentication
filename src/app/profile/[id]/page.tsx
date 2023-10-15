"use client";
import axios from "axios";
import { Toast } from "flowbite-react";
import Link, { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
export default function UserProfile() {
  const router = useRouter();
  const logouthandle = async () => {

    

    try {
      await axios.get("/api/user/logout");
      toast.success("logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-slate-500 justify-center items-center ">
      <Toaster />
      <h1 className="lg:text-8xl text-3xl flex-shrink text-center ">Welcome This is <span className="text-white">Profile
      <br/>
      </span >Page</h1>
      {/* <button onClick={logouthandle}>logout</button> */}
    </div>
  );
}
