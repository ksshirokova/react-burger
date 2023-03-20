
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { checkAuth } from "../../services/actions/routing";



export default function ProtectedRoute({ children, user, anonymous }) {
    const isAuth = useSelector(state => state.routeStore.isAuth)
    const isAuthChecked = useSelector(state => state.routeStore.isAuthChecked)
    
    const isLoggedIn = !!useSelector(state => state.routeStore.user)
    const loading = useSelector(state => state.routeStore.loading)
    const isRegistred = useSelector(state => state.routeStore.isLogged)
    const userChecked = useSelector(state => state.routeStore.userChecked)
    
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // useEffect(() => {
        // console.log(isLoggedIn)
         setTimeout(()=>{
            
            if (!isAuthChecked && !userChecked) {
                return <h1>Загрузка...</h1>
               
            }
    
            //анонимный доступ - может ли сюда войти человек без данных юзера
            if (anonymous && isLoggedIn && !user) {
                return navigate('/login', { replace: true })
                
            }
    
    
            if (!anonymous && !isLoggedIn && !user) {
                return navigate('/login', { replace: true })
    
                
            }
            if(!anonymous && !isAuth && isRegistred){
                return navigate('/login', { replace: true })
    
            }
            if (!anonymous && isLoggedIn && user && isAuth) {
                return navigate('/', { replace: true })
    
               
            }
         }, 0)


        

    // }, [isLoggedIn])
    
    return <>{children}</>








}