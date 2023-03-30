import {
  Logo,
  ListIcon,
 
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./app-header.module.css";
import {NavLink, useLocation} from 'react-router-dom'

export default function AppHeader() {
  const {pathname } = useLocation()
  return (
    <div className={style.background}>
      <header className={`${style.header} p-4`}>
        <div className={style.firstBlock}>
          <NavLink to='/' className={({isActive})=>(isActive ? ` pt-4 pb-4 pr-5 pl-5 ml-2 ${style.listActive}`: ` pt-4 pb-4 pr-5 pl-5 ml-2 ${style.listInactive}`)}>
          {pathname ==='/' ? <ListIcon type="primary" /> : <ListIcon type="secondary" />}
            <p
              className={`${style.text} text text_type_main-default  ml-2`}
            >
              Конструктор
            </p>
          </NavLink>
          <NavLink to='/register' className={({isActive})=>(isActive ? ` pt-4 pb-4 pr-5 pl-5 ml-2 ${style.listActive}`: ` pt-4 pb-4 pr-5 pl-5 ml-2 ${style.listInactive}`)}>
            {pathname ==='/register' ? <ListIcon type="primary" /> : <ListIcon type="secondary" />}
            <p
              className={`${style.text} text text_type_main-default  ml-2`}
            >
              Лента заказов
            </p>
          </NavLink>
        </div>
        <NavLink to="/" className={style.logo}>
          <Logo />
        </NavLink>
        <NavLink to='/profile'  className={({isActive})=>(isActive ? ` pt-4 pb-4 pr-5 pl-5 ml-2 ${style.listActive}`: ` pt-4 pb-4 pr-5 pl-5 ml-2 ${style.listInactive}`)}>
        {pathname ==='/profile' ? <ListIcon type="primary" /> : <ListIcon type="secondary" />}
          <p
            className={`${style.text} text text_type_main-default  ml-2`}
          >
            Личный кабинет
          </p>
        </NavLink>
      </header>
    </div>
  );
}
