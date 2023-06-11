import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

function Error404() {
    const navigate = useNavigate()
    return (
        <div id="page_error">
            <h1>404</h1>
            <h2>The page you are looking for cannot be found</h2>
            <Link to="/">return to website</Link>
        </div>
    )
}
export default Error404