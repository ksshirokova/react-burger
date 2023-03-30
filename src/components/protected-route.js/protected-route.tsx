

import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { TRouteState } from "../../utils/types";
import { TRootState } from "../../services/store";




export default function ProtectedRoute({ children, isUser, anonymous } : {isUser?: boolean, anonymous: boolean, children: JSX.Element}) {
    const { isAuth, isAuthChecked, isLogged, userChecked, user}= useSelector<TRootState, TRouteState>(state => state.routeStore)
    
    
    // const isLoggedIn = !!useSelector<TRootState, TRouteState>(state => state.routeStore.user)
    
    
    
    const location = useLocation()
    const from = location.state?.from || '/';
    // useEffect(() => {
        // console.log(isLoggedIn)
        //  setTimeout(()=>{
            
            if (!isAuthChecked && !userChecked) {
                return <h1>Загрузка...</h1>
               
            }
    
            //анонимный доступ - может ли сюда войти человек без данных юзера
            if (anonymous && user && !isUser) {
                return <Navigate to={ from } />;
                
            }
    
    
            if (!anonymous && !user && !isUser) {
                return <Navigate to="/login" state={{ from: location}}/>;
    
                
            }
            if(!anonymous && !isAuth && isLogged){
                return <Navigate to="/login" state={{ from: location}}/>;
    
            }
            if (!anonymous && user && isUser && isAuth) {
                return <Navigate to={ from } />;
                //  return<Navigate to='/' replace={true}/>
    
               
            }
            
        //  }, 0)


        
 
    // }, [isLoggedIn])
    
    return <>{children}</>








}