"use client"
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/layout/Sidebar";
import dynamic from "next/dynamic";
import { useBlogStore } from "@/store/store";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function EditBlogPage() {
  const router = useRouter();
  const { id } = useParams();
  const { selectedBlog, getBlog, editBlogs } = useBlogStore();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (id) {
      getBlog(id as string);
    }
  }, [id]);

  useEffect(() => {
    if (selectedBlog) {
      setTitle(selectedBlog.title);
      setContent(selectedBlog.content);
      setTags(selectedBlog.tags.join(", "));
      setCategory(selectedBlog.category);
    }
  }, [selectedBlog]);

  const handleSubmit = async () => {
    try {
      const updatedData = {
        title,
        content,
        tags: tags.split(",").map((tag) => tag.trim()),
        category,
      };
      await editBlogs(id as string, updatedData);
      router.push("/myBlogs");
    } catch (error) {
      console.error("Failed to edit post", error);
      alert("An error occurred while editing the post.");
    }
  };

  return (
    <div className="flex">
      <div className="fixed">
        <Sidebar />
      </div>
      <div className="flex-1">
        <div className="flex flex-col items-center ml-0 sm:ml-0 md:ml-64 lg:ml-64 min-h-screen p-6">
          <div className="text-end w-full p-5">
            <Link href="/">
              <Button className="hover:bg-transparent hover:text-black hover:shadow-slate-500">
                Back To Home Page
              </Button>
            </Link>
          </div>
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">
            Edit Blog Post
          </h2>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post Title"
            className="w-full mb-6 px-4 py-2 border rounded-md"
          />

          <div className="quill-container">
            <ReactQuill
              value={content}
              onChange={setContent}
              placeholder="Write your content here..."
              className="bg-white"
              modules={{
                toolbar: [
                  [{ font: [] }],
                  [{ size: ["small", false, "large", "huge"] }],
                  ["bold", "italic", "underline", "strike"],
                  [{ header: [1, 2, 3, false] }],
                  [{ list: "ordered" }, { list: "bullet" }],
                  [{ script: "sub" }, { script: "super" }],
                  [{ indent: "-1" }, { indent: "+1" }],
                  ["link", "image", "code-block"],
                  ["clean"],
                ],
              }}
            />
          </div>

          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Tags (comma separated)"
            className="w-full mt-6 mb-6 px-4 py-2 border rounded-md"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full mb-6 px-4 py-2 border rounded-md bg-white text-gray-800"
          >
            <option value="">Select Category</option>
            <option value="Technology">Technology</option>
            <option value="Fashion">Fashion</option>
            <option value="Health and Fitness">Health and Fitness</option>
            <option value="Business Blogs">Business Blogs</option>
          </select>

          <Button
            onClick={handleSubmit}
            className="hover:bg-transparent hover:text-black hover:shadow-slate-500"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
