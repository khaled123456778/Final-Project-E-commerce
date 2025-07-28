import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from "../../assets/finalProject assets/logo.svg";
import { TokenContext } from '../Context/TokenContextProvider';
import DarkModeToggle from '../DarkModeToggle/DarkModeToggle';
import { NavLink } from 'react-router-dom';


export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const hiddenPaths = [
    "/", "/login", "/Login", "/ForgotPassword",
    "/verifyResetCode", "/ResetPassword",
    "/ChangeUserAccount", "/ChangeUserPassword"
  ];

  const isLoginPage = hiddenPaths.includes(location.pathname);
  const isRegisterPage = location.pathname === "/Register";

  const { token, setToken, setlogedUser } = useContext(TokenContext);

  const [menuOpen, setMenuOpen] = useState(false);

  function logOut() {
    setToken(null);
    localStorage.removeItem("token");
    setlogedUser(false);
    navigate("/Login");
  }

  return (
    <nav className="theme">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-1">
        <Link to="/home" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} className="h-8" alt="Logo" />
          {/* <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">YourApp</span> */}
        </Link>

        {/* Hamburger */}
        <button
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 17 14">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>

        {/* Menu */}
        <div className={`${menuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
          <ul className="font-medium flex flex-col p-2 md:p-0 mt-4 border border-gray-100 rounded-lg 
                         md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 
                        ">
            {
              !isLoginPage && !isRegisterPage && (
                <>
                <li>
<NavLink
  to="/Home"
  className={({ isActive }) =>
    isActive
      ? "nav-link relative after:absolute after:left-0 after:-bottom-0.5 after:w-full after:h-[2px] after:bg-blue-700 after:transition-transform after:duration-300 after:origin-left after:scale-x-100"
      : "nav-link relative after:absolute after:left-0 after:-bottom-0.5 after:w-full after:h-[2px] after:bg-blue-700 after:transition-transform after:duration-300 after:origin-left after:scale-x-0"
  }
>
  Home
</NavLink>

</li>
<li>
  <NavLink
    to="/Products"
    className={({ isActive }) =>
    isActive
      ? "nav-link relative after:absolute after:left-0 after:-bottom-0.5 after:w-full after:h-[2px] after:bg-blue-700 after:transition-transform after:duration-300 after:origin-left after:scale-x-100"
      : "nav-link relative after:absolute after:left-0 after:-bottom-0.5 after:w-full after:h-[2px] after:bg-blue-700 after:transition-transform after:duration-300 after:origin-left after:scale-x-0"
  }
  >
    Products
  </NavLink>
</li>
<li>
  <NavLink
    to="/Cart"
     className={({ isActive }) =>
    isActive
      ? "nav-link relative after:absolute after:left-0 after:-bottom-0.5 after:w-full after:h-[2px] after:bg-blue-700 after:transition-transform after:duration-300 after:origin-left after:scale-x-100"
      : "nav-link relative after:absolute after:left-0 after:-bottom-0.5 after:w-full after:h-[2px] after:bg-blue-700 after:transition-transform after:duration-300 after:origin-left after:scale-x-0"
  }
  >
    Cart
  </NavLink>
</li>
<li>
  <NavLink
    to="/categories"
    className={({ isActive }) =>
    isActive
      ? "nav-link relative after:absolute after:left-0 after:-bottom-0.5 after:w-full after:h-[2px] after:bg-blue-700 after:transition-transform after:duration-300 after:origin-left after:scale-x-100"
      : "nav-link relative after:absolute after:left-0 after:-bottom-0.5 after:w-full after:h-[2px] after:bg-blue-700 after:transition-transform after:duration-300 after:origin-left after:scale-x-0"
  }
  >
    Categories
  </NavLink>
</li>
<li>
  <NavLink
    to="/Brands"
     className={({ isActive }) =>
    isActive
      ? "nav-link relative after:absolute after:left-0 after:-bottom-0.5 after:w-full after:h-[2px] after:bg-blue-700 after:transition-transform after:duration-300 after:origin-left after:scale-x-100"
      : "nav-link relative after:absolute after:left-0 after:-bottom-0.5 after:w-full after:h-[2px] after:bg-blue-700 after:transition-transform after:duration-300 after:origin-left after:scale-x-0"
  }
  >
    Brands
  </NavLink>
</li>
<li>
  <NavLink
    to="/WishList"
     className={({ isActive }) =>
    isActive
      ? "nav-link relative after:absolute after:left-0 after:-bottom-0.5 after:w-full after:h-[2px] after:bg-blue-700 after:transition-transform after:duration-300 after:origin-left after:scale-x-100"
      : "nav-link relative after:absolute after:left-0 after:-bottom-0.5 after:w-full after:h-[2px] after:bg-blue-700 after:transition-transform after:duration-300 after:origin-left after:scale-x-0"
  }
  >
    WishList
  </NavLink>
</li>

                </>
              )
            }

            {/* Auth Links */}

            {
              !isRegisterPage && (
                <li>
                  <Link to="/Register" className="nav-link">Register</Link>
                </li>
              )
            }

            {
              !isLoginPage && !isRegisterPage && (
                <li>
                  <span onClick={logOut} className="cursor-pointer nav-link text-red-600 hover:text-red-800">Logout</span>
                </li>
              )
            }
            {/* Dark Mode Toggle */}
            <li>
              <DarkModeToggle />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
