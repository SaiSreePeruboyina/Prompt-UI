
'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const PromptUI = () => {
  const router = useRouter();
  const handleExploreClick = () => {
    router.push('/generate');
  };
  const handleSignup = () => {
    router.push('/signup');
  };
  const handleLogin = () => {
    router.push('/login');
  };
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(123,97,255,0.2),_transparent_70%)]">
        <div className="w-full h-full bg-[linear-gradient(rgba(255,255,255,0.08)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(255,255,255,0.08)_1px,_transparent_1px)] bg-[50px_50px] z-0" />
      </div>
      <nav className="flex justify-between items-center px-10 py-6 relative z-10">
        <div className="text-xl font-bold text-purple-400">Prompt.</div>
        <div className="flex gap-8 items-center text-sm font-medium">
          <button className="border border-purple-400 px-4 py-2 rounded-full hover:bg-purple-400 hover:text-black transition" onClick={handleLogin}>
            Login
          </button>
          <button className="border border-purple-400 px-4 py-2 rounded-full hover:bg-purple-400 hover:text-black transition" onClick={handleSignup}>
            Signup
          </button>
        </div>
      </nav>
      <section className="flex flex-col items-center justify-center text-center py-24 relative z-10 px-4">
        <h1 className="text-[64px] sm:text-[80px] font-bold tracking-wider">
          <span className="text-purple-400">PROMPT</span> <span className="text-white">UI</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 mt-4">
          Where ideas ignite, and development flows.
        </p>
        <div className="flex gap-4 mt-6">
          <button className="border border-gray-400 px-6 py-3 rounded-full hover:bg-white hover:text-black transition font-semibold"> How it works
          </button><button
            className="bg-purple-400 px-6 py-3 rounded-full text-white hover:bg-purple-500 transition font-semibold flex items-center gap-2"
            onClick={handleExploreClick}>
            Explore Now <span className="text-lg">→</span>
          </button>
        </div>
      </section>
<section className="relative z-10 px-10 py-20 bg-[#0D0D0D]">
  <h2 className="text-3xl font-bold text-center mb-10 text-purple-400">Powerful Features</h2>
  <div className="grid md:grid-cols-3 gap-6">
    <div className="bg-[#1a1a1a] p-6 rounded-lg border border-gray-700 hover:shadow-lg transition">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white mr-3">
          <span className="text-lg">⚡</span>
        </div>
        <h3 className="text-xl font-semibold text-white">AI-Powered Generation</h3>
      </div>
      <p className="text-gray-400">
        Describe what you want and let AI generate the UI code for you. Save hours of manual coding.
      </p>
    </div>
    <div className="bg-[#1a1a1a] p-6 rounded-lg border border-gray-700 hover:shadow-lg transition">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white mr-3">
          <span className="text-lg">🎨</span>
        </div>
        <h3 className="text-xl font-semibold text-white">Visual Builder</h3>
      </div>
      <p className="text-gray-400">
        Drag and drop components to build your UI visually. See changes instantly in the preview.
      </p>
    </div>
    <div className="bg-[#1a1a1a] p-6 rounded-lg border border-gray-700 hover:shadow-lg transition">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white mr-3">
          <span className="text-lg">💾</span>
        </div>
        <h3 className="text-xl font-semibold text-white">Code Export</h3>
      </div>
      <p className="text-gray-400">
        Export clean, maintainable code for your entire project. Ready to use in your favorite framework.
      </p>
    </div>
  </div>
</section>    
    </div>
  );
};

export default PromptUI;
