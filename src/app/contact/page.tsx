import React from 'react';

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <header className="text-center bg-gradient-to-r from-green-500 to-blue-500 text-white py-16 rounded-lg shadow-lg">
        <h1 className="text-5xl font-extrabold">Get in Touch</h1>
        <p className="mt-4 text-lg max-w-xl mx-auto">
          We'd love to hear from you! Whether you have a question or just want to connect, reach out to us.
        </p>
      </header>

      <section className="mt-12 flex flex-col items-center">
        <h2 className="text-4xl font-semibold text-gray-800 text-center">
          Contact Us
        </h2>
        <p className="mt-4 text-lg text-gray-600 text-center max-w-2xl">
          Fill out the form below, or reach us via our social media channels. We’ll get back to you as soon as possible!
        </p>

        <form className="mt-10 w-full max-w-2xl bg-white rounded-lg shadow-lg p-8 space-y-6">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-gray-700 font-semibold">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Your Name"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-700 font-semibold">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Your Email"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="message" className="text-gray-700 font-semibold">Message</label>
            <textarea
              id="message"
              name="message"
              
              className="mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Your Message"
            />
          </div>

          <button type="submit" className="w-full py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg text-lg font-semibold shadow-md hover:opacity-90 transition duration-300">
            Send Message
          </button>
        </form>
      </section>

      <section className="mt-16 flex flex-col items-center text-center">
        <h2 className="text-4xl font-semibold text-gray-800">
          Connect With Us
        </h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl">
          Follow us on social media to stay updated with our latest posts and announcements!
        </p>

        <div className="mt-8 flex space-x-6">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.597 0 0 .598 0 1.333v21.334C0 23.403.598 24 1.333 24H12v-9.293H9.25V11.25H12V8.577c0-2.762 1.632-4.29 4.125-4.29 1.194 0 2.445.213 2.445.213v2.66H16.57c-1.293 0-1.694.812-1.694 1.648v1.943h2.907l-.465 2.457h-2.442V24h4.894C23.403 24 24 23.402 24 22.667V1.333C24 .598 23.403 0 22.675 0z" /></svg>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.833.656-2.828.775 1.017-.609 1.797-1.574 2.165-2.723-.951.564-2.005.974-3.127 1.195-.897-.957-2.177-1.554-3.594-1.554-2.719 0-4.92 2.203-4.92 4.917 0 .386.045.763.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.422.723-.666 1.562-.666 2.475 0 1.71.87 3.217 2.188 4.099-.81-.026-1.571-.248-2.24-.616v.062c0 2.386 1.698 4.374 3.946 4.828-.413.113-.848.172-1.296.172-.317 0-.627-.031-.929-.088.631 1.953 2.445 3.376 4.6 3.416-1.68 1.319-3.804 2.105-6.105 2.105-.397 0-.787-.023-1.175-.069 2.18 1.397 4.767 2.211 7.548 2.211 9.05 0 14.001-7.496 14.001-13.986 0-.213-.005-.426-.014-.637.961-.695 1.8-1.562 2.46-2.549z" /></svg>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24"><path d="M22.225 0H1.771C.791 0 0 .775 0 1.731v20.535C0 23.222.791 24 1.771 24h20.451c.98 0 1.775-.778 1.775-1.734V1.731C24 .775 23.205 0 22.225 0zM7.125 20.457H3.56V9.457h3.564v11zm-1.778-12.6c-1.136 0-2.057-.92-2.057-2.054a2.057 2.057 0 0 1 4.115 0c0 1.135-.92 2.054-2.057 2.054zM20.457 20.457h-3.563v-5.414c0-1.293-.026-2.957-1.803-2.957-1.806 0-2.083 1.411-2.083 2.866v5.505H9.444V9.457h3.417v1.507h.047c.477-.901 1.639-1.85 3.374-1.85 3.607 0 4.27 2.371 4.27 5.458v6.885z" /></svg>
          </a>
        </div>
      </section>

      <footer className="mt-16 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} Tech Blog. All rights reserved.</p>
      </footer>
    </div>
  );
}
