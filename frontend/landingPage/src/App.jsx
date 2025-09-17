import { useEffect, useRef, useState, useCallback, useMemo, lazy, Suspense } from 'react';
import './style/Aurora.css';
import phoneImg from './assets/phoneMockup.webp';
import phoneImgTab from './assets/phoneMockupTablet.webp';
import phoneImgMob from './assets/phoneMockupMobile.webp';
import logo from './assets/siteImage.webp';
import { motion } from 'framer-motion';

// Lazy load heavy components
const Aurora = lazy(() => import('./components/Aurora'));
const Hls = lazy(() => import('hls.js'));

function App() {
  const videoRef = useRef(null);
  const [activeSection, setActiveSection] = useState('joinWaitlist');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Memoize expensive calculations
  const isMobile = useMemo(() => window.innerWidth < 768, []);

  useEffect(() => {
    const initializeVideo = async () => {
      if (!videoRef.current) return;

      const cores = navigator.hardwareConcurrency || 4;
      const memory = navigator.deviceMemory || 4;
      const isLowEnd = cores <= 2 || memory <= 4;

      try {
        if (!isMobile && isLowEnd) {
          // Desktop: Use HLS
          const HlsModule = await import('hls.js');
          const Hls = HlsModule.default;
          
          if (Hls.isSupported()) {
            const hls = new Hls({
              enableWorker: true,
              lowLatencyMode: false,
              backBufferLength: 90
            });
            hls.loadSource('/videos/index.m3u8');
            hls.attachMedia(videoRef.current);
          } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
            videoRef.current.src = '/videos/index.m3u8';
          }
        } else {
          // Mobile: Use direct MP4 file
          videoRef.current.src = '/videos/demo2.mp4';
        }
      } catch (error) {
        console.warn('Video initialization failed:', error);
        // Fallback to MP4
        if (videoRef.current) {
          videoRef.current.src = '/videos/demo2.mp4';
        }
      }
    };

    initializeVideo();

    // Intersection Observer for autoplay when 50% visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && videoRef.current) {
          // Only play if video hasn't been played yet
          if (videoRef.current.paused) {
            videoRef.current.play().catch(console.warn);
          }
        }
      },
      { 
        threshold: 0.5,
        rootMargin: '0px'
      }
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



  // Memoize navigation handlers
  const handleNavClick = useCallback((sectionId) => {
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false); // Close mobile menu when navigating
    document.getElementById(sectionId)?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('header')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <Suspense fallback={<div style={{ height: '100vh', background: '#000' }} />}>
        <Aurora />
      </Suspense>
      <header>
        <div 
          className='logoContainer'
          onClick={() => handleNavClick('joinWaitlist')}
          style={{ cursor: 'pointer' }}
        >
          <img src={logo} alt="LYM logo" />
          <h1>LYM</h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" data-active={activeSection}>
          <a 
            href='#joinWaitlist' 
            className={activeSection === 'joinWaitlist' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('joinWaitlist');
            }}
          >
            Join Waitlist
          </a>
          <a 
            href="#demo" 
            className={activeSection === 'demo' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('demo');
            }}
          >
            How it Works
          </a>
          <a 
            href='#about' 
            className={activeSection === 'about' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('about');
            }}
          >
            About
          </a>
        </nav>

        {/* Mobile Hamburger Menu */}
        <button 
          className="hamburger-menu"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
        </button>

        {/* Mobile Navigation Menu */}
        <nav className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
          <a 
            href='#joinWaitlist' 
            className={activeSection === 'joinWaitlist' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('joinWaitlist');
            }}
          >
            Join Waitlist
          </a>
          <a 
            href="#demo" 
            className={activeSection === 'demo' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('demo');
            }}
          >
            How it Works
          </a>
          <a 
            href='#about' 
            className={activeSection === 'about' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('about');
            }}
          >
            About
          </a>
        </nav>
      </header>

      <Aurora
        colorStops={["#707070", "#FCFF66", "#707070"]}
        blend={0.4}
        amplitude={isMobile ? 0.5 : 1.0}
        speed={isMobile ? 0.01 : 1.0}
      />

      <section id='joinWaitlist'>
        <div className='hero'>
          <motion.div
            className='phone-container'
            // initial={{ x: -300, opacity: 0 }}
            // animate={{ x: 0, opacity: 1 }}
            // transition={{ type: 'spring', stiffness: 60, damping: 15, duration: 1 }}
          >
            <img 
            src={phoneImg} 
            srcSet={`${phoneImgMob} 400w, ${phoneImgTab} 800w, ${phoneImg} 1024w`}
            sizes='(max-width: 600px) 400px, (max-width: 1024px) 800px, 1024px'
            fetchpriority="high"
            alt='Lock Your Money app interface showing money locking features on mobile device' 
            loading="eager"
            />
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

      <section className="video-section" id='demo'>
        <video
          ref={videoRef}
          className="demo-video"
          muted
          playsInline
          loop
          preload="metadata"
          loading="lazy"
          aria-label="Lock Your Money app demo video"
        >
          Your browser does not support the video tag.
        </video>
      </section>
      <section id='about'>
        <div className='about-container'>
          <div className='about-content'>
            <motion.div
              className='about-header'
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h1>About Lock Your Money</h1>
              <p className='about-subtitle'>
                Control Impulsive Spending by Locking Your Funds
              </p>
            </motion.div>

            <motion.div
              className='about-intro'
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              viewport={{ once: true }}
            >
              <p>
                Managing spending isn't always about tracking expenses—it's about staying mindful and avoiding impulsive purchases that disrupt your financial goals. Whether you're searching for ways to lock your money, stop yourself from overspending, or set spending limits, Lock Your Money is the tool that helps you build discipline and control.
              </p>
              <p>
                Lock Your Money is a simple yet powerful app that lets you lock a portion of your funds for a period of time you choose, helping you avoid unnecessary spending and stay focused on your priorities. Once the timer ends, your money is unlocked and ready to use again.
              </p>
            </motion.div>

            <motion.div
              className='about-why'
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3>Why People Search for Lock Your Money</h3>
              <p>Users looking for help often ask:</p>
              <ul className='questions-list'>
                <li>How can I lock my money to prevent overspending?</li>
                <li>What's the best way to control impulsive purchases?</li>
                <li>How can I save money by restricting access to it?</li>
                <li>How to avoid wasting money on distractions like shopping or entertainment?</li>
              </ul>
              <p>
                Lock Your Money is built to answer these questions by offering a straightforward way to safeguard your funds.
              </p>
            </motion.div>

            <motion.div
              className='about-features'
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
              viewport={{ once: true }}
            >
              <h3>How Lock Your Money Helps You</h3>
              <div className='features-grid'>
                <div className='feature-item'>
                  <span className='feature-icon'>🔒</span>
                  <div>
                    <h4>Lock funds easily</h4>
                    <p>Choose the amount and duration for locking</p>
                  </div>
                </div>
                <div className='feature-item'>
                  <span className='feature-icon'>🛡️</span>
                  <div>
                    <h4>Prevent impulsive spending</h4>
                    <p>Stay in control when temptations arise</p>
                  </div>
                </div>
                <div className='feature-item'>
                  <span className='feature-icon'>⏰</span>
                  <div>
                    <h4>Regain access later</h4>
                    <p>Funds are automatically unlocked after the timer ends</p>
                  </div>
                </div>
                <div className='feature-item'>
                  <span className='feature-icon'>🎯</span>
                  <div>
                    <h4>Stay focused on your goals</h4>
                    <p>Avoid unnecessary distractions without stress</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className='about-benefits'
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3>Who Can Benefit?</h3>
              <div className='benefits-list'>
                <div className='benefit-item'>Students looking to avoid overspending</div>
                <div className='benefit-item'>Young professionals aiming to control impulsive purchases</div>
                <div className='benefit-item'>Anyone wanting to build better money discipline without tracking every expense</div>
                <div className='benefit-item'>People searching for ways to "lock money" and stay financially mindful</div>
              </div>
            </motion.div>

            <motion.div
              className='about-mission'
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
              viewport={{ once: true }}
            >
              <h3>Our Mission</h3>
              <p>
                We believe that the best way to save money is by removing the temptation altogether. Lock Your Money empowers you to take control of your funds by locking them for a period, helping you build better spending habits without complicated tracking, fees, or distractions.
              </p>
            </motion.div>

            <motion.div
              className='about-cta'
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3>Start Locking Your Money Today</h3>
              <p>
                Take charge of your financial wellbeing by locking away funds you want to protect. Stay focused, avoid impulsive purchases, and reach your goals with confidence. Lock Your Money is here to help you create healthier financial habits—one lock at a time.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <footer className='footer'>
        <div className='footer-content'>
          <div className='footer-brand'>
            <div className='footer-logo'>
              <img src={logo} alt="LYM logo" />
              <h3>Lock Your Money</h3>
            </div>
            <p className='footer-tagline'>
              Take control of your financial future with our innovative savings lock system.
            </p>
          </div>
          
          <div className='footer-links'>
            <div className='footer-section'>
              <h4>Product</h4>
              <ul>
                <li>
                  <a 
                    href='#joinWaitlist'
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick('joinWaitlist');
                    }}
                  >
                    Join Waitlist
                  </a>
                </li>
                <li>
                  <a 
                    href='#demo'
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick('demo');
                    }}
                  >
                    How it Works
                  </a>
                </li>
                <li>
                  <a 
                    href='#about'
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick('about');
                    }}
                  >
                    About
                  </a>
                </li>
              </ul>
            </div>
            
            <div className='footer-section'>
              <h4>Connect</h4>
              <div className='social-links'>
                <a href='https://x.com/infin8erer' target='_blank' rel='noopener noreferrer' className='social-link'>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  <span>Twitter</span>
                </a>
                <a href='https://www.linkedin.com/in/kartikey10121/' target='_blank' rel='noopener noreferrer' className='social-link'>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span>LinkedIn</span>
                </a>
                <a href='https://github.com/Json604' target='_blank' rel='noopener noreferrer' className='social-link'>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className='footer-bottom'>
          <div className='footer-bottom-content'>
            <p>&copy; {new Date().getFullYear()} Lock Your Money. All rights reserved.</p>
            <p>Made with ❤️ for better financial habits</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
