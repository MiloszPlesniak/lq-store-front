import style from "./adminPanel.module.scss";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getOrdersList } from "../../redux/orders/thunk";
import { getUsersList, refreshUser } from "../../redux/auth/thunk";
import { selectProductList } from "../../redux/products/selectors";
import { selectOrderList } from "../../redux/orders/selectors";
import { selectUsersList,selectUser } from "../../redux/auth/selectors";
import UserTableItem from "../../components/userTableItem/UserTableitem";
import ProductTableItem from "../../components/productTableItem/ProductTableItem";
import OrderTableItem from "../../components/orderTableItem/OrderTableItem";
import { getProductsList } from "../../redux/products/thunk";

const AdminPanel = () => {
  const { adminPanel, adminPanel__title, adminPanel__tableItem } = style;
  const [usersTable, setUsersTable] = useState(false);
  const [productsTable, setProductsTable] = useState(false);
  const [ordersTable, setOrdersTable] = useState(false);
  const dispatch = useDispatch();
  const user=useSelector(selectUser)
  const users = useSelector(selectUsersList);
  const products = useSelector(selectProductList);
  const orders = useSelector(selectOrderList);

  useEffect(() => {
    dispatch(refreshUser(user._id))
    dispatch(getUsersList());
    dispatch(getProductsList())
    dispatch(getOrdersList());
    
  }, [dispatch, user._id]);
 

  return (
    <>
      <div className={adminPanel}>
        <h1 className={adminPanel__title}>Admin Panell</h1>
        <div
          className={adminPanel__tableItem}
          onClick={(e) => {
            e.target === e.currentTarget && setUsersTable(!usersTable);
          }}
        >
          Użytkownicy
          <ul
            style={{
              display: usersTable ? "block" : "none",
            }}
          >
            {users.map((item, i) => {
              return <UserTableItem key={i} user={item} />;
            })}
          </ul>
        </div>
        <div
          className={adminPanel__tableItem}
          onClick={(e) => {
            e.target === e.currentTarget && setProductsTable(!productsTable);
          }}
        >
          Produkty
          <ul
            style={{
              display: productsTable ? "block" : "none",
            }}
          >
            {products.map((item, i) => {
              return <ProductTableItem key={i} product={item} />;
            })}
          </ul>
        </div>
        <div
          className={adminPanel__tableItem}
          onClick={(e) =>
            e.target === e.currentTarget && setOrdersTable(!ordersTable)
          }
        >
          Zamówienia
          <ul
            style={{
              display: ordersTable ? "block" : "none",
            }}
          >
            {orders.map((item, i) => {
              return <OrderTableItem key={i} order={item} />;
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
