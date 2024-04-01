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
                <Link to="/" className="site-logo">
                    <p className="site-title">Arielle Marin</p>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 512 512">
                    <path d="M256.742 37C407.512 37 501.293 355.711 501.293 355.711C531.717 408.289 493.682 474 432.826 474H79.1676C18.3185 474 -19.717 408.289 10.7069 355.711C10.7069 355.711 91.2167 37 256.742 37Z"></path>
                    </svg> */}
                </Link>
            </div>
  
            <nav className={menuToggle ? "site-navigation toggled" : "site-navigation"} id="site-navigation">
                <button className="menu-toggle" aria-controls="header-menu" aria-expanded={menuToggle ? "true" : "false"} aria-label="Menu Toggle" onClick={() => menuHandle()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24">
                    <title>Menu icon</title>
                    <path d="M2 5h20"></path>
                    <path d="M2 12h20"></path>
                    <path d="M2 19h20"></path>
                </svg>
                </button>

                <nav className="site-navigation">
                    <ul>
                    {/* <ul className="nav-menu" id="header-menu"> */}
                        <li><NavLink to='/' end>Home</NavLink></li>
                        <li><NavHashLink smooth to='#projects'>Projects</NavHashLink></li>
                        <li><NavHashLink smooth to='#about'>About</NavHashLink></li>
                        <li><NavHashLink smooth to='#contact'>Contact</NavHashLink></li>
                    </ul>
                </nav>
            </nav>
        </header>
    )
}