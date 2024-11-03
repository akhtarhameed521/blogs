"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useBlogStore } from "@/store/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export default function Home() {
  const { data, status } = useSession();
  const { blogs = [], getBlogs } = useBlogStore();
  const [loading, setLoading] = useState <boolean> (true);
  const [page, setPage] = useState <number> (1);
  const [isModalOpen, setIsModalOpen] = useState <boolean> (false); 
  const limit = 10;
  const router = useRouter();
  const [sortOrder, setSortOrder] = useState("latest");

  useEffect(() => {
    setLoading(true);
    getBlogs(undefined, page, limit, "", sortOrder).finally(() =>
      setLoading(false)
    );
  }, [getBlogs, page, sortOrder]);

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePreviousPage = () => setPage((prev) => Math.max(prev - 1, 1));

  const handleSortOrder = (order: string) => {
    setSortOrder(order);
    setPage(1);
  };

  const handleReadMore = (id: string) => {
    if (status === "authenticated") {
      router.push(`/blogPost/${id}`);
    } else {
      setIsModalOpen(true);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
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

  return (
    <div className="w-full sm:w-full md:max-w-5xl lg:max-w-7xl m-auto p-5 break-words">
      <div>
        <div className="col-span-2 space-y-6">
          {/* Sort Options */}
          <div className="flex gap-4 mb-5">
            <Button
              onClick={() => handleSortOrder("latest")}
              disabled={sortOrder === "latest"}
            >
              Latest
            </Button>
            <Button
              onClick={() => handleSortOrder("older")}
              disabled={sortOrder === "older"}
            >
              Older
            </Button>
          </div>

          {/* Blog Posts */}
          {blogs.length ? (
            blogs.map((blog: CreateBlogTypes) => (
              <div
                key={blog._id as string }
                className="p-5 bg-white shadow-lg rounded-lg w-full "
              >
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
                  onClick={() => handleReadMore(blog._id as string)}
                >
                  Read More
                </Button>
              </div>
            ))
          ) : (
            <div className="w-full h-[30h] p-5 flex items-center justify-center">
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

          <div className="flex justify-between mt-6">
            <Button
              disabled={page === 1}
              onClick={handlePreviousPage}
            >
              Previous
            </Button>
            <span>Page {page}</span>
            <Button onClick={handleNextPage}>
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Modal for Unauthenticated Users */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Please Log In</DialogTitle>
            <DialogDescription>
              You need to be logged in to read more. Please log in or sign up to access full content.
            </DialogDescription>
          </DialogHeader>
          <Button
            
            onClick={() => router.push("/login")}
          >
            Go to Login
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
