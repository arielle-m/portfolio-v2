import { Link } from "react-router-dom";

export default function Footer() {
  return (
    // <footer className="bg-orange-400 text-center py-3 mb-16 lg:mb-0">
    <footer className="bg-orange-400 text-center py-3">
      {/* className has mt-5 but i removed it for now */}
      <nav>
        <ul className="flex justify-center gap-x-3">
          <li>  
            <Link to="mailto:ariem.marii@gmail.com" target="_blank" className="no-underline">Email</Link>
          </li>
          <li>
            <Link to="https://www.linkedin.com/in/ariellemarin/" target="_blank" className="no-underline">LinkedIn</Link>
          </li>
          <li>
            <Link to="https://github.com/arielle-m" target="_blank" className="no-underline">GitHub</Link>
          </li>
        </ul>
      </nav>

        <p className="copyright">&copy; {new Date().getFullYear()} Arielle Marin</p>
    </footer>
  )
}