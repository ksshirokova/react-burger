import { useSelector } from "react-redux";
import { Navigate, useNavigate, useLocation } from "react-router-dom";



export default function ProtectedRoute({ anonymous, children }) {
    const isAuth = useSelector(state => state.routeStore.isAuth)
    const user = useSelector(state => state.routeStore.user)
    const isLoggedIn = !!useSelector(state => state.routeStore.user)
    const loading = useSelector(state => state.routeStore.loading)
    const isLogged = useSelector(state => state.routeStore.isLogged)


    // if(!isAuth){
    //     return <Navigate to='/login' />
    // }

    if (isAuth) {
        return <Navigate to='/profile' />
    }

    if (!isAuth) {
        return <Navigate to='/login' />
    }


    return <>{children}</>

}