import {
  Button,
  ConstructorElement,
  CurrencyIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import React from "react";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addItem,
  moveItem,
  removeItem,
  setBun
} from "../../services/actions/burgerConstructor";
import { createOrder } from "../../services/actions/order";
import { TConstructorIngredient, TIngredient } from "../../utils/types";
import styles from "./BurgerConstructor.module.css";
import DraggableIngredient from "./DraggableIngredient";

type BurgerConstructorProps = {
  openModal: () => void;
};

function BurgerConstructor({ openModal }: BurgerConstructorProps) {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const user = useSelector((state: any) => state.auth.user);
  const bun = useSelector((store: any) => store.burgerConstructor.bun);
  const ingredients = useSelector(
    (store: any) => store.burgerConstructor.ingredients
  ) as TConstructorIngredient[];

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

  const moveIngredient = (from: number, to: number) => {
    dispatch(moveItem(from, to));
  };

  const orderPrice = () => {
    let price = 0;
    price += ingredients.reduce(
      (acc: number, el: TIngredient) => acc + el.price,
      0
    );
    price += bun ? bun.price * 2 : 0;
    return price;
  };

  const orderIds = React.useMemo(() => {
    if (!bun) return null;
    return [bun._id, ...ingredients.map((el: TIngredient) => el._id), bun._id];
  }, [bun, ingredients]);

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
      <ul className={styles.ingredients} ref={bun ? dropIngredientRef : null}>
        {ingredients.map((elem, id) => (
          <DraggableIngredient
            key={elem.uuid}
            elem={elem}
            index={id}
            move={moveIngredient}
            onRemove={(uuid: string) => dispatch(removeItem(uuid))}
          />
        ))}
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
            if (!user) {
              return navigate("/login");
            }
            if (!bun) {
              return;
            }
            dispatch(createOrder(orderIds));
            openModal();
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
