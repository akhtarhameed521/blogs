"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Sidebar from '@/components/layout/Sidebar';
import Link from 'next/link';
import { useUserStore } from '@/store/store'; 
import { useSession } from 'next-auth/react';

export default function AccountPage() {
  const { updateUser, apiError } = useUserStore();
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [auth, setAuth] = useState<UserRegisterType>({
    name: "",
    email: "",
    description: "",
    password: "",
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false); // Loading state for the save button
  const { data } = useSession();

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicture(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    const formData = new FormData();
    if (auth.name) formData.append("name", auth.name);
    if (auth.email) formData.append("email", auth.email);
    if (auth.password) formData.append("password", auth.password);
    if (auth.description) formData.append("description", auth.description);
    if (profilePicture) {
      formData.append("image", profilePicture);
    }

    setLoading(true); // Start loading spinner
    try {
      await updateUser(data?.user.id as string, formData); // Ensure updateUser accepts FormData
      setSuccessMessage("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="text-end w-full p-5">
          <Link href="/">
            <Button className="hover:bg-transparent hover:text-black hover:shadow-slate-500">
              Back To Home Page
            </Button>
          </Link>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Account Profile</h2>

        {/* Profile Picture */}
        <div className="flex justify-center mb-6">
          <div className="relative w-32 h-32">
            <img
              src={profilePicture ? URL.createObjectURL(profilePicture) : '/placeholder.png'}
              alt="Profile"
              className="w-full h-full object-cover rounded-full shadow-md border-2 border-gray-300"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePictureChange}
              className="mt-2"
            />
          </div>
        </div>

        {/* Form Fields */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Username</label>
          <input
            type="text"
            value={auth.name}
            onChange={(e) => setAuth({...auth, name: e.target.value}) }
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Email</label>
          <input
            type="email"
            value={auth.email}
            onChange={(e) => setAuth({...auth, email : e.target.value}) }
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Password</label>
          <input
            type="password"
            value={auth.password}
            onChange={(e) => setAuth({...auth, password : e.target.value}) }
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Description</label>
          <textarea
            value={auth.description}
            onChange={(e) => setAuth({...auth, description : e.target.value}) }
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Success/Error Messages */}
        {successMessage && <p className="text-green-600 mb-4">{successMessage}</p>}
        {apiError && <p className="text-red-600 mb-4">{apiError.general}</p>}

        {/* Save Button with Loading Spinner */}
        <Button onClick={handleSave} disabled={loading} className="flex items-center">
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 text-white mr-2"
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
          ) : null}
          Save Profile
        </Button>
      </div>
    </div>
  );
}
