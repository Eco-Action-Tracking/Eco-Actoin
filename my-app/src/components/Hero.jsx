// import React from 'react';
// import { motion } from 'framer-motion';
// import { ChevronRight, Recycle } from 'lucide-react';

// const Hero = () => {
//   return (
//     <div className="bg-green-600 text-white overflow-hidden">
//       <div className="container mx-auto px-6 py-20 relative">
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="text-center relative z-10"
//         >
//           <h1 className="text-5xl font-bold mb-6">Recycle Your Clothes, Save Our Planet</h1>
//           <p className="text-xl mb-8">We transform your old clothes into new, innovative designs</p>
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="bg-white text-green-600 font-bold py-3 px-6 rounded-full inline-flex items-center text-lg"
//           >
//             Get Started
//             <ChevronRight className="ml-2" />
//           </motion.button>
//         </motion.div>
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
//           className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
//         >
//           <Recycle size={400} className="text-green-500 opacity-10" />
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Hero;






import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Recycle } from 'lucide-react';
import Link from 'next/link';

const Hero = () => {
  const images = [
    'https://th.bing.com/th/id/OIP.aAShm5kmudvPeBaVWwu9eAHaD9?w=1254&h=670&rs=1&pid=ImgDetMain',
    'https://th.bing.com/th/id/R.de257742ab8d9da99f67987ad15b7871?rik=1OhkyCua1CNjUA&riu=http%3a%2f%2fi.etsystatic.com%2finv%2fac5005%2f3345689855%2finv_fullxfull.3345689855_bf2k0rvx.jpg%3fversion%3d0&ehk=BFMOMXYwh245iH0XoGNHGdwgAEWMnXCJZlLE9BuJ5L0%3d&risl=&pid=ImgRaw&r=0',
    'https://s7ap1.scene7.com/is/image/bigw/BDAH-Denim-jacket_HPB-5_210226?$cms-max-image-threshold$&fmt=png-alpha&wid=1178&fit=hfit%2C1',
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Image Slider */}
      {images.map((image, index) => (
        <motion.div
          key={index}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: index === currentImage ? 1 : 0 }}
          transition={{ duration: 1 }}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-indigo-600 bg-opacity-20" /> {/* Changed to indigo */}

      {/* Content */}
      <div className="container mx-auto px-6 py-10 relative h-full flex justify-center items-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center relative z-10 text-white bg-[#302e2e8a] rounded-xl p-10"
        >
          <h1 className="text-4xl font-bold mb-4">Recycle Your Clothes, Save Our Planet</h1>
          <p className="text-lg mb-6">We transform your old clothes into new, innovative designs</p>
          <Link href="/products">
            <button className="bg-indigo-400 text-white py-2 px-8 rounded-full hover:bg-indigo-700 transition-colors"> {/* Changed to indigo */}
              View Our Products
            </button>
          </Link>
        </motion.div>

        {/* Rotating Icon */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          <Recycle size={250} className="text-white opacity-5" /> {/* Reduced opacity */}
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
