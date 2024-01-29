import axios from "axios"

const checkAuth = () => {
  /*  Getting token value stored in localstorage, if token is not present we will open login page 
      for all internal dashboard routes  */
  const token = localStorage.getItem("token")
  const PUBLIC_ROUTES = ["login", "forgot-password", "register", "documentation"]

  const isPublicPage = PUBLIC_ROUTES.some(r => window.location.href.includes(r))

  if (!token && !isPublicPage) {
    window.location.href = '/login'
    return;
  } else {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    return token
  }
}

export default checkAuth