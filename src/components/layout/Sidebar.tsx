// components/Sidebar.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Home,
  PenTool,
  User,
  LogOut,
  Menu,
  FolderSymlink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

const Sidebar = () => {
  const { status } = useSession();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const menuItems = [
    { name: "Dashboard", icon: Home, href: "/dashboard/home" },
    { name: "Create Blog", icon: PenTool, href: "/dashboard/post" },
    { name: "My Blogs", icon: FolderSymlink, href: "/dashboard/myBlogs" },
    { name: "Account", icon: User, href: "/dashboard/account" },
  ];

  return (
    <>
      {/* Toggle Button for Mobile */}
      <button
        className="md:hidden p-3 fixed top-4 left-4 z-50 bg-gray-100 rounded-full shadow-lg"
        onClick={toggleSidebar}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:static top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 p-5 shadow-md flex flex-col justify-between transition-transform duration-300 z-40`}
      >
        <div className="flex items-center justify-center mb-8">
          <h1 className="text-2xl font-semibold">Blog Dashboard</h1>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex flex-col gap-4">
          {menuItems.map((item) => (
            <Link href={item.href} key={item.name} onClick={toggleSidebar}>
              <div className="flex items-center gap-3 pb-5 hover:bg-gray-100 p-2 rounded-md">
                <item.icon className="w-5 h-5" />
                <span className="text-gray-700">{item.name}</span>
              </div>
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        {status === "authenticated" && (
          <div className="mt-auto pt-5 border-t border-gray-200">
            <Button
              variant="ghost"
              className="w-full flex items-center gap-3 text-gray-700 hover:bg-gray-100"
              onClick={() => signOut({ callbackUrl: "/login" })}
            >
              <LogOut className="w-5 h-5" />
              Logout
            </Button>
          </div>
        )}
      </div>

      {/* Overlay for Mobile when Sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;
