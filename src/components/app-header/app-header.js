import {
  BurgerIcon,
  Logo,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./app-header.module.css";

export default function AppHeader() {
  return (
    <div className={style.background}>
      <header className={`${style.header} p-4`}>
        <div className={style.firstBlock}>
          <a href="#" className={`${style.listItem} pt-4 pb-4 pr-5 pl-5 `}>
            <BurgerIcon type="primary" />
            <p
              className={`${style.text} text text_type_main-default text_color_active ml-2`}
            >
              Конструктор
            </p>
          </a>
          <a href="#" className={`${style.listItem} pt-4 pb-4 pr-5 pl-5 ml-2`}>
            <ListIcon type="secondary" />
            <p
              className={`${style.text} text text_type_main-default text_color_inactive ml-2`}
            >
              Лента заказов
            </p>
          </a>
        </div>
        <div className={style.logo}>
          <Logo />
        </div>
        <a href="#" className={`${style.listItem} pt-4 pb-4 pr-5 pl-5`}>
          <ProfileIcon type="secondary" />
          <p
            className={`${style.text} text text_type_main-default text_color_inactive ml-2`}
          >
            Личный кабинет
          </p>
        </a>
      </header>
    </div>
  );
}
