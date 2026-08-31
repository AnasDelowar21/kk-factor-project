import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Lock, User } from 'lucide-react';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password
      });
      localStorage.setItem('adminToken', res.data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#FFF0F7] to-[#F5F0FF] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF1F8E] flex items-center justify-center shadow-lg">
              <Lock className="w-5 h-5 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-extrabold text-[#1A1A1A]">
            THE KK <span className="text-[#FF1F8E]">FACTOR</span>
          </h1>
          <p className="text-sm text-[#888888] mt-1 font-medium">Admin Portal</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-[#E8E8E8] p-8">
          <h2 className="text-xl font-extrabold text-[#1A1A1A] mb-6">Sign In</h2>

          {error && (
            <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Username */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#888888] mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#AAAAAA]" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="Enter your username"
                  className="w-full pl-10 pr-4 py-3 bg-[#FAFAFA] border border-[#E8E8E8] rounded-xl text-sm text-[#1A1A1A] placeholder-[#AAAAAA] focus:outline-none focus:border-[#FF1F8E] focus:ring-2 focus:ring-[#FF1F8E]/10 transition"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#888888] mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#AAAAAA]" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-4 py-3 bg-[#FAFAFA] border border-[#E8E8E8] rounded-xl text-sm text-[#1A1A1A] placeholder-[#AAAAAA] focus:outline-none focus:border-[#FF1F8E] focus:ring-2 focus:ring-[#FF1F8E]/10 transition"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#FF1F8E] hover:bg-[#C4006A] text-white font-bold rounded-xl text-sm uppercase tracking-wider transition shadow-md shadow-[#FF1F8E]/20 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-[#AAAAAA] mt-6">
          © 2026 THE KK FACTOR. Admin access only.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
