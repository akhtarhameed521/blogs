"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/layout/Sidebar";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useBlogStore } from "@/store/store";
import Link from "next/link";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function PostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { createBlog } = useBlogStore();

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setImages(Array.from(e.target.files));
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const postData = {
      title,
      content,
      tags: tags.split(",").map((tag) => tag.trim()),
      images,
    };

     await createBlog(postData);

    
      alert("Post submitted successfully!");
   

    setIsLoading(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="fixed">
        <Sidebar />
      </div>
      <div className="flex-1 p-6 relative ml-0 sm:ml-0 md:ml-64 lg:ml-64 w-full">
        <div className="mb-10">
          <Link href={'/'}>
            <Button className="hover:bg-transparent hover:text-black hover:shadow-slate-500">
              Back To Home Page
            </Button>
          </Link>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">
            Create a New Blog Post
          </h2>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post Title"
            className="w-full mb-6 px-4 py-2 border rounded-md"
          />

          {/* Content Editor */}
          <div className="quill-container">
            <ReactQuill
              value={content}
              onChange={setContent}
              placeholder="Write your content here..."
              className="bg-white h-screen mb-10"
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

          {/* Tags Input */}
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Tags (comma separated)"
            className="w-full mt-6 mb-6 px-4 py-2 border rounded-md"
          />
        </div>

        {/* Preview Modal */}
        {isPreviewOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl">
              <button onClick={() => setIsPreviewOpen(false)}>&times;</button>
              <h2>{title}</h2>
              <div dangerouslySetInnerHTML={{ __html: content }} />
              <p>Tags: {tags}</p>
              {images.length > 0 && (
                <div>
                  <strong>Uploaded Images:</strong>
                  {images.map((image, index) => (
                    <div key={index}>{image.name}</div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex justify-end items-center w-full mt-10 mb-10">
          <div className="flex gap-4 pb-10">
            <Button variant="outline" onClick={() => setIsPreviewOpen(true)}>
              Preview
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex items-center hover:bg-transparent hover:text-black hover:shadow-slate-500"
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-10 w-10 text-indigo-600 mr-2"
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
              Publish Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
