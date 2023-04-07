import { NavLink } from "react-router-dom"
import styles from './profile-nav.module.css'
import { useDispatch } from "../../utils"
import { logoutFromSite } from "../../services/actions/routing"
import { getCookie } from "../../utils/utils"
import { useLocation } from "react-router-dom"

export default function ProfileNav(){
const dispatch = useDispatch()
const { pathname } = useLocation();
    const logoutFromHere = (e: any)=>{
        e.preventDefault()
        dispatch(logoutFromSite(getCookie('refreshToken')))
        
        
      }
    return(

        <div className={styles.nav}>
        <NavLink
          to='/profile'
          className={({ isActive }) =>
            isActive && pathname !== "/profile/orders" ? styles.linkActive : styles.linkInactive
          }
        >
          <p
            className={`${styles.text} text text_type_main-medium `}
          >
            Профиль
          </p>
        </NavLink>
        <NavLink
          to="/profile/orders"
          className={({ isActive }) =>
            isActive ? styles.linkActive : styles.linkInactive
          }
        >
          <p
            className={`${styles.text} text text_type_main-medium `}
          >
            История заказов
          </p>
        </NavLink>
        <NavLink
          to="/profile/orders:id"
          className={({ isActive }) =>
            isActive ? styles.linkActive : styles.linkInactive
          }
        >
          <p
            className={`${styles.text} text text_type_main-medium `} onClick={logoutFromHere}
          >
            Выход
          </p>
        </NavLink>

        <p
          className={`${styles.explanation} text text_type_main-default text_color_inactive mt-20`}
        >
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
    )
}