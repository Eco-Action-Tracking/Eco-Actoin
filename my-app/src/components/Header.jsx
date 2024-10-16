import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Recycle,
  Shirt,
  Leaf,
  Heart,
  User,
  Menu,
  X,
  LogOut,
  ShoppingBag,
  UserCircle,
} from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { useCartOperations } from "../hooks/useCart";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const { cart } = useCartOperations();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const { data } = await axios.get("/api/status", {
          withCredentials: true,
        });
        console.log(data);
        setIsLoggedIn(data.isLoggedIn);
        setUser(data.user);
      } catch (error) {
        console.error("Error checking auth status:", error);
        setIsLoggedIn(false);
        setUser(null);
      }
    };

    checkAuthStatus();
    const authIntervalId = setInterval(checkAuthStatus, 5000);

    return () => {
      clearInterval(authIntervalId);
    };
  }, []);

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "About Us", href: "/About" },
    { name: "Contact Us", href: "/contact" },
  ];

  const CartIcon = () => (
    <div className="relative">
      <ShoppingBag className="w-5 h-5" />
      {cart.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
          {cart.length}
        </span>
      )}
    </div>
  );

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        setIsLoggedIn(false);
        window.location.href = "/";
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="bg-gradient-to-r from-indigo-600 to-teal-600 shadow-lg sticky top-0 z-50"
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-3xl font-bold text-white flex items-center"
          >
            <svg
              className="w-10 h-10 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 9L15 3M15 3L9 9M15 3V21"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3 15L9 21M9 21L15 15M9 21V3"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            EcoStitch
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <ul className="flex space-x-6">
              {menuItems.map((item, index) => (
                <motion.li key={index} whileHover={{ scale: 1.1 }}>
                  <Link
                    href={item.href}
                    className="text-white hover:text-indigo-200 transition duration-300 flex items-center"
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
              <motion.li whileHover={{ scale: 1.1 }}>
                <Link
                  href="/cart"
                  className="text-white hover:text-indigo-200 transition duration-300 flex items-center"
                >
                  <CartIcon />
                </Link>
              </motion.li>
            </ul>
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-indigo-600 px-4 py-2 rounded-full font-semibold flex items-center transition duration-300 hover:bg-indigo-100 cursor-pointer"
                >
                  <Link href="/profile" className="flex items-center">
                    <UserCircle className="w-5 h-5 mr-2" />
                    Profile
                  </Link>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="bg-white text-indigo-600 px-4 py-2 rounded-full font-semibold flex items-center transition duration-300 hover:bg-indigo-100 cursor-pointer"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  Logout
                </motion.button>
              </div>
            ) : (
              <Link href="/login" passHref>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-indigo-600 px-4 py-2 rounded-full font-semibold flex items-center transition duration-300 hover:bg-indigo-100 cursor-pointer"
                >
                  <User className="w-5 h-5 mr-2" />
                  Login
                </motion.button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4"
          >
            <ul className="flex flex-col space-y-4">
              {menuItems.map((item, index) => (
                <motion.li key={index} whileHover={{ scale: 1.05 }}>
                  <Link
                    href={item.href}
                    className="text-white hover:text-indigo-200 transition duration-300 flex items-center"
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
              <motion.li whileHover={{ scale: 1.05 }}>
                <Link
                  href="/cart"
                  className="text-white hover:text-indigo-200 transition duration-300 flex items-center"
                >
                  <CartIcon />
                  <span className="ml-2">Cart</span>
                </Link>
              </motion.li>
              <motion.li whileHover={{ scale: 1.05 }}>
                {isLoggedIn ? (
                  <>
                    <Link href="/profile" passHref>
                      <motion.button className="w-full bg-white text-indigo-600 px-4 py-2 rounded-full font-semibold flex items-center justify-center transition duration-300 hover:bg-indigo-100 cursor-pointer mb-2">
                        <UserCircle className="w-5 h-5 mr-2" />
                        Profile
                      </motion.button>
                    </Link>
                    <motion.button
                      onClick={handleLogout}
                      className="w-full bg-white text-indigo-600 px-4 py-2 rounded-full font-semibold flex items-center justify-center transition duration-300 hover:bg-indigo-100 cursor-pointer"
                    >
                      <LogOut className="w-5 h-5 mr-2" />
                      Logout
                    </motion.button>
                  </>
                ) : (
                  <Link href="/login" passHref>
                    <motion.button className="w-full bg-white text-indigo-600 px-4 py-2 rounded-full font-semibold flex items-center justify-center transition duration-300 hover:bg-indigo-100 cursor-pointer">
                      <User className="w-5 h-5 mr-2" />
                      Login
                    </motion.button>
                  </Link>
                )}
              </motion.li>
            </ul>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
};

export default Header;
