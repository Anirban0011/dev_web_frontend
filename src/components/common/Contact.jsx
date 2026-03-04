import { useState } from "react"
import Ham from "../common/Ham"
import { MAIL_ID } from "../../constants/constants"
import "../../styles/page/contact.css"
const Contact = () => {
    const [stateham, setStateham] = useState(false)
    const [hover, setHover] = useState(false)

    return(
        <>
        <div className="ham-contact">
            <Ham state={stateham} setState={setStateham}/>
        </div>
        <div className="contact-div">
        <h1>Contact</h1>
        <button
        onClick={() => window.location.href = `mailto:${MAIL_ID}`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)
    }
        >{hover ? "Mail 📭":"Mail 📫"}</button>
        </div>
        </>
    )
}

export default Contact