import {
  Button,
  Input as UIInput
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { request } from "../../utils/api";
import styles from "./ForgotPassword.module.css";

const Input = UIInput as any;

function ForgotPassword() {
  const { values, handleChange } = useForm({
    email: ""
  });

  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <form
        className={styles.loginWrapper}
        onSubmit={(e) => {
          e.preventDefault();
          request("password-reset", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: values.email })
          })
            .then(() => {
              navigate("/reset-password", {
                replace: true,
                state: { from: "forgot-password" }
              });
            })
            .catch((e) => console.log(e));
        }}
      >
        <p className="text text_type_main-medium">Восстановление пароля</p>
        <Input
          onChange={handleChange}
          value={values.email}
          type={"text"}
          placeholder={"E-mail"}
          name={"email"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          extraClass={"ml-1"}
        />
        <Button htmlType="submit" type="primary" size="large">
          Восстановить
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
}

export default ForgotPassword;
