"use client";
import Link from "next/link";
import React, { useState } from "react";
import { images } from "../export-images";
import Image from "next/image";
import { Search, UserRoundCog, Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [active, setIsActive] = useState(false);
  const [showDropdown, setShowDropDown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { status } = useSession();
  const pathname = usePathname(); // Get the current pathname

  // Define paths where Navbar should be hidden
  const noNavbarPaths = ["/login", "/register"];

  // If the current path is in noNavbarPaths, do not render the Navbar
  if (noNavbarPaths.includes(pathname)) return null;
  if (pathname.startsWith("/dashboard")) return null;

  return (
    <>
      <div className="flex justify-between items-center p-4 relative bg-white shadow-md">
        <div className="flex justify-center items-center w-full max-w-7xl mx-auto gap-8">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <Image src={images.logo} height={50} width={50} alt="logo img" />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex gap-8 text-lg font-semibold ml-4">
            <Link href="/">Home</Link>
            {status === "unauthenticated" && <Link href="/blogs">Blogs</Link>}
            <Link href="/about">About</Link>
            <Link href="/contact">Contact Us</Link>
          </nav>

          {/* Mobile Menu Icon */}
          <div className="md:hidden ml-auto">
            <Menu
              className="cursor-pointer"
              onClick={() => setShowMobileMenu(true)}
            />
          </div>

          {/* User Buttons */}
          <div className="flex gap-4 items-center ml-auto">
            <Search
              className="cursor-pointer hidden md:block"
              onClick={() => setShowDropDown(!showDropdown)}
            />

            {status === "authenticated" ? (
              <div className="hidden md:flex gap-4">
                <Link href="/dashboard/home">
                  <Button className="capitalize">Dashboard</Button>
                </Link>
                <Button
                  className="capitalize"
                  onClick={() => signOut({ callbackUrl: "/", redirect: false })}
                >
                  Logout
                </Button>
                <Link href={'/dashboard/post'} >
                  <Button className="capitalize">Create Post</Button>
                </Link>
              </div>
            ) : (
              <div className="hidden md:flex gap-4">
                <Link href="/login">
                  <Button className="capitalize">Login</Button>
                </Link>
                <Link href="/register">
                  <Button className="capitalize">Create Account</Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 right-0 h-full bg-white p-6 shadow-lg transform ${
            showMobileMenu ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 md:hidden z-50`}
        >
          <div className="flex justify-between items-center mb-6">
            <Image src={images.logo} height={50} width={50} alt="logo img" />
            <X
              className="cursor-pointer"
              onClick={() => setShowMobileMenu(false)}
            />
          </div>
          <nav className="flex flex-col gap-6 text-lg font-semibold">
            <Link href="/" onClick={() => setShowMobileMenu(false)}>
              Home
            </Link>
            {status === "unauthenticated" && (
              <Link href="/blogs" onClick={() => setShowMobileMenu(false)}>
                Blogs
              </Link>
            )}
            <Link href="/about" onClick={() => setShowMobileMenu(false)}>
              About
            </Link>
            <Link href="/contact" onClick={() => setShowMobileMenu(false)}>
              Contact Us
            </Link>
          </nav>
          <div className="flex flex-col gap-4 mt-8">
            {status === "authenticated" ? (
              <>
                <Link href="/dashboard/home">
                  <Button
                    className="capitalize"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Dashboard
                  </Button>
                </Link>
                <Button
                  className="capitalize"
                  onClick={() => {
                    signOut({ callbackUrl: "/", redirect: false });
                    setShowMobileMenu(false);
                  }}
                >
                  Logout
                </Button>
                <Button className="capitalize">Create Post</Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button
                    className="capitalize"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    className="capitalize"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Create Account
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Search Dropdown */}
        <div
          className={`${
            !showDropdown ? "hidden" : ""
          } flex flex-col items-center justify-evenly absolute top-[100%] right-[10%] border border-slate-200 p-5 rounded-md text-center w-[80%] md:w-[30%] h-[30vh] capitalize shadow-black shadow-md bg-white`}
        >
          <div className="w-full flex justify-end">
            <X
              className="cursor-pointer"
              onClick={() => setShowDropDown(!showDropdown)}
            />
          </div>
          <h2 className="font-semibold text-md">
            What are you looking for here
          </h2>
          <div className="relative w-full">
            <Input placeholder="Start typing ...." />
            <Button className="absolute top-0 right-0">Search</Button>
          </div>
          <div className="flex gap-3 mt-4">
            <Badge variant="outline" className="cursor-pointer">
              Sports
            </Badge>
            <Badge variant="outline" className="cursor-pointer">
              Travel
            </Badge>
            <Badge variant="outline" className="cursor-pointer">
              Technology
            </Badge>
          </div>
        </div>
      </div>
    </>
  );
}
