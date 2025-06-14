import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!username || !password) {
      setError('Username and password are required');
      return;
    }
    const result = await login({ username, password });
    if (!result.success) {
      setError(result.message);
    }
    // Optionally redirect here if your router doesn't do it automatically
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white text-black">
      <div className="text-center mb-6">
        <img src="/vite.svg" alt="logo" className="w-20 mx-auto" />
        <h1 className="text-2xl font-bold">Welcome to</h1>
        <h2 className="text-3xl font-bold">JIVHALA MOTORS</h2>
        <p className="mt-2">Login</p>
      </div>
      <form className="w-4/5 max-w-sm space-y-4" onSubmit={handleSubmit}>
        <input
          className="w-full px-4 py-2 border rounded-lg"
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          className="w-full px-4 py-2 border rounded-lg"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button className="w-full bg-black text-white py-2 rounded-lg font-semibold" type="submit">
          Login
        </button>
        {error && <div className="text-red-500 text-sm">{error}</div>}
      </form>
      <p className="mt-8 text-xs text-gray-500">
        Designed and developed by <span className="font-semibold text-blue-500">5TechG</span>
      </p>
    </div>
  );
}