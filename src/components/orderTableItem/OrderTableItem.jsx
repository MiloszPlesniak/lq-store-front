import { useState } from "react";

import { useSelector } from "react-redux";
import { selectProductList } from "../../redux/products/selectors";
import { selectUsersList } from "../../redux/auth/selectors";
import { FaPlay } from "react-icons/fa";
import style from "./orderTableItem.module.scss";
import MixingPanel from "../mixingPanel/MixingPanel";

export const ordersProduct = (id, list) => {
  const searchedProduct = list.find((item) => item._id === id);

  return <span>{searchedProduct.brend + " " + searchedProduct.tastName}</span>;
};

const OrderTableItem = ({ order }) => {
  const {
    orderTableItem,
    orderTableItem__list,
    orderTableItem__item,
    orderTableItem__icon,
  } = style;
  const [isOpenOrder, setIsOpenOrder] = useState(false);
  const [isOpenTime, setIsOpenTime] = useState(false);
  const [isOpenProduct, setIsOpenProduct] = useState(false);
  const [mixingPanelIsOpen, setMixingPanelIsOpen] = useState(false);
  const productList = useSelector(selectProductList);
  const owner = useSelector(selectUsersList).find(
    (user) => user._id === order.ownerId
  );
  

 

  return (
    <li className={orderTableItem}>
      <FaPlay
        onClick={() => {
          setMixingPanelIsOpen(!mixingPanelIsOpen);
        }}
        className={orderTableItem__icon}
      />
      <p
        onClick={(e) => {
          e.target === e.currentTarget && setIsOpenOrder(!isOpenOrder);
        }}
      >
        {owner.email + " " + order.orderDate.create}
      </p>
      <ul
        className={orderTableItem__list}
        style={{
          display: isOpenOrder ? "block" : "none",
        }}
      >
        <li className={orderTableItem__item}>
          Status:{" " + order.orderStatus}
        </li>
        <li className={orderTableItem__item}>Wartość: {order.totalCost} zł</li>
        <li
          className={orderTableItem__item}
          onClick={(e) => {
            e.target === e.currentTarget && setIsOpenTime(!isOpenTime);
          }}
        >
          Czas
          <ul
            style={{
              display: isOpenTime ? "block" : "none",
            }}
          >
            <li>Złożono:{order.orderDate.create}</li>
            <li>
              Skompletowano:
              {order.orderDate.readyToColect
                ? order.orderDate.readyToColect
                : "---"}
            </li>
            <li>
              Dostarczono:
              {order.orderDate.collected ? order.orderDate.collectedt : "---"}
            </li>
          </ul>
        </li>

        <li
          className={orderTableItem__item}
          onClick={(e) => {
            e.target === e.currentTarget && setIsOpenProduct(!isOpenProduct);
          }}
        >
          Produkty:
          <ul
            style={{
              display: isOpenProduct ? "block" : "none",
            }}
          >
            {order.order.map((item,i) => {
              return <li key={i}>{ordersProduct(item.id, productList)}</li>;
            })}
          </ul>
        </li>
        <li className={orderTableItem__item}>{order.comment}</li>
      </ul>
      {mixingPanelIsOpen && (
        <MixingPanel order={order} setOpen={setMixingPanelIsOpen} />
      )}
    </li>
  );
};
export default OrderTableItem;
