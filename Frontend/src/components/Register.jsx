import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { changeAuth } from "../reducers/userSlice";
function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const register = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        "https://pic-share-omega.vercel.app/api/register",
        {
          username,
          email,
          password,
        }
      );
      localStorage.setItem("auth", data.token);
      dispatch(changeAuth(localStorage.getItem("auth")));
      setLoading(false);
      navigate("/home");
    } catch (err) {
      console.log("Error is:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center">
      <div>
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Log in to your account
        </h2>
      </div>

      <div className="mt-8 mx-auto w-full max-w-md">
        <div className="bg-white py-8 shadow-2xl rounded-lg px-10">
          <form onSubmit={(e) => register(e)} className="space-y-4">
            <div>
              <label
                htmlFor="text"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <div className="mt-1">
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  id="text"
                  name="text"
                  type="text"
                  required
                  className=" block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className=" block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link
                  to={"/"}
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Log In
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4  rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 items-center gap-4 focus:outline-none focus:ring-indigo-500"
              >
                Sign Up
                {loading && (
                  <div className="w-4 h-4 border-white border-b-[1px] border-l-[1px] border-t-[2px] border-r-[1px] animate-spin rounded-full"></div>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
