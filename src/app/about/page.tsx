import React from 'react';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <header className="text-center bg-gradient-to-r from-blue-600 to-teal-400 text-white py-16 rounded-lg shadow-lg">
        <h1 className="text-5xl font-extrabold">About Our Tech Blog</h1>
        <p className="mt-4 text-lg max-w-xl mx-auto">
          Your go-to source for the latest in technology and industry insights!
        </p>
      </header>

      <section className="mt-12">
        <h2 className="text-4xl font-semibold text-center text-gray-800">
          Welcome to Our Blog
        </h2>
        <p className="mt-6 text-lg text-gray-700 leading-relaxed text-center max-w-3xl mx-auto">
          We are passionate tech enthusiasts dedicated to sharing insights, tips, and news about the rapidly evolving world of technology. Our team strives to provide you with well-researched articles, tutorials, and reviews to help you navigate the tech landscape.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-4xl font-semibold text-center text-gray-800">
          Our Mission
        </h2>
        <p className="mt-6 text-lg text-gray-700 leading-relaxed text-center max-w-3xl mx-auto">
          Our mission is to empower our readers with knowledge and resources to make informed decisions in the tech space. Whether you are a beginner or an expert, we aim to cater to your interests and needs.
        </p>
      </section>

      <section className="mt-16">
        <h2 className="text-4xl font-semibold text-center text-gray-800">
          Meet the Team
        </h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div className="flex flex-col items-center">
            <Image
              className="rounded-full border-4 border-teal-400 shadow-lg transition-transform hover:scale-105"
              src="/member.jpg"
              width={150}
              height={150}
              alt="John Doe"
            />
            <h3 className="mt-4 text-2xl font-semibold">John Doe</h3>
            <p className="mt-1 text-gray-600">Founder & Chief Editor</p>
          </div>
          <div className="flex flex-col items-center">
            <Image
              className="rounded-full border-4 border-teal-400 shadow-lg transition-transform hover:scale-105"
              src="/member2.jpg"
              width={150}
              height={150}
              alt="Jane Smith"
            />
            <h3 className="mt-4 text-2xl font-semibold">Jane Smith</h3>
            <p className="mt-1 text-gray-600">Tech Writer & Reviewer</p>
          </div>
          <div className=" flex flex-col items-center ">
            <Image
              className="rounded-full border-4 border-teal-400 shadow-lg transition-transform hover:scale-105"
              src="/member3.jpg"
              width={150}
              height={150}
              alt="Mark Johnson"
            />
            <h3 className="mt-4 text-2xl font-semibold">Mark Johnson</h3>
            <p className="mt-1 text-gray-600">Web Developer & Designer</p>
          </div>
        </div>
      </section>

      <footer className="mt-16 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} Tech Blog. All rights reserved.</p>
      </footer>
    </div>
  );
}
