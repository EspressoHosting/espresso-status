import React from 'react';
import { Coffee } from 'lucide-react';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="py-4 border-b border-accent/10 backdrop-blur-sm bg-background/90 sticky top-0 z-10">
        <div className="container-custom">
          <motion.div 
            className="flex items-center gap-3"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-2.5 rounded-lg bg-accent/10">
              <Coffee className="h-6 w-6 text-brown-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">
                EspressoHost <span className="text-accent">Status</span>
              </h1>
              <p className="text-xs text-text-muted">Real-time service monitoring</p>
            </div>
          </motion.div>
        </div>
      </header>
      
      <main className="flex-grow py-8">
        <div className="container-custom">
          {children}
        </div>
      </main>
      
      <footer className="py-6 border-t border-accent/10">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-text-muted">
              © {new Date().getFullYear()} EspressoHost. All rights reserved.
            </div>
            <div className="text-sm text-text-muted">
              Status page auto-refreshes every 30 seconds
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;