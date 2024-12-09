"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
// import { useSearchParams } from "next/navigation";
import Link from "next/link";

function VerifiEmailPage() {
  // const searchParams = useSearchParams();
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const emailVerify = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
      setError(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(true);
        console.log(err.message);
      }
    }
  };

  useEffect(() => {
    // using core js
    setError(false);
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");

    // using nextjs
    // const urlToken = searchParams.get("token");
  }, []);

  useEffect(() => {
    setError(false);
    if (token.length > 0) {
      emailVerify();
    }
  }, [token]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="p-2 bg-orange-500 text-black">
        {token ? `${token}` : "no token"}
      </h2>
      {verified && (
        <div>
          <h2 className="text-2xl">Email Verified</h2>
          <Link href="/login">Login</Link>
        </div>
      )}

      {error && (
        <div>
          <h2 className="text-2xl">Error</h2>
        </div>
      )}
    </div>
  );
}

export default VerifiEmailPage;
