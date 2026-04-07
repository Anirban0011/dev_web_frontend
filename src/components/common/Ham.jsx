import {Link} from "react-router"
import { useUser } from "../../contexts/UserContext"
import { UseTheme } from "../../contexts/ThemeContext"
import MOON_PNG from "../../assets/images/moon.png"
import SUN_PNG from "../../assets/images/sun.png"
import '../../styles/component/ham.css'

const Ham = ({state, setState}) => {
    const {user} = useUser()
    const {theme, toggleTheme} = UseTheme()
    return(
        <>
            <button
            className={`ham-menu ${state ? "open" : "close"}`}
            onClick={() =>{setState(!state)}}>
                <div>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </button>
            <div className={`ham-nav ${state ? "nav-open" : "nav"}`}>

                 <div
    className={`nav-overlay ${state ? "show" : ""}`}
    onClick={() => setState(false)}
  />

        <nav className="navbar">
            <ul className={`nav-items ${open ? "open" : ""}`}>
            <Link to="/" className="home">Home</Link>
            <Link to="/projects" className="projects">Projects</Link>
            {user.userExists?
            <Link to="/account" className={`account ${user.username.length > 10 ? "small-text" : ""}`}>
                {user.username}</Link>:
            <Link to="/login" className="login">Login</Link>}
            <Link to="/contact" className="contact">Contact</Link>
             <li className="tog-th-nav">
                 <button className="theme-btn" onClick={toggleTheme}>
              <span className={theme === "light" ? "icon-moon-light" : "icon-moon-dark"}>
                    <img src={MOON_PNG}/></span>
                <span className={theme === "light" ? "icon-sun-light" : "icon-sun-dark"}>
                    <img src={SUN_PNG}/></span>
            </button>
            </li>
            </ul>
        </nav>
            </div>
        </>
    )
}

export default Ham