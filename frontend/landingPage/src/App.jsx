import Aurora from './components/Aurora';
import './style/Aurora.css';
import phoneImg from './assets/phoneMockup.png';
import logo from './assets/image.png'
import { motion } from 'framer-motion';

function App() {
  const isMobile = window.innerWidth < 768;

  return (
    <>
    <header>
        <img src={logo} alt="LYM logo" />
        <h1>LYM</h1>
    </header>
    <Aurora
      colorStops={["#707070", "#FCFF66", "#707070"]}
      blend={0.4}
      amplitude={isMobile ? 0.5 : 1.0}
      speed={isMobile ? 0.5 : 1.0}
    />
    

    <div className='hero'>
      {/* Phone image slides in from left */}
      <motion.div
        className='phone-container'
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          type: 'spring',
          stiffness: 60,
          damping: 15,
          duration: 1
        }}
      >
        <img src={phoneImg} alt='mockPhone' />
      </motion.div>

      {/* Text slides in from right with staggered child animations */}
      <motion.div
        className='textR'
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.2,
            }
          }
        }}
      >
        <motion.h1
          className="tagline"
          variants={{
            hidden: { x: 200, opacity: 0 },
            visible: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 70 } }
          }}
        >
          Secure Your Savings.
        </motion.h1>

        <motion.h1
          className="tagline bold"
          variants={{
            hidden: { x: 200, opacity: 0 },
            visible: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 70 } }
          }}
        >
          Control Your <span style={{ color: '#FFD700' }}>Spending.</span>
        </motion.h1>

        <motion.p
          className="subtitle"
          variants={{
            hidden: { y: 20, opacity: 0 },
            visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
          }}
        >
          Take control of your financial future with our innovative savings lock system.
        </motion.p>

        <motion.div
          className='waitlist'
          variants={{
            hidden: { y: 20, opacity: 0 },
            visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
          }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log("Valid email submitted:", e.target.email.value);
            }}
          >
            <input
              name="email"
              type="email"
              placeholder="enter your email address"
              required
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Join Waitlist
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </div>
    </>
  );
}

export default App;
