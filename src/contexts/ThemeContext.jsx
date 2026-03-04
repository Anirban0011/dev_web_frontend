import { useContext, createContext, useState, useEffect } from "react"

const ThemeContext = createContext(null)
export const UseTheme = () => useContext(ThemeContext)

export const ThemeContextWrapper = ({ children }) => {

  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme")
    if(saved) return saved
    return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark" : "light"
  })

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === "light" ? "dark" : "light"
      localStorage.setItem("theme", next)
      return next
    })
  }

  // listener for switch of system theme
  useEffect(() => {
  const media = window.matchMedia("(prefers-color-scheme: dark)")
  const listener = (e) => {
    const theme = e.matches ? "dark" : "light"
    setTheme(theme)
    localStorage.setItem("theme", theme)
  }
  media.addEventListener("changeTheme", listener)
  return () => media.removeEventListener("changeTheme", listener)
}, [])

  // set theme function for account page

  useEffect(() => {
    document.body.classList.remove("light", "dark")
    document.body.classList.add(theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
