"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useBlogStore } from "@/store/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";

export default function Home() {
  const { status } = useSession();
  const { blogs = [], getBlogs } = useBlogStore();
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const limit: number = 10;
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      setLoading(false);
      getBlogs(undefined, page, limit, search);
    }
  }, [page]);

  const handleSearch = () => {
    setLoading(true);
    setPage(1); // Reset to the first page for new search results
    getBlogs(undefined, 1, limit, search).finally(() => setLoading(false));
  };

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePreviousPage = () => setPage((prev) => Math.max(prev - 1, 1));

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
      <section className=" mt-16 relative w-full max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 flex flex-col items-center md:flex-row">
        <div className="flex flex-col items-center md:items-start text-center md:text-left md:w-1/2 ">
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Elevate Your Tech Knowledge
          </h1>
          <p className="mt-4 text-lg text-gray-700 max-w-md">
            Explore insights, trends, and guides to stay ahead in the
            ever-evolving tech world. Curated articles by industry leaders and
            experts.
          </p>

          <div className="mt-6 ">
            <Link href={"/blogs"}>
              <Button>Start Reading</Button>
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="relative mt-10 md:mt-0 md:w-1/2 h-72 md:h-96 w-full">
          <Image
            src="/blog.jpg"
            alt="Tech Blog Hero"
            layout="fill"
            objectFit="cover"
            className="rounded-lg shadow-lg"
            priority
          />
        </div>

        {/* Optional Gradient Overlay for Style */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-700 via-transparent to-gray-100 opacity-90 -z-10 pointer-events-none"></div>
      </section>
    );
  }

  return (
    <div className="w-full sm:w-full md:max-w-5xl lg:max-w-7xl m-auto p-5 break-words">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Blog Posts Column */}
        <div className="col-span-2 space-y-6">
          <div className="flex gap-2">
            <Input
              className="bg-white"
              placeholder="Search your blog here"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button onClick={handleSearch}>Search</Button>
          </div>

          {blogs.length ? (
            blogs.map((blog) => (
              <div key={blog._id} className="p-5 bg-white shadow-lg rounded-lg">
                <div className="flex gap-5 capitalize mb-5">
                  <Image
                    src={`${blog.userImage ? blog.userImage : "/avatar.svg"}`}
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
            <Button disabled={page === 1} onClick={handlePreviousPage}>
              Previous
            </Button>
            <span>Page {page}</span>
            <Button onClick={handleNextPage}>Next</Button>
          </div>
        </div>
        {/* Sidebar Column */}
        <aside className="space-y-6">
          {/* Top Discussions */}
          <div className="p-5 bg-white shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Top Discussions</h3>
            <ul className="space-y-2">
              <li>How to Improve Blog Writing</li>
              <li>The Future of Web Development</li>
              <li>Tips for Learning JavaScript</li>
              <li>AI in Software Development</li>
              <li>Scaling Applications Efficiently</li>
            </ul>
          </div>

          {/* Top Tags */}
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
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                Node.js
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                AI & ML
              </span>
            </div>
          </div>

          {/* Popular Authors */}
          <div className="p-5 bg-white shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Popular Authors</h3>
            <ul className="space-y-2">
              <li>John Doe - React & JavaScript Expert</li>
              <li>Jane Smith - Full Stack Developer</li>
              <li>Mark T. - Cloud & DevOps Specialist</li>
            </ul>
          </div>

          {/* Recent Articles */}
          <div className="p-5 bg-white shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Recent Articles</h3>
            <ul className="space-y-2">
              <li>Understanding the DOM in Depth</li>
              <li>React's Newest Features Explained</li>
              <li>Optimizing Web Performance</li>
              <li>Security Tips for Web Developers</li>
            </ul>
          </div>

          {/* Recommended Resources */}
          <div className="p-5 bg-white shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold mb-3">
              Recommended Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-indigo-600 hover:underline">
                  MDN Web Docs
                </a>
              </li>
              <li>
                <a href="#" className="text-indigo-600 hover:underline">
                  JavaScript.info
                </a>
              </li>
              <li>
                <a href="#" className="text-indigo-600 hover:underline">
                  Frontend Masters
                </a>
              </li>
              <li>
                <a href="#" className="text-indigo-600 hover:underline">
                  CSS-Tricks
                </a>
              </li>
            </ul>
          </div>
        </aside>
        {/* ... Sidebar code here */}
      </div>
    </div>
  );
}
