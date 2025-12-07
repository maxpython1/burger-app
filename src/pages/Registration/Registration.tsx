import {
  Button,
  PasswordInput,
  Input as UIInput
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { register } from "../../services/actions/auth";
import styles from "./Registration.module.css";

const Input = UIInput as any;

function Registration() {
  const dispatch = useDispatch<any>();

  const { values, handleChange } = useForm({
    name: "",
    email: "",
    password: ""
  });

  return (
    <div className={styles.page}>
      <form
        className={styles.loginWrapper}
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(register(values.name, values.email, values.password));
        }}
      >
        <p className="text text_type_main-medium">Регистрация</p>
        <Input
          onChange={handleChange}
          value={values.name}
          type={"text"}
          placeholder={"Имя"}
          name={"name"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          extraClass={"ml-1"}
        />
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
