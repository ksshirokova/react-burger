
import { useSelector } from "react-redux";
import { Navigate, useNavigate, useLocation } from "react-router-dom";



export default function ProtectedRoute({ children, anonymous }) {
    const isAuth = useSelector(state => state.routeStore.isAuth)
    const isAuthChecked = useSelector(state => state.routeStore.isAuthChecked)
    const user = useSelector(state => state.routeStore.user)
    const isLoggedIn = !!useSelector(state => state.routeStore.user.name)
    const loading = useSelector(state => state.routeStore.loading)
    const isLogged = useSelector(state => state.routeStore.isLogged)
    const navigate = useNavigate()


    // if(!isAuth){
    //     return <Navigate to='/login' />
    // }
    console.log(isLogged)
    
    if (isLoggedIn && isAuthChecked && anonymous)  {
        navigate('/profile', {replace: true})
    }


    if (!isLoggedIn && !anonymous) {
        navigate('/login', {replace: true})
    }




    return <>{children}</>

}