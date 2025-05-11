import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();

  const links = [
    { path: '/', label: 'Home' },
    { path: '/features', label: 'Features' },
    { path: '/how-it-works', label: 'How It Works' },
  ];

  return (
    <nav className="bg-gray-800/50 backdrop-blur-sm fixed w-full z-50 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* <Lock className="h-8 w-8 text-primary-500" /> */}
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary-500 to-primary-600 text-transparent bg-clip-text">
              Lock Your Money
            </span>
          </Link>
          
          <div className="flex space-x-1">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'bg-primary-500/10 text-primary-500'
                    : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;