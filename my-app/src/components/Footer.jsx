import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="اتصل بنا" className="bg-green-800 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 text-center md:text-left mb-6 md:mb-0">
            <h3 className="text-2xl font-bold flex items-center justify-center md:justify-start">
              <Heart className="mr-2 text-red-400" /> إيكو فاشن
            </h3>
            <p className="mt-2">نعيد تدوير الأزياء لمستقبل أفضل</p>
          </div>
          <div className="w-full md:w-1/3 text-center mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-4">روابط سريعة</h4>
            <ul className="space-y-2">
              {['الرئيسية', 'خدماتنا', 'من نحن', 'اتصل بنا'].map((item, index) => (
                <motion.li key={index} whileHover={{ scale: 1.1 }}>
                  <a href={`#${item === 'الرئيسية' ? '' : item}`} className="hover:text-green-300 transition duration-300">
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
          <div className="w-full md:w-1/3 text-center md:text-right">
            <h4 className="text-lg font-semibold mb-4">تواصل معنا</h4>
            <p className="mb-2">البريد الإلكتروني: info@ecofashion.com</p>
            <p>الهاتف: 123-456-7890</p>
          </div>
        </div>
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.5 }}
          className="border-t border-green-700 mt-8 pt-8 text-center"
        >
          <p>&copy; 2024 إيكو فاشن. جميع الحقوق محفوظة.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;