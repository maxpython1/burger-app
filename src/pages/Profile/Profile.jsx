import React, { useState } from "react";
import styles from "./Profile.module.css";
import {
  Input,
  PasswordInput
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";

function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <nav className={styles.nav}>
          <NavLink to={"/profile"} end className="text text_type_main-large">
            Профиль
          </NavLink>
          <NavLink className="text text_type_main-large text_color_inactive">
            История заказов
          </NavLink>
          <NavLink className="text text_type_main-large text_color_inactive">
            Выход
          </NavLink>
          <p
            className={`text text_type_main-default text_color_inactive ${styles.info}`}
          >
            В этом разделе вы можете изменить
            <br />
            свои персональные данные
          </p>
        </nav>
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={(e) => setName(e.target.value)}
            icon={"EditIcon"}
            value={name}
            name={"name"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="ml-1"
          />
          <Input
            type={"text"}
            placeholder={"Логин"}
            onChange={(e) => setEmail(e.target.value)}
            icon={"EditIcon"}
            value={email}
            name={"email"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="ml-1"
          />
          <PasswordInput
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            icon={"EditIcon"}
          />
        </form>
      </div>
    </div>
  );
}

export default Profile;
