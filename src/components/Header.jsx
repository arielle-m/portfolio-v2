import { useState } from "react"
import { Link } from 'react-router-dom'
import { NavHashLink } from 'react-router-hash-link'

export default function Header() {
    const [menuToggle, setMenuToggle]= useState(false)

    function menuHandle() {
        menuToggle ? setMenuToggle(false) : setMenuToggle(true)
    }

    return (
        <header id="masthead" className="site-header p-4 z-30">
            <div className="site-branding">
                <Link to="/" className="site-logo no-underline text-orange-800 uppercase tracking-widest">
                    <p className="site-title m-0">Arielle Marin</p>
                </Link>
            </div>
  
            <nav className={menuToggle ? "site-navigation toggled" : "site-navigation"} id="site-navigation">
                <button className="menu-toggle inline-block bg-orange-400 border-4 border-orange-400 rounded-full p-2 focus:outline focus:outline-2 focus:outline-orange-400 fixed right-4 bottom-4 z-40" aria-controls="header-menu" aria-expanded={menuToggle ? "true" : "false"} aria-label="Menu Toggle" onClick={() => menuHandle()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24">
                    <title>Menu icon</title>
                    <path d="M2 12h20"></path>
                    <path d="M12 2v20"></path>
                </svg>
                </button>

                <nav className="site-navigation">
                    <ul id="header-menu" className="bg-orange-700 z-30">
                        <li><NavHashLink to='/#' smooth end onClick={() => menuHandle()} className="no-underline uppercase font-bold tracking-widest text-right text-orange-100 text-3xl hover:text-orange-300">Home</NavHashLink></li>
                        <li><NavHashLink smooth to='/#projects' onClick={() => menuHandle()} className="no-underline uppercase font-bold tracking-widest text-right text-orange-100 text-3xl hover:text-orange-300">Projects</NavHashLink></li>
                        <li><NavHashLink smooth to='/#about' onClick={() => menuHandle()} className="no-underline uppercase font-bold tracking-widest text-right text-orange-100 text-3xl hover:text-orange-300">About</NavHashLink></li>
                        <li><NavHashLink smooth to='/#contact' onClick={() => menuHandle()} className="no-underline uppercase font-bold tracking-widest text-right text-orange-100 text-3xl hover:text-orange-300">Contact</NavHashLink></li>
                    </ul>
                </nav>
            </nav>
        </header>
    )
}