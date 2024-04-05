import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="text-center mt-5 py-3">
      <nav>
        <ul className="flex justify-center gap-x-3">
          <li>  
            <Link to={{ pathname: "mailto:ariem.marii@gmail.com" }} target="_blank" className="no-underline">Email</Link>
          </li>
          <li>
            <Link to={{ pathname: "https://www.linkedin.com/in/ariellemarin/" }} target="_blank" className="no-underline">LinkedIn</Link>
          </li>
          <li>
            <Link to={{ pathname: "https://github.com/arielle-m" }} target="_blank" className="no-underline">GitHub</Link>
          </li>
        </ul>
      </nav>

        <p className="copyright">&copy; {new Date().getFullYear()} Arielle Marin</p>
    </footer>
  )
}