import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import {
  Button,
  Input,
  PasswordInput
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../services/actions/auth";

function Login() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={styles.page}>
      <form
        className={styles.loginWrapper}
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(login(email, password));
        }}
      >
        <p className="text text_type_main-medium">Вход</p>
        <Input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type={"text"}
          placeholder={"E-mail"}
          name={"email"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          extraClass={"ml-1"}
        />
        <PasswordInput
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          name={"password"}
        />
        <Button htmlType="submit" type="primary" size="large">
          Войти
        </Button>
      </form>
      <div className={styles.answersWrapper}>
        <span className={styles.answer}>
          <p className="text text_type_main-default text_color_inactive">
            Вы - новый пользователь?
          </p>
          <Link to={"/register"} className={styles.link}>
            Зарегестрироваться
          </Link>
        </span>
        <span className={styles.answer}>
          <p className="text text_type_main-default text_color_inactive">
            Забыли пароль?
          </p>
          <Link to={"/forgot-password"} className={styles.link}>
            Восстановить пароль
          </Link>
        </span>
      </div>
    </div>
  );
}

export default Login;
