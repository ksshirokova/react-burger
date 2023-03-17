
import { useSelector } from "react-redux";
import { Navigate, useNavigate, useLocation } from "react-router-dom";



export default function ProtectedRoute({ children }) {
    const isAuth = useSelector(state => state.routeStore.isAuth)
    const isAuthChecked = useSelector(state => state.routeStore.isAuthChecked)
    const user = useSelector(state => state.routeStore.user)
    const isLoggedIn = !!useSelector(state => state.routeStore.user)
    const loading = useSelector(state => state.routeStore.loading)
    const isLogged = useSelector(state => state.routeStore.isLogged)
    const navigate = useNavigate()


    // if(!isAuth){
    //     return <Navigate to='/login' />
    // }
    console.log(isLogged)
    
    if (isLogged) {
        navigate('/profile', {replace: true})
    }


    if (!isLogged) {
        navigate('/login', {replace: true})
    }




    return <>{children}</>

}