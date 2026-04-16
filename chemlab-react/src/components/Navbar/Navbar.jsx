import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaFlask } from 'react-icons/fa';

const Navbar = ({ isDarkMode, toggleDarkMode }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'introduction', label: 'Introduction' },
    { id: 'materials', label: 'Materials' },
    { id: 'process', label: 'Process' },
    { id: 'apparatus', label: 'Apparatus' },
    { id: 'results', label: 'Results' },
    { id: 'team', label: 'Team' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navLinks.map(link => document.getElementById(link.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'glass shadow-lg py-3' : 'bg-transparent py-5'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => scrollToSection('home')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaFlask className="text-purple-500 text-2xl" />
            <span className="text-2xl font-bold gradient-text">ChemLab</span>
          </motion.div>

          {/* Nav Links */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.id}>
                <motion.button
                  onClick={() => scrollToSection(link.id)}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                    activeSection === link.id
                      ? 'text-purple-500'
                      : 'text-gray-700 dark:text-gray-300 hover:text-purple-500'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.label}
                  {activeSection === link.id && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"
                      layoutId="activeSection"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.button>
              </li>
            ))}
          </ul>

          {/* Dark Mode Toggle */}
          <motion.button
            onClick={toggleDarkMode}
            className="p-2 rounded-full glass hover:shadow-glow-purple transition-all duration-300"
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
          >
            {isDarkMode ? '🌞' : '🌙'}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu (simplified) */}
      <motion.div 
        className="md:hidden flex justify-center gap-2 mt-4 flex-wrap px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {navLinks.map((link) => (
          <motion.button
            key={link.id}
            onClick={() => scrollToSection(link.id)}
            className={`px-3 py-1.5 text-xs rounded-full transition-all duration-300 ${
              activeSection === link.id
                ? 'bg-purple-500 text-white'
                : 'glass text-gray-700 dark:text-gray-300'
            }`}
            whileTap={{ scale: 0.95 }}
          >
            {link.label}
          </motion.button>
        ))}
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
