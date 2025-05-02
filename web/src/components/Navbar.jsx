import { Link } from "react-router-dom";
import '../App.css';

export default function Navbar(){
    return(
        <div className="topBar">
        <div className="testBoxL"></div>
        <nav>
            <Link to='/' className='nav-link'>Home</Link>
            <Link to='works' className='nav-link'>How it works</Link>
            <Link to='features' className='nav-link'>Features</Link>
        </nav>
        <div className="testBoxR"></div>
        </div>
    )
}