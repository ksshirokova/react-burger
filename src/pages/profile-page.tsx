import React, { useEffect, useState, useRef } from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile-page.module.css";
import { NavLink } from "react-router-dom";

import { changeData } from "../services/actions/routing";
import { logoutFromSite } from "../services/actions/routing";
import { getCookie } from "../utils/utils";
import { useSelector, useDispatch } from "../utils";

export default function ProfilePage() {

  const [nameIcon, setNameIcon] = useState<"EditIcon" | "CloseIcon">("EditIcon");
  const [emailIcon, setEmailIcon] = useState<"EditIcon" | "CloseIcon">("EditIcon");
  const [passwordIcon, setPasswordIcon] = useState<"EditIcon" | "CloseIcon">("EditIcon");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [usersPassword, setPassword] = useState("");
  const [nameDisabled, setNameDisabled] = useState(true);
  const [passwordDisabled, setPasswordDisabled] = useState(true);
  const [emailDisabled, setEmailDisabled] = useState(true);

  const {user, loading, password }= useSelector(state => state.routeStore);
  const inputRef = useRef<HTMLInputElement>(null!);
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
      setPassword(password)
      
  
    }
  }, [user, password]);

  const backToUserData=()=>{
    setName(user.name);
    setEmail(user.email);
    password && setPassword(password)
  }
  const logoutFromHere = (e: any)=>{
    e.preventDefault()
    dispatch(logoutFromSite(getCookie('refreshToken')))
    
    
  }

  return (
    loading ? 
    <p className={`${styles.loader} text text_type_main-large mt-10 `}>
            Загрузка...
        </p>
        :
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
        <form onSubmit={submitData}>
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
            value={usersPassword}
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
              
            >
              Сохранить
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}

