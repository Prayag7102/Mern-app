import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { loginUser } from "../api/auth"; 
import { toast } from "react-toastify";
import { useUser } from "../context/user.context";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const {fetchUser} = useUser();

  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
        const data = await loginUser(email, password);

        await fetchUser();
        toast.success("Login successful! Welcome,",{
          theme:'dark',
          draggable:true
        })
        navigate("/profile");
      } catch (err) {
        if (err === 401) {
          setError("Invalid email or password. Please try again.");
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
  };

  return (
    <>
      <div className=" w-screen flex justify-center items-center bg-gray-100">
        <div className="grid gap-8">
          <div
            id="back-div"
            className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-[26px] m-4"
          >
            <div className=" border-transparent rounded-[20px] dark:bg-white bg-white shadow-lg xl:p-10 2xl:p-10 lg:p-5 md:p-5 sm:p-2 m-2">
              <h1 className="pt-8 pb-6 font-bold dark:text-black text-5xl text-center cursor-default">
                Log in
              </h1>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label htmlFor="email" className="mb-2 dark:text-black text-lg">
                    Email
                  </label>
                  <input
                    id="email"
                    className="border p-3 dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password" className="mb-2 dark:text-black text-lg">
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
