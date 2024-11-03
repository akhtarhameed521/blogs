"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React, { useState } from "react";
import { useUserStore } from "@/store/store";

export default function RegisterPage() {
  const [auth, setAuth] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { createUser, apiError } = useUserStore();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    await createUser(auth); 
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4 sm:p-8">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create Your Account
        </h2>
        <form onSubmit={handleRegister} className="space-y-6">
          {apiError && apiError.general && (
            <div className="text-red-500 text-sm mt-2 text-center">
              {apiError.general}
            </div>
          )}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <Input
              id="username"
              placeholder="Enter your username"
              type="text"
              onChange={(e) => setAuth({ ...auth, name: e.target.value })}
              className="w-full"
            />
            {apiError && apiError.name && (
              <div className="text-red-500 text-sm mt-1">{apiError.name}</div>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <Input
              id="email"
              placeholder="Enter your email"
              type="email"
              onChange={(e) => setAuth({ ...auth, email: e.target.value })}
              className="w-full"
            />
            {apiError && apiError.email && (
              <div className="text-red-500 text-sm mt-1">{apiError.email}</div>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <Input
              id="password"
              placeholder="Enter your password"
              type="password"
              onChange={(e) => setAuth({ ...auth, password: e.target.value })}
              className="w-full"
            />
            {apiError && apiError.password && (
              <div className="text-red-500 text-sm mt-1">
                {apiError.password}
              </div>
            )}
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm Password
            </label>
            <Input
              id="confirmPassword"
              placeholder="Confirm your password"
              type="password"
              onChange={(e) =>
                setAuth({ ...auth, confirmPassword: e.target.value })
              }
              className="w-full"
            />
            {apiError && apiError.confirmPassword && (
              <div className="text-red-500 text-sm mt-1">
                {apiError.confirmPassword}
              </div>
            )}
          </div>

          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>
        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-slate-500 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
