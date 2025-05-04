import React, { useState } from 'react';

const ContactPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !message) {
      setError('Please fill out all fields.');
      setSuccess('');
      return;
    }

    // Simulate email sending logic
    setTimeout(() => {
      setSuccess('Your message has been sent successfully!');
      setError('');
      setEmail('');
      setMessage('');
    }, 1000);
  };

  return (
    <div className="bg-[#232323] text-white h-screen w-screen flex flex-col items-center justify-center px-6">
      {/* Header */}
      <h1 className="text-4xl font-bold text-[#C84F19] mb-4">Contact Me</h1>

      {/* Links Section */}
      <div className="flex space-x-6 mb-6">
        <a
          href="https://www.linkedin.com/in/anmol-k14/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg text-[#9CA3AF] hover:text-[#C84F19] transition"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/anmol-k14"
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg text-[#9CA3AF] hover:text-[#C84F19] transition"
        >
          GitHub
        </a>
      </div>

      {/* <form
        onSubmit={handleSubmit}
        className="bg-[#1F1F1F] p-6 rounded-lg border-[1px] border-[#5D5D5D] w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-[#C84F19] mb-4">Send a Message</h2>

        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-2 bg-[#2E2E2E] text-white rounded-lg focus:outline-none"
        />

        <textarea
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full mb-4 p-2 bg-[#2E2E2E] text-white rounded-lg focus:outline-none resize-none"
          rows="5"
        ></textarea>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}

        <button
          type="submit"
          className="w-full py-2 bg-[#C84F19] text-white rounded-lg hover:scale-105 transition-all duration-300"
        >
          Send Message
        </button>
      </form> */}
    </div>
  );
};

export default ContactPage;