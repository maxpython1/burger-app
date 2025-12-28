import {
  Button,
  PasswordInput,
  Input as UIInput
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux";
import { useForm } from "../../hooks/useForm";
import { loginThunk } from "../../services/slices/authSlice";
import styles from "./Login.module.css";

const Input = UIInput as any;

function Login() {
  const dispatch = useAppDispatch();

  const { values, handleChange } = useForm({
    email: "",
    password: ""
  });

  return (
    <div className={styles.page}>
      <form
        className={styles.loginWrapper}
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(
            loginThunk({ email: values.email, password: values.password })
          );
        }}
      >
        <p className="text text_type_main-medium">Вход</p>
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
        <PasswordInput
          onChange={handleChange}
          value={values.password}
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
