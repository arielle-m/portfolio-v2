import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <nav>
        <ul>
          <li>
            <Link to={{ pathname: "mailto:ariem.marii@gmail.com" }} target="_blank">Email</Link>
            <Link to={{ pathname: "https://www.linkedin.com/in/ariellemarin/ "}} target="_blank">LinkedIn</Link>
            <Link to={{ pathname: "https://github.com/arielle-m" }} target="_blank">GitHub</Link>
          </li>
        </ul>
      </nav>

        <p className="copyright">&copy; {new Date().getFullYear()} Arielle Marin</p>
    </footer>
  )
}