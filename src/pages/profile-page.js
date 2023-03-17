import React, { useEffect } from "react";
import {
  Input,
  EditIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile-page.module.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { changeData, checkAuth } from "../services/actions/routing";
import { logoutFromSite } from "../services/actions/routing";
import { getCookie } from "../utils/utils";

export default function ProfilePage() {
  const [nameIcon, setNameIcon] = React.useState("EditIcon");
  const [emailIcon, setEmailIcon] = React.useState("EditIcon");
  const [passwordIcon, setPasswordIcon] = React.useState("EditIcon");
  // const name = useSelector((state) => state.routeStore.user.name)
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [nameDisabled, setNameDisabled] = React.useState(true);
  const [passwordDisabled, setPasswordDisabled] = React.useState(true);
  const [emailDisabled, setEmailDisabled] = React.useState(true);

  const user = useSelector((state) => state.routeStore.user);
  const inputRef = React.useRef(null);
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const onIconEmailClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    if (emailDisabled === true) {
      setEmailDisabled(false);
      setEmailIcon("CloseIcon");
    } else {
      setEmailDisabled(true);
      setEmailIcon("EditIcon");
    }
  };

  const submitData = () => {
    dispatch(changeData(name, email, password));
  };

  const onIconNameClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    if (nameDisabled === true) {
      setNameDisabled(false);
      setNameIcon("CloseIcon");
    } else {
      setNameDisabled(true);
      setNameIcon("EditIcon");
    }
  };

  const onIconPasswordClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    if (passwordDisabled === true) {
      setPasswordDisabled(false);
      setPasswordIcon("CloseIcon");
    } else {
      setPasswordDisabled(true);
      setPasswordIcon("EditIcon");
    }
  };
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPassword(user.password)
      
  
    }
  }, [user]);

  const backToUserData=()=>{
    setName(user.name);
    setEmail(user.email);
    setPassword(user.password)
  }
  const logoutFromHere = ()=>{
    dispatch(logoutFromSite(getCookie('refreshToken')))
  }

  return (
    <main className={styles.main}>
      <div className={styles.nav}>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? styles.linkActive : styles.linkInactive
          }
        >
          <p
            className={`${styles.text} text text_type_main-medium text_color_active`}
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
            className={`${styles.text} text text_type_main-medium text_color_inactive`}
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
            className={`${styles.text} text text_type_main-medium text_color_inactive`} onClick={logoutFromHere}
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
      <div className={styles.inputs}>
        <form>
          <Input
            id={"changeNameInput"}
            type={"text"}
            placeholder={"Имя"}
            onChange={(e) => setName(e.target.value)}
            disabled={nameDisabled}
            value={name}
            error={false}
            ref={inputRef}
            onIconClick={onIconNameClick}
            icon={nameIcon}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="ml-1 mb-6"
          />
          <Input
            id={"changeEmailInput"}
            type={"email"}
            placeholder={"Логин"}
            onChange={(e) => setEmail(e.target.value)}
            disabled={emailDisabled}
            icon={emailIcon}
            value={email}
            name={"name"}
            error={false}
            ref={inputRef}
            onIconClick={onIconEmailClick}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="ml-1 mb-6 m-a"
          />
          <Input
            id={"changePasswordInput"}
            type={"password"}
            placeholder={"Пароль"}
            onChange={(e) => setPassword(e.target.value)}
            disabled={passwordDisabled}
            icon={passwordIcon}
            value={password}
            name={"name"}
            error={false}
            ref={inputRef}
            onIconClick={onIconPasswordClick}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="ml-1"
          />
          <div className={styles.hiddenBlock}>
            <p className={`${styles.span} text text_type_main-small mr-7`} onClick={backToUserData}>
              Отмена
            </p>
            <Button
              htmlType="button"
              type="primary"
              size="medium"
              onClick={submitData}
            >
              Сохранить
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
