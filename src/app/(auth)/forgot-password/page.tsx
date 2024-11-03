
"use client"
import React, { useState } from 'react';
import { useUserStore } from '@/store/store'; 
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';



export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState <any> ('');
  const { forgetPassword, apiError, apiSuccess } = useUserStore();

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(''); // Clear previous messages

    try {
        await forgetPassword({ email });
        setMessage('Password reset email sent successfully!');
    } catch (error: any) {
        setMessage(error?.response?.data?.error || 'Failed to send reset email. Please try again.');
    } finally {
        setLoading(false);
    }
};


  console.log(message)

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Forgot Password</h2>
        <p className="text-center text-gray-600 mb-8">
          Enter your email address below to reset your password.
        </p>

        <form onSubmit={handleForgotPassword} className="space-y-4 ">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div className=' w-full text-center ' >
            <Button
              type="submit"
              className=''
              disabled={loading}
            >
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
                'Send Reset Link'
              )}
            </Button>
          </div>

          {apiSuccess && (
            <div className="text-center text-green-600 mt-4">
              {apiSuccess}
            </div>
          )}
          {apiError?.general && (
            <div className="text-center text-red-600 mt-4">
              {apiError.general}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

