import React from "react";
import styles from "./AppHeader.module.css";
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";

function AppHeader() {
	
	return (
		<header className={styles.header}>
			<nav className={styles.leftMenu}>
				<a className={styles.navItem} href={"#"}>
					<BurgerIcon type={"primary"}/>
					<p className="text text_type_main-default">Конструктор</p>
				</a>
				<a className={styles.navItem} href={"#"}>
					<ListIcon type={"secondary"}/>
					<p className="text text_type_main-default text_color_inactive">Лента заказов</p>
				</a>
			</nav>
			<Logo/>
			<nav className={styles.rightMenu}>
				<a className={styles.navItem} href={"#"}>
					<ProfileIcon type={"secondary"}/>
					<p className="text text_type_main-default text_color_inactive">Личный кабинет</p>
				</a>
			</nav>
		</header>
	);
}

export default AppHeader;
