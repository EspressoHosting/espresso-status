import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <motion.button
      onClick={toggleTheme}
      className="relative p-2.5 rounded-full bg-accent/10 hover:bg-accent/20 transition-all duration-300"
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 0 : 180 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {theme === 'dark' ? (
          <Sun className="h-5 w-5 text-accent" />
        ) : (
          <Moon className="h-5 w-5 text-accent" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle