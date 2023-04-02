import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FormEvent, useState, useRef } from "react";
import styles from "./registration-styles.module.css";
import { NavLink } from "react-router-dom";

import { loginUser } from "../services/actions/routing";


import { useTypeDispatch } from "../utils/hooks-types";
import { useTypeSelector } from "../utils/hooks-types";

export default function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const inputRef = useRef<HTMLInputElement>(null!);
  const [icon, setIcon] = useState<"HideIcon" | "ShowIcon">("HideIcon");
  const { loading } = useTypeSelector((state) => state.routeStore);
  const [inputType, setInputType] = useState<"password" | "text" | undefined>('password');
  
  const dispatch = useTypeDispatch();
 
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    if (inputType === 'password') {
        setInputType('text')
        setIcon('ShowIcon')
    }
    else {
        setInputType('password')
        setIcon('HideIcon')

    }

}
  const sendData = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
   
  };

  return (
    loading ?
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
