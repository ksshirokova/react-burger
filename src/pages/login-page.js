import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import styles from "./registration-styles.module.css";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../services/actions/routing";

export default function LoginPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const inputRef = React.useRef(null);
  const [icon, setIcon] = React.useState("HideIcon");
  const passInput = document.getElementById("userPassword");
  const isLogged = useSelector((state) => state.routeStore.isLogged);
  const isLoading = useSelector((state) => state.routeStore.loading);
  const isAuth = useSelector((state) => state.routeStore.isAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    if (passInput.type === "password") {
      passInput.type = "text";
      setIcon("ShowIcon");
    } else {
      passInput.type = "password";
      setIcon("HideIcon");
    }
  };
  const sendData = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };

  return (
    isLoading ?
    <p className={`${styles.loader} text text_type_main-large mt-10 `}>
            Загрузка...
        </p>
        :
    <main className={styles.main}>
      <section className={styles.inputs}>
        <form onSubmit={sendData}>
          <p className={`${styles.text} text text_type_main-medium mb-6`}>
            Вход
          </p>

          <Input
            type={"email"}
            placeholder={"E-mail"}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            name={"name"}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="ml-1 mb-6"
          />
          <Input
            id={"userPassword"}
            type={"password"}
            placeholder={"Пароль"}
            onChange={(e) => setPassword(e.target.value)}
            icon={icon}
            value={password}
            name={"name"}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="ml-1 mb-6"
          />

          <Button htmlType="submit" type="primary" size="medium">
            Войти
          </Button>
        </form>

        <p className="text text_type_main-small text_color_inactive mt-20">
          Вы новый пользователь?
          <NavLink to="/register" className={styles.link}>
            {" "}
            Зарегистрироваться
          </NavLink>
        </p>
        <p className="text text_type_main-small text_color_inactive mt-4">
          Забыли пароль?
          <NavLink to="/forgot-password" className={styles.link}>
            {" "}
            Восстановить пароль
          </NavLink>
        </p>
      </section>
    </main>
  );
}
