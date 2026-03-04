import { useNavigate } from "react-router"
import Logo404 from "../../assets/images/404.png"
import "../../styles/page/404.css"

const NotFound = ()=> {
    const navigate = useNavigate()

    const ReturnHome =() =>{
         navigate("/")
    }

    return(
        <>
        <div className="not-found-div">
            <img
            src={Logo404}
            />
            <h2>Resource Not found</h2>
            <p>The resource you are looking for is not available</p>
            <button onClick={ReturnHome}>Return Home</button>
        </div>
        </>
    )
}

export default NotFound
