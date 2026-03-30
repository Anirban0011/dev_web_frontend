import { Navigate } from "react-router"
import { useUser } from "../contexts/UserContext"

const RedirectLoginRoute = ({ children }) => {
  const { user } = useUser()

  if (user.cookieset === 1) {
    return <Navigate to="/account" replace />
  }

  return children
}

export default RedirectLoginRoute