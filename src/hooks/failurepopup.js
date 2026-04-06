import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const useFailurePopup = (setPopup, setMsg, setFailurestate) => {
  const location = useLocation()
  const navigate = useNavigate()

useEffect(() => {
  if (location.state?.popup) {
    setPopup(true)
    setFailurestate(location.state?.failurestate)
    setMsg(location.state.msg)
    navigate(location.pathname, { replace: true })
  }
}, [location, navigate])

}

export default useFailurePopup