import React from "react";
import styles from "./AppHeader.module.css";
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";

function AppHeader() {
  return (
    <header className={styles.header}>
      <nav className={styles.leftMenu}>
        <NavLink
          to={"/"}
          end
          className={({ isActive }) =>
            isActive
              ? `text text_type_main-default ${styles.navItem}`
              : `text text_type_main-default text_color_inactive ${styles.navItem}`
          }
        >
          <BurgerIcon type={"primary"} />
          <p>Конструктор</p>
        </NavLink>
        <a className={styles.navItem} href={"#"}>
          <ListIcon type={"secondary"} />
          <p className="text text_type_main-default text_color_inactive">
            Лента заказов
          </p>
        </a>
      </nav>
      <Logo />
      <nav className={styles.rightMenu}>
        <NavLink
          to={"/profile"}
          end
          className={({ isActive }) =>
            isActive
              ? `text text_type_main-default ${styles.navItem}`
              : `text text_type_main-default text_color_inactive ${styles.navItem}`
          }
        >
          <ProfileIcon type={"secondary"} />
          <p>Личный кабинет</p>
        </NavLink>
      </nav>
    </header>
  );
}

export default AppHeader;
