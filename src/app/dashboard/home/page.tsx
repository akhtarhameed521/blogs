// pages/dashboard/homepage.tsx
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function HomePage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-8 bg-gray-50">
      <div className="text-end w-full p-5 mb-10 ">
          <Link href="/">
            <Button className="hover:bg-transparent hover:text-black hover:shadow-slate-500">
              Back To Home Page
            </Button>
          </Link>
        </div>
        {/* Header Section */}
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Tech Blog Dashboard</h1>
          <p className="text-lg text-gray-600">
            Welcome to your tech blog dashboard. Here, you can create, edit, and manage all your tech articles. 
            This dashboard provides easy access to recent posts, user activity, and insights to help you stay 
            informed about your blog’s performance.
          </p>
        </header>

        {/* Description & Quick Links */}
        <section className="space-y-10">
          {/* Description Card */}
          <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">About This Dashboard</h2>
            <p className="text-gray-600">
              Our tech blog dashboard is designed for content creators and tech enthusiasts who want to streamline
              their blogging process. With features to track user engagement, manage posts, and view analytics, 
              this dashboard makes it easy to grow your blog and engage with your audience effectively.
            </p>
          </div>

          {/* Quick Links to Main Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Link to Create New Post */}
            <Link href="/dashboard/post">
              <div className="bg-blue-100 p-5 rounded-lg shadow-md hover:shadow-lg hover:bg-blue-200 transition cursor-pointer">
                <h3 className="text-xl font-semibold text-blue-800">Create New Post</h3>
                <p className="text-blue-700">Start writing your next tech article and share it with the world.</p>
              </div>
            </Link>

           

            {/* Link to Manage Posts */}
            <Link href="/dashboard/myBlogs">
              <div className="bg-purple-100 p-5 rounded-lg shadow-md hover:shadow-lg hover:bg-purple-200 transition cursor-pointer">
                <h3 className="text-xl font-semibold text-purple-800">Manage Posts</h3>
                <p className="text-purple-700">Organize and edit your existing posts effortlessly.</p>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
