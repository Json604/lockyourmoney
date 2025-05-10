import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, TrendingUp, Users } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Shield,
      title: 'Secure Savings',
      description: 'Bank-level security to protect your locked savings from unauthorized access.'
    },
    {
      icon: Clock,
      title: 'Time-Based Locks',
      description: 'Set custom time periods for your savings to remain locked and untouchable.'
    },
    {
      icon: TrendingUp,
      title: 'Growth Tracking',
      description: 'Monitor your savings growth and receive insights on your financial progress.'
    },
    {
      icon: Users,
      title: 'Shared Goals',
      description: 'Create shared saving goals with friends or family members.'
    }
  ];

  return (
    <div className="pt-16">
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary-500 to-primary-600 text-transparent bg-clip-text">
                Powerful Features
              </span>
            </h2>
            <p className="text-xl text-gray-400">Everything you need to secure your financial future</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="group p-6 bg-gray-800 rounded-lg border border-gray-700 hover:border-primary-500 transition-colors"
              >
                <feature.icon className="h-12 w-12 text-primary-500 mb-4 group-hover:text-primary-400 transition-colors" />
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;