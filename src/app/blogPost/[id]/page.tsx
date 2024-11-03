"use client";
import { useEffect } from "react";
import { useBlogStore } from "@/store/store";
import { useRouter, useParams } from "next/navigation";

export default function BlogPost() {
  const { selectedBlog, getBlog } = useBlogStore();
  const id  = useParams().id as string   ;

  const router = useRouter();

  useEffect(() => {
    if (id) {
      getBlog(id); 
    }
  }, [id, getBlog]);

  if (!selectedBlog) {
    return (
      <div className="flex items-center justify-center h-screen text-lg text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
    <div className="bg-white p-8 shadow-md rounded-lg">
      <h1 className="text-4xl font-bold mb-4">{selectedBlog.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        Published on {new Date(selectedBlog.createdAt ?? Date.now()).toLocaleDateString()}
      </p>
      <div className="prose max-w-full mx-auto" dangerouslySetInnerHTML={{ __html: selectedBlog.content }} />
    </div>
  </div>
  );
}
