"use client"
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useBlogStore } from "@/store/store";
import { useSession } from "next-auth/react";
import Sidebar from "@/components/layout/Sidebar";
import { FileText } from "lucide-react";

export default function MyBlogsPage() {
  const { data: session } = useSession();
  const { blogs = [], getBlogs, deleteBlogs, loading } = useBlogStore(); // Access loading state

  useEffect(() => {
    if (session?.user?.id) {
      getBlogs(session.user.id as string); // Fetch only user-specific blogs
    }
  }, []);

  const handleDelete = async (id: string) => {
    await deleteBlogs(id);
  };

  return (
    <div className="flex">
      <div className="fixed">
        <Sidebar />
      </div>
      <div className="flex-1">
        <div className="p-6 flex-1 ml-0 sm:ml-0 md:ml-64 lg:ml-64">
          <div className="text-end w-full p-5">
            <Link href="/">
              <Button className="hover:bg-transparent hover:text-black hover:shadow-slate-500">
                Back To Home Page
              </Button>
            </Link>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-8">My Blogs</h1>
          <div className="w-full grid gap-6">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                {/* SVG Preloader */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="50" height="50">
                  <circle fill="none" stroke-opacity="1" stroke="#FF156D" stroke-width=".5" cx="100" cy="100" r="0">
                    <animate attributeName="r" calcMode="spline" dur="2" values="1;80" keyTimes="0;1" keySplines="0 .2 .5 1" repeatCount="indefinite"></animate>
                    <animate attributeName="stroke-width" calcMode="spline" dur="2" values="0;25" keyTimes="0;1" keySplines="0 .2 .5 1" repeatCount="indefinite"></animate>
                    <animate attributeName="stroke-opacity" calcMode="spline" dur="2" values="1;0" keyTimes="0;1" keySplines="0 .2 .5 1" repeatCount="indefinite"></animate>
                  </circle>
                </svg>
              </div>
            ) : blogs && blogs.length > 0 ? (
              blogs.map((blog: CreateBlogTypes) => (
                <div
                  key={blog._id}
                  className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row justify-between items-start md:items-center"
                >
                  <div className="flex-1 mb-4 md:mb-0">
                    <h2 className="text-2xl font-semibold text-gray-800">
                      {blog.title}
                    </h2>
                    <p className="text-sm text-gray-500">
                      Tags: {blog.tags?.join(", ")}
                    </p>
                  </div>
                  <div className="flex gap-4 mt-4 md:mt-0">
                    <Link href={`/dashboard/myBlogs/${blog._id as string}`}>
                      <Button
                        variant="outline"
                        className="hover:bg-transparent hover:text-black hover:shadow-slate-500"
                      >
                        Edit
                      </Button>
                    </Link>
                    <Button
                      className="bg-red-600 text-white hover:bg-red-700 px-4 py-2"
                      onClick={() => handleDelete(blog._id as string)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center p-8 bg-gray-100 rounded-lg border border-gray-200 text-center">
                <FileText className="text-gray-500 mb-4" size={40} />
                <p className="text-lg font-semibold text-gray-700">
                  You have no blogs yet.
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Start creating your first blog to share your ideas!
                </p>
                <Link href="/dashboard/post">
                  <Button className="hover:bg-transparent hover:text-black hover:shadow-slate-500">
                    Create Your First Blog
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
