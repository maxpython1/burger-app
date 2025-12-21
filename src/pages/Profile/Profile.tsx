import {
  Button,
  PasswordInput,
  Input as UIInput
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useForm } from "../../hooks/useForm";
import { logoutThunk, updateUserThunk } from "../../services/slices/authSlice";
import styles from "./Profile.module.css";

type TUpdateUserProfile = {
  name?: string;
  email?: string;
  password?: string;
};

const Input = UIInput as any;

function Profile() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const { values, handleChange, setValues } = useForm({
    name: "",
    email: "",
    password: ""
  });

  const original = useRef<TUpdateUserProfile>({
    name: "",
    email: "",
    password: ""
  });

  const [nameDisabled, setNameDisabled] = useState(true);
  const [emailDisabled, setEmailDisabled] = useState(true);
  const [showFormButtons, setShowFormButton] = useState(false);

  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (user) {
      setValues({
        name: user.name,
        email: user.email,
        password: ""
      });
      original.current = { name: user.name, email: user.email, password: "" };
    }
  }, [user]);

  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <nav className={styles.nav}>
          <NavLink to={"/profile"} end className="text text_type_main-large">
            Профиль
          </NavLink>
          <NavLink
            to={"/profile/orders"}
            className={({ isActive }) =>
              isActive
                ? "text text_type_main-large"
                : "text text_type_main-large text_color_inactive"
            }
          >
            История заказов
          </NavLink>
          <NavLink
            to={"/"}
            onClick={() => {
              dispatch(logoutThunk());
            }}
            className="text text_type_main-large text_color_inactive"
          >
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
            const data: TUpdateUserProfile = {};

            if (original.current.name !== values.name) {
              data.name = values.name;
            }

            if (original.current.email !== values.email) {
              data.email = values.email;
            }

            if (values.password.length >= 5) {
              data.password = values.password;
            }

            dispatch(updateUserThunk(data));
            setShowFormButton(false);
          }}
        >
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              handleChange(e);
              setShowFormButton(true);
            }}
            icon={"EditIcon"}
            value={values.name}
            name={"name"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="ml-1"
            ref={nameRef}
            onIconClick={() => {
              setTimeout(() => nameRef.current?.focus(), 0);
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
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              handleChange(e);
              setShowFormButton(true);
            }}
            icon={"EditIcon"}
            value={values.email}
            name={"email"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="ml-1"
            ref={emailRef}
            onIconClick={() => {
              setTimeout(() => emailRef.current?.focus(), 0);
              setEmailDisabled(false);
            }}
            disabled={emailDisabled}
            onBlur={() => {
              setEmailDisabled(true);
            }}
          />
          <PasswordInput
            onChange={(e) => {
              handleChange(e);
              setShowFormButton(true);
            }}
            value={values.password}
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
                  setValues({
                    name: original.current.name || "",
                    email: original.current.email || "",
                    password: ""
                  });
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
