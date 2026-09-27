'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const router = useRouter();
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (res.ok) {
      alert("Signup successful!");
      router.push('/login');
    } else {
      alert(data.error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white px-4 relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-2/3 h-full bg-[radial-gradient(circle_at_top_left,_rgba(123,97,255,0.3),_transparent_70%)] blur-3xl" />
        <div className="absolute inset-0 bg-[length:40px_40px] bg-[linear-gradient(transparent_39px,_rgba(255,255,255,0.05)_40px),linear-gradient(90deg,transparent_39px,_rgba(255,255,255,0.05)_40px)]" />
      </div>
      <div className="bg-gray-900 p-8 rounded-2xl shadow-md w-full max-w-md border border-gray-800 relative z-10">
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-400">Create Account</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text" name="fullName"placeholder="Full Name"value={formData.fullName} onChange={handleChange}
            className="p-3 rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-400"/>
          <input
            type="text" name="username"placeholder="Username" value={formData.username}
            onChange={handleChange}
            className="p-3 rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-400"/>
          <input
            type="email"name="email"
            placeholder="Email Address" value={formData.email}onChange={handleChange} className="p-3 rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-400"/>
          <input
            type="password"
            name="password" placeholder="Password" value={formData.password}onChange={handleChange}
            className="p-3 rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-400"/>
          <input type="password" name="confirmPassword"
            placeholder="Confirm Password"value={formData.confirmPassword}
            onChange={handleChange} className="p-3 rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-400"/>
          <button type="submit" className="bg-purple-600 hover:bg-purple-700 p-3 rounded font-semibold transition-all">
            Sign Up
          </button>
        </form>
        <p className="text-sm text-gray-400 mt-4 text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-purple-400 hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;