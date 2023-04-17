import { useEffect, useState, useRef } from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile-page.module.css";

import { changeData } from "../services/actions/routing";
import { useSelector, useDispatch } from "../utils";
import ProfileNav from "../components/profile-nav/profile-nav";

export default function ProfilePage() {
  const [nameIcon, setNameIcon] = useState<"EditIcon" | "CloseIcon">(
    "EditIcon"
  );
  const [emailIcon, setEmailIcon] = useState<"EditIcon" | "CloseIcon">(
    "EditIcon"
  );
  const [passwordIcon, setPasswordIcon] = useState<"EditIcon" | "CloseIcon">(
    "EditIcon"
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [usersPassword, setPassword] = useState("");
  const [nameDisabled, setNameDisabled] = useState(true);
  const [passwordDisabled, setPasswordDisabled] = useState(true);
  const [emailDisabled, setEmailDisabled] = useState(true);

  const { user, loading, password } = useSelector((state) => state.routeStore);
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

  const submitData = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("click");
    e.preventDefault();
    dispatch(changeData(name, email, usersPassword));
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
      password && setPassword(password);
    }
  }, [password, user]);

  const backToUserData = () => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      password && setPassword(password);
    }
  };

  return loading ? (
    <p className={`${styles.loader} text text_type_main-large mt-10 `}>
      Загрузка...
    </p>
  ) : (
    <main className={styles.main}>
      <ProfileNav />
      <div className={styles.inputs}>
        <form onSubmit={submitData}>
          <Input
            id={"changeNameInput"}
            type={"text"}
            placeholder={"Имя"}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
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
            <p
              className={`${styles.span} text text_type_main-small mr-7`}
              onClick={backToUserData}
            >
              Отмена
            </p>
            <Button htmlType="submit" type="primary" size="medium">
              Сохранить
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
