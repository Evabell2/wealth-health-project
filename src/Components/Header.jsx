import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

function Header() {
    const navigate = useNavigate()
    return (
        <div className="header">
            <header>
                <Link to="/">Create Employee</Link>
                <Link to="/">HRnet</Link>
                <Link to="/current-employee">Current Employees</Link>
            </header>
            <h1>{window.location.pathname === "/" ? "Create Employee" : "Current Employees"}</h1>
        </div>
    )
}
export default Header