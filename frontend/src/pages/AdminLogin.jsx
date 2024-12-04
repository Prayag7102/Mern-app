import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import { adminLogin } from '../api/auth';
import { toast } from 'react-toastify';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await adminLogin(username, password); 

      
      if (data.token) {
        localStorage.setItem("adminToken", data.token);
      }
      toast.success("successfully logged in!")
      navigate('/admin/dashboard'); 
    } catch (err) {
      setError(err.message || 'Login failed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center dark:bg-gray-900">
        <div className="grid gap-8">
          <div
            id="back-div"
            className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-[26px] m-4"
          >
            <div className="border-[20px] border-transparent rounded-[20px] dark:bg-gray-900 bg-white shadow-lg xl:p-10 2xl:p-10 lg:p-10 md:p-10 sm:p-2 m-2">
              <h1 className="pt-8 pb-6 font-bold dark:text-gray-400 text-5xl text-center cursor-default">
                Admin Log in
              </h1>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label htmlFor="username" className="mb-2 dark:text-gray-400 text-lg">
                    Username
                  </label>
                  <input
                    id="username"
                    className="border p-3 dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password" className="mb-2 dark:text-gray-400 text-lg">
                    Password
                  </label>
                  <input
                    id="password"
                    className="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button
                  className="bg-gradient-to-r dark:text-gray-300 from-blue-500 to-purple-500 shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "LOG IN"}
                </button>
              </form>
              {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
