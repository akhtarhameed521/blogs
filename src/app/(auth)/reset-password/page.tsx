"use client";
import React, { useState } from "react";
import { useUserStore } from "@/store/store";
import { Button } from "@/components/ui/button";
import { useParams, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";

interface ResetPasswordTypes {
  token: string; 
  password: string;
  confirmPassword: string;
}

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { resetPassword, apiError, apiSuccess } = useUserStore();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof token === "string") { // Check if token is a string
      setLoading(true); // Set loading to true
      setSuccessMessage(""); // Clear previous success messages
      try {
        await resetPassword({ token, password, confirmPassword });
        setSuccessMessage("Password reset successfully!"); // Set success message
      } catch (error) {
        console.error("Error resetting password", error);
      } finally {
        setLoading(false); // Set loading to false after API call
      }
    } else {
      console.error("Invalid token format");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Reset Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-gray-700">Password:</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-gray-700">Confirm Password:</label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div className=" w-full text-center " >
            <Button type="submit"  disabled={loading}>
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
              ) : (
                "Reset Password"
              )}
            </Button>

          </div>
        </form>
        {apiError?.general && (
          <p className="text-center text-red-600 mt-4">{apiError.general}</p>
        )}
        {apiSuccess && (
          <p className="text-center text-green-600 mt-4">{apiSuccess}</p>
        )}
      </div>
    </div>
  );
}
