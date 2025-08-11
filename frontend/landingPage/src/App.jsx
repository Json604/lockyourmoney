import { useEffect, useRef } from 'react';
import Aurora from './components/Aurora';
import './style/Aurora.css';
import phoneImg from './assets/phoneMockup.png';
import logo from './assets/siteImage.png';
import { motion } from 'framer-motion';
import Hls from 'hls.js';

function App() {
  const isMobile = window.innerWidth < 768;
  const videoRef = useRef(null);

  useEffect(() => {
    const cores = navigator.hardwareConcurrency || 4; // default guess
    const memory = navigator.deviceMemory || 4; // in GB

    const isLowEnd = cores <= 2 || memory <= 4;
    if (!isMobile && isLowEnd) {
      // Desktop: Use HLS
      if (videoRef.current) {
        if (Hls.isSupported()) {
          const hls = new Hls();
          hls.loadSource('/videos/index.m3u8');
          hls.attachMedia(videoRef.current);
        } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
          videoRef.current.src = '/videos/index.m3u8';
        }
      }
    } else {
      // Mobile: Use direct MP4 file
      if (videoRef.current) {
        videoRef.current.src = '/videos/demo2.mp4'; // lighter mobile version
      }
    }

    // Intersection Observer for autoplay when visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && videoRef.current) {
          videoRef.current.play();
        }
      },
      { threshold: 0.5 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, [isMobile]);

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

      <section>
        <div className='hero'>
          <motion.div
            className='phone-container'
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 60, damping: 15, duration: 1 }}
          >
            <img src={phoneImg} alt='mockPhone' />
          </motion.div>

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
              className="bold"
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
                action={"https://getlaunchlist.com/s/5gabMY"}
                method='POST'
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
        <div className="scroll-indicator-wrapper">
          <div className="scroll-indicator" />
          <div className="scroll-indicator-text">Scroll down to learn more.</div>
        </div>
      </section>

      <section id="demo-video" className="video-section">
        <video
          ref={videoRef}
          className="demo-video"
          width="100%"
          muted
          playsInline
          // preload="metadata"
        >
          Your browser does not support the video tag.
        </video>
      </section>
    </>
  );
}

export default App;
