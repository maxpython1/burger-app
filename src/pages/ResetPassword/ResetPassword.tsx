import {
  Button,
  PasswordInput,
  Input as UIInput
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ChangeEvent, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { request } from "../../utils/api";
import styles from "./ResetPassword.module.css";

const Input = UIInput as any;

function ResetPassword() {
  const { values, handleChange } = useForm({
    password: ""
  });

  const [token, setToken] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  if (location?.state?.from === "forgot-password") {
    return (
      <div className={styles.page}>
        <form
          className={styles.loginWrapper}
          onSubmit={(e) => {
            e.preventDefault();
            request("password-reset/reset", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ password: values.password, token })
            })
              .then(() => navigate("/login", { replace: true }))
              .catch((e) => console.log(e));
          }}
        >
          <p className="text text_type_main-medium">Восстановление пароля</p>
          <PasswordInput
            onChange={handleChange}
            value={values.password}
            name={"password"}
            placeholder={"Введите новый пароль"}
          />
          <Input
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setToken(e.target.value)
            }
            value={token}
            type={"text"}
            placeholder={"Введите код из письма"}
            name={"code"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            extraClass={"ml-1"}
          />
          <Button htmlType="submit" type="primary" size="large">
            Сохранить
          </Button>
        </form>
        <div className={styles.answersWrapper}>
          <span className={styles.answer}>
            <p className="text text_type_main-default text_color_inactive">
              Вспомнили пароль?
            </p>
            <Link to={"/login"} className={styles.link}>
              Войти
            </Link>
          </span>
        </div>
      </div>
    );
  } else {
    return <Navigate to={"/forgot-password"} replace />;
  }
}

export default ResetPassword;
