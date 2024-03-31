import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'

export default function Header() {
    const [menuToggle, setMenuToggle]= useState(false)

    function menuHandle() {
        menuToggle ? setMenuToggle(false) : setMenuToggle(true)
        
        // menuToggle ? console.log("false!") : console.log("true!")
    }

    return (
        <header className="site-header">
            <Link to="/" className="site-logo">
                {/* <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 512 512">
                <path d="M256.742 37C407.512 37 501.293 355.711 501.293 355.711C531.717 408.289 493.682 474 432.826 474H79.1676C18.3185 474 -19.717 408.289 10.7069 355.711C10.7069 355.711 91.2167 37 256.742 37Z"></path>
                </svg> */}
                <p>Arielle Marin</p>
            </Link>
  
            <nav className={menuToggle ? "site-navigation toggled" : "site-navigation"} id="site-navigation">
                {/* hamburger menu button & svg */}
                <button className="menu-toggle" aria-controls="header-menu" aria-expanded={menuToggle ? "true" : "false"} aria-label="Menu Toggle" onClick={() => menuHandle()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24">
                    <title>Menu icon</title>
                    <path d="M2 5h20"></path>
                    <path d="M2 12h20"></path>
                    <path d="M2 19h20"></path>
                </svg>
                </button>

                <ul className="nav-menu" id="header-menu">
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <HashLink to='#projects'>Projects</HashLink>
                    </li>
                    <li>
                        <HashLink to='#about'>About</HashLink>
                    </li>
                    <li>
                        <HashLink to='#contact'>Contact</HashLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}