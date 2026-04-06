import { useEffect, useState } from "react"
import { Navigate } from "react-router"
import FormSubmit from "../utils/Formsubmit"
import AsyncHandler from "../utils/AsyncHandler"
import { useParams } from "react-router"
import { PATH_VER_TOKEN } from "../constants/constants"
const ResetPwdProtectRoute = ({ children }) => {
     const {token} = useParams()
     const [isValid, setIsValid] = useState(null)
     const payload = { token: token }

     useEffect(()=>{
      const VerifyToken = AsyncHandler(async()=>{
      const res = await FormSubmit(PATH_VER_TOKEN, payload, false, 'POST', true)
      setIsValid(res.ok)

     })
     VerifyToken()
    }
     , [token])

      if (isValid === false) {
    return <Navigate to="/"  replace />
  }
     return children
}

export default ResetPwdProtectRoute