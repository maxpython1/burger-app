import React, { useState } from "react";
import styles from "./Registration.module.css";
import {
  Button,
  Input,
  PasswordInput
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../../services/actions/auth";

function Registration() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={styles.page}>
      <form
        className={styles.loginWrapper}
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(register(name, email, password));
        }}
      >
        <p className="text text_type_main-medium">Регистрация</p>
        <Input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type={"text"}
          placeholder={"Имя"}
          name={"name"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          extraClass={"ml-1"}
        />
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
          Зарегестрироваться
        </Button>
      </form>
      <div className={styles.answersWrapper}>
        <span className={styles.answer}>
          <p className="text text_type_main-default text_color_inactive">
            Уже зарегистрированы?
          </p>
          <Link to={"/login"} className={styles.link}>
            Войти
          </Link>
        </span>
      </div>
    </div>
  );
}

export default Registration;
