import { useState } from "react"
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import { NavHashLink } from 'react-router-hash-link'

export default function Header() {
    const [menuToggle, setMenuToggle]= useState(false)

    function menuHandle() {
        menuToggle ? setMenuToggle(false) : setMenuToggle(true)
        
        // menuToggle ? console.log("false!") : console.log("true!")
    }

    return (
        <header id="masthead" className="site-header">
            <div className="site-branding">
                <Link to="/" className="site-logo no-underline">
                    <p className="site-title">Arielle Marin</p>
                </Link>
            </div>
  
            <nav className={menuToggle ? "site-navigation toggled" : "site-navigation"} id="site-navigation">
                <button className="menu-toggle" aria-controls="header-menu" aria-expanded={menuToggle ? "true" : "false"} aria-label="Menu Toggle" onClick={() => menuHandle()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24">
                    <title>Menu icon</title>
                    <path d="M2 12h20"></path>
                    <path d="M12 2v20"></path>
                </svg>
                </button>

                <nav className="site-navigation">
                    <ul>
                    {/* <ul className="nav-menu" id="header-menu"> */}
                        <li><NavLink to='/' end>Home</NavLink></li>
                        <li><NavHashLink smooth to='/#projects'>Projects</NavHashLink></li>
                        <li><NavHashLink smooth to='/#about'>About</NavHashLink></li>
                        <li><NavHashLink smooth to='/#contact'>Contact</NavHashLink></li>
                    </ul>
                </nav>
            </nav>
        </header>
    )
}