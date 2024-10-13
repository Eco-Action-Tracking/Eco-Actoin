// import React from 'react';
// import { motion } from 'framer-motion';
// import { Recycle } from 'lucide-react';

// const Header = () => {
//   return (
//     <motion.header 
//       initial={{ y: -100 }}
//       animate={{ y: 0 }}
//       transition={{ type: "spring", stiffness: 100 }}
//       className="bg-white shadow-md sticky top-0 z-50"
//     >
//       <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
//         <motion.div 
//           whileHover={{ scale: 1.1 }}
//           className="text-2xl font-bold text-green-600 flex items-center"
//         >
//           <Recycle className="mr-2" />
//           EcoFashion
//         </motion.div>
//         <ul className="flex space-x-6">
//           {['Home', 'Services', 'About', 'Contact'].map((item, index) => (
//             <motion.li key={index} whileHover={{ scale: 1.1 }}>
//               <a href={`${item.toLowerCase()}`} className="text-gray-600 hover:text-green-600 transition duration-300">
//                 {item}
//               </a>
//             </motion.li>
//           ))}
//         </ul>
//       </nav>
//     </motion.header>
//   );
// };

// export default Header;







// import React from 'react';
// import { motion } from 'framer-motion';
// import { Recycle, Shirt, Leaf, Heart } from 'lucide-react';

// const Header = () => {
//   const menuItems = [
//     { name: 'Home', icon: <Heart className="w-5 h-5" /> },
//     { name: 'Our Services', icon: <Shirt className="w-5 h-5" /> },
//     { name: 'About', icon: <Leaf className="w-5 h-5" /> },
//     { name: 'contact', icon: <Recycle className="w-5 h-5" /> },
//   ];

//   return (
//     <motion.header 
//       initial={{ y: -100 }}
//       animate={{ y: 0 }}
//       transition={{ type: "spring", stiffness: 100 }}
//       className="bg-gradient-to-r from-green-500 to-teal-500 shadow-md sticky top-0 z-50"
//     >
//       <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
//         <motion.div 
//           whileHover={{ scale: 1.05 }}
//           className="text-3xl font-bold text-white flex items-center"
//         >
//           <svg className="w-10 h-10 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path d="M21 9L15 3M15 3L9 9M15 3V21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//             <path d="M3 15L9 21M9 21L15 15M9 21V3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//           </svg>
//           EcoStitch
//         </motion.div>
//         <ul className="flex space-x-6">
//           {menuItems.map((item, index) => (
//             <motion.li key={index} whileHover={{ scale: 1.1 }}>
//               <a 
//                 href={`${item.name === 'Home' ? '' : item.name}`} 
//                 className="text-white hover:text-green-200 transition duration-300 flex items-center"
//               >
//                 <span className="mr-2">{item.icon}</span>
//                 {item.name}
//               </a>
//             </motion.li>
//           ))}
//         </ul>
//       </nav>
//     </motion.header>
//   );
// };

// export default Header;








import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Recycle, Shirt, Leaf, Heart, User, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: 'Home', icon: <Heart className="w-5 h-5" />, href: '/' },
    { name: 'Services', icon: <Shirt className="w-5 h-5" />, href: '/services' },
    { name: 'About', icon: <Leaf className="w-5 h-5" />, href: '/About' },
    { name: 'Contact', icon: <Recycle className="w-5 h-5" />, href: '/contact' },
  ];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="bg-gradient-to-r from-green-600 to-teal-600 shadow-lg sticky top-0 z-50"
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="text-3xl font-bold text-white flex items-center"
          >
            <svg className="w-10 h-10 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 9L15 3M15 3L9 9M15 3V21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 15L9 21M9 21L15 15M9 21V3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            EcoStitch
          </motion.div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <ul className="flex space-x-6">
              {menuItems.map((item, index) => (
                <motion.li key={index} whileHover={{ scale: 1.1 }}>
                  <a 
                    href={item.href}
                    className="text-white hover:text-green-200 transition duration-300 flex items-center"
                  >
                    <span className="ml-2">{item.icon}</span>
                    {item.name}
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-green-600 px-4 py-2 rounded-full font-semibold flex items-center transition duration-300 hover:bg-green-100"
            >
              <User className="w-5 h-5 ml-2" />
              Log In
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
                  <a 
                    href={item.href}
                    className="text-white hover:text-green-200 transition duration-300 flex items-center"
                  >
                    <span className="ml-2">{item.icon}</span>
                    {item.name}
                  </a>
                </motion.li>
              ))}
              <motion.li whileHover={{ scale: 1.05 }}>
                <button className="w-full bg-white text-green-600 px-4 py-2 rounded-full font-semibold flex items-center justify-center transition duration-300 hover:bg-green-100">
                  <User className="w-5 h-5 ml-2" />
                  Log In
                </button>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
};

export default Header;
