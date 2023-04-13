import { useEffect, useRef, useState } from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./registration-styles.module.css";
import { Link, useNavigate } from "react-router-dom";
import { VISITED_FORGOT_PASSWORD } from "../services/constants";
import { sendEmail } from "../services/actions/routing";

import { useDispatch } from "../utils";

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null!);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };

  const navigate = useNavigate();

  const handleClick = (e: any) => {
    e.preventDefault();
    value && dispatch(sendEmail(value));
    value && navigate("/reset-password");
  };

  useEffect(() => {
    dispatch({ type: VISITED_FORGOT_PASSWORD, forgotPassVisited: true });
  }, [dispatch]);

  return (
    <main className={styles.main}>
      <section className={styles.inputs}>
        <form onSubmit={handleClick}>
          <p className={`${styles.text} text text_type_main-medium mb-6`}>
            Вход
          </p>
          <Input
            type={"email"}
            placeholder={"E-mail"}
            onChange={(e) => setValue(e.target.value)}
            value={value}
            name={"name"}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="ml-1 mb-6"
          />

          <Button htmlType="submit" type="primary" size="medium">
            Восстановить
          </Button>
        </form>
        <p className="text text_type_main-small text_color_inactive mt-20">
          Вспомнили пароль?
          <Link to="/login" className={styles.link}>
            {" "}
            Войти
          </Link>
        </p>
      </section>
    </main>
  );
}
