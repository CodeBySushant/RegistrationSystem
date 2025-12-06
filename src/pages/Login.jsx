import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const success = login(username, password);   // <-- calls the context
    if (success) {
      navigate('/dashboard');                    // go to the first protected page
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('/background.jpg')` }}
    >
      <div className="absolute inset-0 bg-blue-100 opacity-80" />
      <div className="relative bg-white rounded-lg shadow-2xl p-8 w-full max-w-md mx-4">
        {/* ---- Logo & Header ---- */}
        <div className="text-center mb-6">
          <img src="/nepallogo.svg" alt="नागार्जुन नगरपालिका" className="w-20 h-20 mx-auto mb-3 object-contain" />
          <h1 className="text-sm font-medium text-gray-700 leading-tight">
            नागार्जुन नगरपालिका<br />नगर कार्यपालिकाको कार्यालय, काठमाडौं
          </h1>
        </div>
        <hr className="mb-6 border-gray-300" />

        <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
          गुनासो रिर्पोटिङ सिस्टम
        </h2>

        {/* ---- Form ---- */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              प्रयोगकर्ता नाम
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="प्रयोगकर्ता नाम..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              पासवर्ड
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="पासवर्ड..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              required
            />
          </div>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-gray-700 text-white py-2 rounded-md hover:bg-gray-800 transition font-medium"
          >
            लग इन गर्नुहोस्
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;