import React from 'react';

const AboutPage = () => {
  return (
    <div className="bg-[#232323] text-white h-screen w-screen flex flex-col items-center justify-center px-6">
      {/* Header */}
      <h1 className="text-4xl font-bold text-[#C84F19] mb-4">About CollabCode</h1>

      {/* Description */}
      <p className="text-lg text-[#9CA3AF] text-center max-w-3xl mb-6">
        CollabCode is a real-time collaborative coding platform designed to bring developers together. 
        Whether you're working on a team project, learning to code, or brainstorming ideas, 
        CollabCode provides the tools you need to collaborate seamlessly.
      </p>

      {/* Features Section */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-[#C84F19] mb-4">Features</h2>
        <ul className="text-lg text-[#9CA3AF] space-y-2">
          <li>- Real-time code collaboration</li>
          <li>- AI-powered code suggestions</li>
          <li>- Multi-language support</li>
          <li>- Secure and reliable platform</li>
        </ul>
      </div>
    </div>
  );
};

export default AboutPage;