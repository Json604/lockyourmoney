import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import '../App.css'

export default function Home(){
    return(
        <motion.div 
        initial={{opacity:0, y:-100}}
        animate={{opacity:1, y:0}}
        transition={{duration: 0.8}}
        className="hero"
        >
            <h1 className="tagline">Secure Your Savings.</h1>
            <h1 className="tagline bold">Control Your Spending.</h1>
            <p className="subtitle">Take control of your financial future with our innovative savings lock system.</p>
            <Link to="features" className="cta-button">Start Locking</Link>
        </motion.div>
    )
}