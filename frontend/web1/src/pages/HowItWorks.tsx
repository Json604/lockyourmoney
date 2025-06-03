import { motion } from 'framer-motion';
import { LockKeyhole, Timer, Wallet, CheckCircle } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: Wallet,
      title: 'Enter the amount',
      description: 'Choose how much you want to lock.'
    },
    {
      icon: Timer,
      title: 'Set Duration',
      description: 'Choose how long you want to lock your money.'
    },
    {
      icon: LockKeyhole,
      title: 'Lock Your Money',
      description: 'Initiate the lock by depositing the money.'
    },
    {
      icon: CheckCircle,
      title: 'Get money back',
      description: 'Your money reaches your account once the lock period ends.'
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
                How It Works
              </span>
            </h2>
            <p className="text-xl text-gray-400">Simple steps to control your spending</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="relative flex flex-col h-full"
              >
                <div className="p-6 bg-gray-800 rounded-lg border border-gray-700 flex flex-col h-full">
                  <div className="flex items-center justify-center w-16 h-16 bg-primary-500/10 rounded-full mb-4">
                    <step.icon className="h-8 w-8 text-primary-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 right-0 w-8 h-0.5 bg-primary-500/50 transform translate-x-4" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;