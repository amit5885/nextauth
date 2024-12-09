"use client";
import React, { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("");

  const userDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      console.log(res.data.data._id);
      setData(res.data.data._id);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log("Profile failed", error);
        toast.error("Profile failed" + error.message);
      }
    }
  };

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout success");
      router.push("/login");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log("Logout failed", error);
        toast.error("Logout failed" + error.message);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Profile Page</h1>
      <hr />
      <h2>
        {data === "" ? (
          "No data"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <button
        className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={userDetails}
      >
        User Details
      </button>
      <button
        className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}

export default ProfilePage;
