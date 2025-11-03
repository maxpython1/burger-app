import React from "react";
import PropTypes from "prop-types";
import styles from "./BurgerConstructor.module.css";
import {
  ConstructorElement,
  CurrencyIcon,
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import icon from "../../images/vector.svg";
import { useDispatch, useSelector } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import {
  addItem,
  removeItem,
  setBun
} from "../../services/actions/burgerConstructor";

function BurgerConstructor({ openModal }) {
  const dispatch = useDispatch();

  const bun = useSelector((store) => store.burgerConstructor.bun);

  const ingredients = useSelector(
    (store) => store.burgerConstructor.ingredients
  );

  const [{ isHover }, dropBunRef] = useDrop(
    {
      accept: "bun",
      drop(item) {
        dispatch(setBun(item));
      },
      collect: (monitor) => ({ isHover: monitor.isOver() })
    },
    []
  );

  const [, dropIngredientRef] = useDrop(
    {
      accept: "ingredient",
      drop(item) {
        dispatch(addItem(item));
      }
    },
    []
  );

  const orderPrice = () => {
    let price = 0;
    price += ingredients.reduce((acc, el) => acc + el.price, 0);
    price += bun ? bun.price * 2 : 0;
    return price;
  };

  return (
    <div className={styles.wrapper} ref={dropBunRef}>
      <div className={styles.bun}>
        {bun && (
          <ConstructorElement
            text={`${bun.name} (верх)`}
            type={"top"}
            isLocked={true}
            thumbnail={bun.image}
            price={bun.price}
          />
        )}
      </div>
      <ul className={styles.ingredients} ref={bun && dropIngredientRef}>
        {ingredients.map((elem, id) => {
          return (
            <li key={id} className={styles.cardIngredient}>
              <img src={icon} alt={"Иконка перетаскивания"} />
              <ConstructorElement
                text={elem.name}
                thumbnail={elem.image}
                price={elem.price}
                handleClose={() => dispatch(removeItem(elem.uuid))}
              />
            </li>
          );
        })}
      </ul>
      <div className={styles.bun} ref={dropBunRef}>
        {bun && (
          <ConstructorElement
            text={`${bun.name} (низ)`}
            type={"bottom"}
            isLocked={true}
            thumbnail={bun.image}
            price={bun.price}
          />
        )}
      </div>
      <div className={styles.totalPrice}>
        <div className={styles.price}>
          <p className="text text_type_digits-medium">{orderPrice()}</p>
          <CurrencyIcon type={"primary"} />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={() => {
            // openModal();
            ingredients.forEach((el) => console.log(el.uuid));
          }}
        >
          Оформить заказ
        </Button>
      </div>
    </div>
  );
}

BurgerConstructor.propTypes = {
  openModal: PropTypes.func
};

export default BurgerConstructor;
