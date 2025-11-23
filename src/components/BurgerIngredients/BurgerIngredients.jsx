import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import CardIngredient from "../CardIngredient/CardIngredient";
import styles from "./BurgerIngredients.module.css";

function BurgerIngredients() {
  const [current, setCurrent] = React.useState("bun");
  const ingredients = useSelector((store) => store.ingredients.ingredients);
  const navigate = useNavigate();
  const location = useLocation();

  const containerRef = React.useRef(null);
  const bunsRef = React.useRef(null);
  const saucesRef = React.useRef(null);
  const mainsRef = React.useRef(null);

  let buns = React.useMemo(
    () => ingredients.filter((arr) => arr.type === "bun"),
    [ingredients]
  );
  let sauces = React.useMemo(
    () => ingredients.filter((arr) => arr.type === "sauce"),
    [ingredients]
  );
  let main = React.useMemo(
    () => ingredients.filter((arr) => arr.type === "main"),
    [ingredients]
  );

  const handleScroll = () => {
    const container = containerRef.current.scrollTop;
    const sauces = saucesRef.current.offsetTop;
    const mains = mainsRef.current.offsetTop;

    if (container < sauces - 100) {
      setCurrent("bun");
    } else if (container < mains - 100) {
      setCurrent("sauces");
    } else {
      setCurrent("mains");
    }
  };

  const clickOnCurrentTab = (ref) => {
    const container = containerRef.current;
    container.scrollTo({ top: ref.current.offsetTop, behavior: "smooth" });
  };

  return (
    <div className={styles.wrapper}>
      <p className={`text text_type_main-large ${styles.title}`}>
        Соберите бургер
      </p>
      <div className={styles.tab}>
        <Tab
          value="bun"
          active={current === "bun"}
          onClick={() => {
            setCurrent("bun");
            clickOnCurrentTab(bunsRef);
          }}
        >
          Булки
        </Tab>
        <Tab
          value="sauces"
          active={current === "sauces"}
          onClick={() => {
            setCurrent("sauces");
            clickOnCurrentTab(saucesRef);
          }}
        >
          Соусы
        </Tab>
        <Tab
          value="mains"
          active={current === "mains"}
          onClick={() => {
            setCurrent("mains");
            clickOnCurrentTab(mainsRef);
          }}
        >
          Начинки
        </Tab>
      </div>
      <div
        className={styles.scrollArea}
        ref={containerRef}
        onScroll={handleScroll}
      >
        <p
          className={`text text_type_main-medium ${styles.ingredientTitle}`}
          ref={bunsRef}
        >
          Булки
        </p>
        <ul className={styles.grid}>
          {buns.map((elem) => {
            return (
              <li
                key={elem._id}
                onClick={() => {
                  navigate(`/ingredients/${elem._id}`, {
                    state: { background: location }
                  });
                }}
                className={styles.ingredients}
              >
                <CardIngredient ingredient={elem} />
              </li>
            );
          })}
        </ul>
        <p
          className={`text text_type_main-medium ${styles.ingredientTitle}`}
          ref={saucesRef}
        >
          Соусы
        </p>
        <ul className={styles.grid}>
          {sauces.map((elem) => {
            return (
              <li
                key={elem._id}
                onClick={() => {
                  navigate(`/ingredients/${elem._id}`, {
                    state: { background: location }
                  });
                }}
                className={styles.ingredients}
              >
                <CardIngredient ingredient={elem} />
              </li>
            );
          })}
        </ul>
        <p
          className={`text text_type_main-medium ${styles.ingredientTitle}`}
          ref={mainsRef}
        >
          Начинки
        </p>
        <ul className={styles.grid}>
          {main.map((elem) => {
            return (
              <li
                key={elem._id}
                onClick={() => {
                  navigate(`/ingredients/${elem._id}`, {
                    state: { background: location }
                  });
                }}
                className={styles.ingredients}
              >
                <CardIngredient ingredient={elem} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

BurgerIngredients.propTypes = {
  openModal: PropTypes.func
};

export default BurgerIngredients;
