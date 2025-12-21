import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import OrderInfo from "../../components/OrderInfo/OrderInfo";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getOrderDetailsThunk } from "../../services/slices/orderDetailsSlice";

function FeedOrder() {
  const location = useLocation();
  const { number } = useParams();
  const orderNumber = Number(number);
  const dispatch = useAppDispatch();

  const isProfile = location.pathname.startsWith("/profile/orders");

  const { order, isLoading, error } = useAppSelector(
    (store) => store.orderDetails
  );

  const ingredients = useAppSelector((store) => store.ingredients.ingredients);

  const orders = useAppSelector((store) =>
    isProfile ? store.profileFeed.orders : store.feed.orders
  );

  const feedOrder = orders.find((el) => el.number === orderNumber);

  useEffect(() => {
    if (!feedOrder && !order) {
      dispatch(getOrderDetailsThunk(orderNumber));
    }
  }, [orderNumber, feedOrder, order, dispatch]);

  const orderToShow = feedOrder ?? order;

  return (
    <div>
      {orderToShow && (
        <OrderInfo order={orderToShow} ingredients={ingredients} />
      )}
    </div>
  );
}

export default FeedOrder;
