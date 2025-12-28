import { useAppSelector } from "../../hooks/redux";
import icon from "../../images/done.svg";
import { RootState } from "../../services/rootReducer";
import styles from "./OrderDetails.module.css";

function OrderDetails() {
  const { orderNumber, isLoading, error } = useAppSelector(
    (state: RootState) => state.order
  );

  return (
    <div className={styles.wrapper}>
      <p className="text text_type_digits-large">
        {isLoading ? "Ожидайте..." : error ? "Ошибка" : orderNumber}
      </p>
      {orderNumber !== null && (
        <p className={`text text_type_main-medium ${styles.orderCaption}`}>
          идентификатор заказа
        </p>
      )}
      {orderNumber !== null && (
        <img src={icon} alt={"Иконка подтверждения заказа"} />
      )}
      <p className={`text text_type_main-default ${styles.orderResult}`}>
        {error
          ? "Не удалось оформить заказ"
          : isLoading
          ? "Обработка заказа..."
          : "Ваш заказ начали готовить"}
      </p>
      <p className="text text_type_main-default text_color_inactive">
        {error
          ? "Попробуйте еще раз"
          : orderNumber
          ? "Дождитесь готовности на орбитальной станции"
          : null}
      </p>
    </div>
  );
}

export default OrderDetails;
