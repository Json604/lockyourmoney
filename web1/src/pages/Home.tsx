import React from 'react';
import { motion } from 'framer-motion';
import { Lock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="pt-16">
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <Lock className="h-20 w-20 mx-auto text-primary-500" />
          </motion.div>
          
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-primary-500 to-primary-600 text-transparent bg-clip-text">
              Secure Your Savings.
            </span>
            <br />
            <span className="text-white">Control Your Spending.</span>
          </motion.h1>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto"
          >
            Take control of your financial future with our innovative savings lock system.
          </motion.p>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="space-x-4"
          >
            <Link
              to="/features"
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-gray-900 font-medium rounded-lg hover:bg-primary-700 transition-colors"
            >
              Start Locking
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/how-it-works"
              className="inline-flex items-center px-6 py-3 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-600 transition-colors"
            >
              Learn More
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;