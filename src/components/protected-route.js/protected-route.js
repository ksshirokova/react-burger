import { useSelector } from "react-redux";
import { Navigate, useNavigate, useLocation } from "react-router-dom";



export default function ProtectedRoute({ anonymous, children }) {
    const isAuth = useSelector(state => state.routeStore.isAuth)
    const isLoggedIn = !!useSelector(state => state.routeStore.user)
    
    
    
    if(!isAuth){
        return <Navigate to='/login' />
    }
    if(isLoggedIn){
        <Navigate to='/profile'/>
    }
    if(!isLoggedIn){
        return <Navigate to='/login' />
    }
    return <>{children}</>

}