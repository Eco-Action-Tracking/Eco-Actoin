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
//           إيكو فاشن
//         </motion.div>
//         <ul className="flex space-x-6">
//           {['الرئيسية', 'خدماتنا', 'من نحن', 'اتصل بنا'].map((item, index) => (
//             <motion.li key={index} whileHover={{ scale: 1.1 }}>
//               <a href={`#${item === 'الرئيسية' ? '' : item}`} className="text-gray-600 hover:text-green-600 transition duration-300">
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