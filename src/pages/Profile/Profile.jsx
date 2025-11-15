import React, { useEffect, useRef, useState } from "react";
import styles from "./Profile.module.css";
import {
  Button,
  Input,
  PasswordInput
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, updateUser } from "../../services/actions/auth";

function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const original = useRef({ name: "", email: "", password: "" });

  const [nameDisabled, setNameDisabled] = useState(true);
  const [emailDisabled, setEmailDisabled] = useState(true);
  const [showFormButtons, setShowFormButton] = useState(false);

  const nameRef = useRef(null);
  const emailRef = useRef(null);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      original.current = { name: user.name, email: user.email };
    }
  }, [user]);

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
          <p
            type="button"
            onClick={() => {
              dispatch(logout());
            }}
            className="text text_type_main-large text_color_inactive"
          >
            Выход
          </p>
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
            const data = {};

            if (original.current.name !== name) {
              data.name = name;
            }

            if (original.current.email !== email) {
              data.email = email;
            }

            if (password.length >= 5) {
              data.password = password;
            }

            console.log(data);

            dispatch(updateUser(data));
            setShowFormButton(false);
          }}
        >
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={(e) => {
              setName(e.target.value);
              setShowFormButton(true);
            }}
            icon={"EditIcon"}
            value={name}
            name={"name"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="ml-1"
            ref={nameRef}
            onIconClick={() => {
              setTimeout(() => nameRef.current.focus(), 0);
              setNameDisabled(false);
            }}
            disabled={nameDisabled}
            onBlur={() => {
              setNameDisabled(true);
            }}
          />
          <Input
            type={"text"}
            placeholder={"Логин"}
            onChange={(e) => {
              setEmail(e.target.value);
              setShowFormButton(true);
            }}
            icon={"EditIcon"}
            value={email}
            name={"email"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="ml-1"
            ref={emailRef}
            onIconClick={() => {
              setTimeout(() => emailRef.current.focus(), 0);
              setEmailDisabled(false);
            }}
            disabled={emailDisabled}
            onBlur={() => {
              setEmailDisabled(true);
            }}
          />
          <PasswordInput
            onChange={(e) => {
              setPassword(e.target.value);
              setShowFormButton(true);
            }}
            value={password}
            icon={"EditIcon"}
          />
          {showFormButtons && (
            <div className={styles.buttonsWrapper}>
              <Button htmlType="submit" type="primary" size="medium">
                Сохранить
              </Button>
              <Button
                htmlType="button"
                type="secondary"
                size="medium"
                onClick={() => {
                  setName(original.current.name);
                  setEmail(original.current.email);
                  setPassword("");
                  setShowFormButton(false);
                }}
              >
                Отмена
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Profile;
