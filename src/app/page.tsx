"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useBlogStore } from "@/store/store";
import Image from "next/image";
import { images } from "@/components/export-images";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data, status } = useSession();
  const { blogs = [], getBlogs } = useBlogStore();
  const [loading, setLoading] = useState <boolean> (true);
  const [page, setPage] = useState <number> (1); 
  const limit : number = 10; 
  const router = useRouter();
  const [sortOrder, setSortOrder] = useState <string> ("latest"); 

  useEffect(() => {
    setLoading(true);
    getBlogs(undefined, page, limit, "", sortOrder ).finally(() => setLoading(false)); 
  }, [status, getBlogs, page, sortOrder]);

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePreviousPage = () => setPage((prev) => Math.max(prev - 1, 1));

  const handleSortOrder = (order: string) => {
    setSortOrder(order);
    setPage(1); // Reset to the first page on sort change
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        {/* SVG Loader */}
        <svg
          className="animate-spin h-10 w-10 text-indigo-600"
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
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="w-full h-[87.5vh] flex items-center justify-center bg-gradient-to-r from-gray-50 to-gray-100">
  <div className="text-center max-w-2xl p-6 rounded-lg shadow-lg bg-white">
    <h1 className="text-4xl font-extrabold mb-3 text-indigo-600">
      Tech Insights & Innovation
    </h1>
    <h2 className="text-2xl font-semibold mb-4 text-gray-700">
      Stay Ahead in the World of Technology
    </h2>
    <p className="text-gray-600 mb-6">
      Your go-to source for the latest in tech trends, expert tips, and deep
      dives into the innovations shaping our future. Discover, learn, and stay
      inspired with exclusive content crafted for tech enthusiasts and
      professionals alike.
    </p>
    <Button >
      Get Started
    </Button>
  </div>
</div>

    );
  }

  return (
    <div className="w-full sm:w-full md:max-w-5xl lg:max-w-7xl m-auto p-5 break-words">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Blog Posts Column */}
        <div className="col-span-2 space-y-6">
        <div className="flex gap-4 mb-5">
        <Button onClick={() => handleSortOrder("latest")} disabled={sortOrder === "latest"}>
          Latest
        </Button>
        <Button onClick={() => handleSortOrder("older")} disabled={sortOrder === "older"}>
          Older
        </Button>
      </div>

          {blogs.length ? (
            blogs.map((blog: CreateBlogTypes ) => (
              <div key={blog._id} className="p-5 bg-white shadow-lg rounded-lg">
                <div className="flex gap-5 capitalize mb-5">
                  <Image
                    src={`${
                      blog.userImage ? blog.userImage : "/avatar.svg" 
                    }`}
                    height={40}
                    width={40}
                    alt="avatar"
                    className="rounded-3xl"
                  />
                  <div>
                    <p>{blog.postedBy}</p>
                    <p className="text-sm text-slate-500">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <h2 className="text-2xl font-semibold">{blog.title}</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Tags: {blog.tags.join(", ")}
                </p>
                <Button
                  className="mt-4"
                  onClick={() => router.push(`/blogPost/${blog._id}`)}
                >
                  Read More
                </Button>
              </div>
            ))
          ) : (
            <div className="w-full h-[30h] p-5 flex items-center justify-center ">
              <div className="text-center max-w-md p-8 rounded-lg shadow-lg bg-white">
                <h2 className="text-4xl font-bold text-indigo-600 mb-4">
                  No Blog Posts Available
                </h2>
                <p className="text-gray-600 mb-6">
                  It seems there are currently no stories to share. Check back
                  later for inspiring and insightful posts from our community of
                  writers.
                </p>
                <Button className="bg-indigo-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-600 transition duration-300">
                  Explore More Topics
                </Button>
              </div>
            </div>
          )}
          {/* Pagination Controls */}
          <div className="flex justify-between mt-6">
            <Button
              className="bg-indigo-500"
              disabled={page === 1}
              onClick={handlePreviousPage}
            >
              Previous
            </Button>
            <span>Page {page}</span>
            <Button className="bg-indigo-500" onClick={handleNextPage}>
              Next
            </Button>
          </div>
        </div>

        {/* Sidebar Column */}
        <aside className="space-y-6">
          <div className="p-5 bg-white shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Top Discussions</h3>
            <ul className="space-y-2">
              <li>How to Improve Blog Writing</li>
              <li>The Future of Web Development</li>
              <li>Tips for Learning JavaScript</li>
            </ul>
          </div>
          <div className="p-5 bg-white shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Top Tags</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full">
                JavaScript
              </span>
              <span className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full">
                Web Development
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">
                React
              </span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
