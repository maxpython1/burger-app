import styles from './AppHeader.module.css'
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import React from "react";

function AppHeader() {
	return (
		<header className={styles.header}>
			<nav className={styles.leftMenu}>
				<a className={styles.navItem} href={'#'}>
					<BurgerIcon type={"primary"}/>
					<p className={`text text_type_main-default ${styles.textLight}`}>Конструктор</p>
				</a>
				<a className={styles.navItem} href={'#'}>
					<ListIcon type={"secondary"}/>
					<p className={`text text_type_main-default ${styles.textDark}`}>Лента заказов</p>
				</a>
			</nav>
			<Logo/>
			<nav className={styles.rightMenu}>
				<a className={styles.navItem} href={'#'}>
					<ProfileIcon type={"secondary"}/>
					<p className={`text text_type_main-default ${styles.textDark}`}>Личный кабинет</p>
				</a>
			</nav>
		</header>
	);
}

export default AppHeader;
