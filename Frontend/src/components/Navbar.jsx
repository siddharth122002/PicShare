import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../components/Logo";
import { changeAuth, dropDown } from "../reducers/userSlice";
function Navbar() {
  const isOpen = useSelector((state) => state.user.isOpen);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userId, setUserId] = useState("");
  const [avatar, setAvatar] = useState("");
  useEffect(() => {
    const getID = async () => {
      const { data } = await axios.get(
        `https://pic-share-omega.vercel.app/api/current`,
        {
          headers: {
            auth: localStorage.getItem("auth"),
          },
        }
      );
      setUserId(data._id);
      setAvatar(data.avatar);
    };
    getID();
  }, []);
  const open = () => {
    console.log(isOpen);
    dispatch(dropDown());
  };
  const logout = () => {
    open();
    localStorage.clear();
    dispatch(changeAuth(localStorage.getItem("auth")));
    return navigate("/");
  };
  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-400 sticky top-0 w-full z-10">
      <div className=" mx-auto px-6 max-w-7xl relative ">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to={"/home"}>
              <div className="hover:cursor-pointer">
                <Logo />
              </div>
            </Link>

            <div className="md:block">
              <div className="ml-10 flex w-full">
                <div className="flex text-white w-full text-2xl bg-indigo-600 items-center rounded-md px-2">
                  <input
                    type="text"
                    className="md:w-full  md:flex hidden w-28 flex-1 text-white bg-transparent px-3 py-2 text-sm font-medium focus:outline-none"
                    placeholder="Find people"
                  />
                  <CiSearch className="text-white hover:cursor-pointer hidden md:flex" />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="ml-4 flex items-center ">
              <div className="ml-3">
                <img
                  tabIndex={0}
                  onClick={open}
                  className="absolute top-3 right-4 h-10 w-10 rounded-full hover:cursor-pointer border-2 border-slate-700 focus:border-white"
                  src={avatar}
                  alt=""
                />
                {isOpen && (
                  <div className="absolute right-4 mt-12 w-20 md:w-48 rounded-md shadow-lg bg-white ring-2 ring-black ring-opacity-5 z-50 ">
                    <div>
                      <Link
                        to={`/profile/${userId}`}
                        onClick={open}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Profile
                      </Link>
                      <div
                        onClick={logout}
                        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
