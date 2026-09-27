'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      // alert('Login successful!');
      router.push('/dashboard');
    } else {
      alert(data.error);
    }};
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white px-4">
      <div className="bg-gray-900 p-8 rounded-2xl shadow-md w-full max-w-md border border-gray-800">
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-400">Welcome Back</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"placeholder="Email Address"value={email} onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-400"/>
          <input
            type="password" placeholder="Password"value={password}onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-400" />
          <button type="submit" className="bg-purple-600 hover:bg-purple-700 p-3 rounded font-semibold transition-all"> Log In
          </button>
        </form>
        <p className="text-sm text-gray-400 mt-4 text-center"> Don't have an account?{" "}
          <Link href="/signup" className="text-purple-400 hover:underline"> Sign up</Link>
        </p>
      </div>
    </div>
  );
};
export default Login;
