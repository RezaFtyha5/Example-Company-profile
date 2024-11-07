// app/components/Header.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import { useLanguage } from '../LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      if (window.scrollY < 100) {
        setActiveSection('home');
        return;
      }

      const sections = ['about', 'services', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { id: 'home', label: t('home'), icon: '🏠' },
    { id: 'about', label: t('about'), icon: '👥' },
    { id: 'services', label: t('services'), icon: '⚡' },
    { id: 'contact', label: t('contact'), icon: '📱' },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'id' ? 'en' : 'id');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-black/90 backdrop-blur-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-shrink-0"
          >
            <a href="#home">
              <Image 
                src="/images/logo.png" 
                alt="Arfapro Logo" 
                width={180} 
                height={58}
                className="h-14 w-auto"
              />
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="hidden lg:flex items-center space-x-8"
          >
            {menuItems.map((item) => (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                variants={itemVariants}
                className={`group relative px-6 py-3 text-2xl font-bold transition-all duration-300 ${
                  activeSection === item.id
                    ? 'text-blue-400'
                    : isScrolled ? 'text-white' : 'text-white'
                } hover:text-blue-300`}
                style={{
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                }}
              >
                <span className="flex items-center gap-2">
                  <span className="text-2xl">{item.icon}</span>
                  {item.label}
                </span>
                <motion.span 
                  className="absolute bottom-0 left-0 w-full h-1 bg-blue-400 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: activeSection === item.id ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="absolute inset-0 bg-white/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300" />
              </motion.a>
            ))}
            
            {/* Language Toggle */}
            <motion.button
              variants={itemVariants}
              onClick={toggleLanguage}
              className={`px-6 py-3 rounded-full text-xl font-bold transition-all duration-300 
                ${isScrolled 
                  ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                  : 'bg-white/20 hover:bg-white/30 text-white'
                } backdrop-blur-sm`}
              style={{
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
              }}
            >
              {language === 'id' ? 'EN' : 'ID'}
            </motion.button>
          </motion.nav>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="lg:hidden rounded-lg p-3 hover:bg-white/10 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="relative w-8 h-6">
              <span 
                className={`absolute w-full h-0.5 bg-white transform transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 top-3' : 'top-0'
                }`}
              />
              <span 
                className={`absolute w-full h-0.5 bg-white top-3 transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span 
                className={`absolute w-full h-0.5 bg-white transform transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 top-3' : 'top-6'
                }`}
              />
            </div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden bg-black/95 backdrop-blur-lg rounded-b-2xl"
            >
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="py-6 space-y-4 px-6"
              >
                {menuItems.map((item) => (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    variants={itemVariants}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-6 py-4 text-xl font-bold rounded-lg transition-all duration-300 ${
                      activeSection === item.id
                        ? 'bg-blue-500/20 text- white'
                        : 'text-white'
                    } hover:bg-blue-500/30`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-2xl">{item.icon}</span>
                      {item.label}
                    </span>
                  </motion.a>
                ))}
                <motion.button
                  variants={itemVariants}
                  onClick={toggleLanguage}
                  className={`block w-full text-center px-6 py-4 rounded-lg text-xl font-bold transition-all duration-300 
                    ${isScrolled 
                      ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                      : 'bg-white/20 hover:bg-white/30 text-white'
                    }`}
                >
                  {language === 'id' ? 'EN' : 'ID'}
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}