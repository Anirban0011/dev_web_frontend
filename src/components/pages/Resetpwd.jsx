import { useState } from "react"
import { useNavigate } from "react-router"
import { useParams } from "react-router-dom"
import FormSubmit from "../../utils/Formsubmit"
import AsyncHandler from "../../utils/AsyncHandler"
import PopupCard from "../common/popupCard"
import HIDE_PNG from "../../assets/images/hide.png"
import VIEW_PNG from "../../assets/images/view.png"
import "../../styles/page/resetpwd.css"

const ResetPwdPage = ()=>{
        const[inptype, setInptype] = useState(false)
        const[inptypecnf, setInptypecnf] = useState(false)
        const [newpwd, setNewPwd] = useState("")
        const [newpwdcnf, setNewPwdcnf] = useState("")
        const [popup, setPopup] = useState(false)
        const [msg, setMsg] = useState("")
        const [result, setResult] = useState("")
        const [loading, setLoading] = useState(false)
        const[failurestate, setFailurestate] = useState(false)
        const navigate = useNavigate()
        const { token } = useParams(); // get token from URL

        const handleSubmit = AsyncHandler(async(e)=>{
        e.preventDefault()

        if(newpwd !== newpwdcnf){
        setPopup(true)
        setMsg("New passwords don't match ❌")
        return
        }
        setLoading(true)
        const PATH_PWD_RESET = `${import.meta.env.VITE_BACKEND_BASE_URI}/users/reset-pwd/${token}`;

        const payload = { password: newpwd }
        const res = await FormSubmit(PATH_PWD_RESET, payload, false, 'POST', true)
         if(!res.ok){
            setFailurestate(true)
            setLoading(false)
            setResult(true)
            navigate("/" , {state : {failurestate : true ,
                                    msg : "Failed to reset password ⚠️",
                                    }})
        }
        setLoading(false)
        setResult(true)
        navigate("/login", {state : { popup : true,
                                    failurestate : false ,
                                    msg : "Password reset successfully ✅",
                                    }})
        })

    return (<>
    {
        popup && <PopupCard
            message={msg}
            setpopupState={setPopup}
            popupState={popup}
            failure={failurestate}
            />
    }
    <div className="wrapper-div">
    <div className="main-div">
        <div className="inner-div">
        {
            loading ? (
            <>
            <div className='resetpwdbuff'>
                 Resetting Password
                <div className="spinner"></div>
            </div>
            </>) :

        ( result ?
            (
                <div className="res-div">
                    {failurestate ? "Redirecting to Home..." : "Redirecting to Login ..."}
                </div>
            ) :(
        <>
        <div className="h4-div"><h4>Reset Password</h4></div>
        <div className="pwd-div">
            <input
            type={inptype ? "text" : "password"}
            value={newpwd}
            onChange={(e)=>setNewPwd(e.target.value)}
         placeholder='Enter New Password'
        />
        <button
        onClick={()=>{setInptype(prev=> !prev)}}>
        {inptype ? <img src={HIDE_PNG} />:
        <img src={VIEW_PNG}
        />}
        </button>
        </div>
        <div className="pwd-cnf-div"><input
        type={inptypecnf ? "text" : "password"}
        value={newpwdcnf}
        onChange={(e)=>setNewPwdcnf(e.target.value)}
        placeholder='Confirm New password'
        />
        <button
        onClick={()=>{setInptypecnf(prev=> !prev)}}>
        {inptypecnf ? <img src={HIDE_PNG} />:
        <img src={VIEW_PNG}
        />}
         </button>
        </div>
        <div className="btn-div"><button
        onClick={handleSubmit}
        >Submit</button>
        </div>
    </>)
)}
</div>
    </div>
    </div>
    </>)
}
export default ResetPwdPage