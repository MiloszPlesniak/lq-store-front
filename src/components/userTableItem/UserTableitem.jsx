import { useState } from "react";
import styles from "./userTableItem.module.scss";
const UserTableItem = ({ user }) => {
  const [isOpenVisitation, setIsOpenVisitation] = useState(false);
  const [isOpenUserData, setIsOpenUserData] = useState(false);

  const {
    email,
    phoneNumber,
    visitation,
    accountType,
    moneySpend,
    alias,
    accountCreate,
  } = user;
  const visitLastIndex=visitation.length

  
  const time = accountCreate.slice(0, 10) + " " + accountCreate.slice(11, 19);
  const { userTableItem,userTableItem__list,userTableItem__item } = styles;
  return (
    <li className={userTableItem}>
      <p
        onClick={(e) => {
          
          
          e.target === e.currentTarget && setIsOpenUserData(!isOpenUserData);
        }}
      >
      {email}
      </p>
      <ul
      className={userTableItem__list}
        style={{
          display: isOpenUserData ? "block" : "none",
        }}
      >
        <li className={userTableItem__item}>Numer Telefonu: {phoneNumber}</li>
        <li className={userTableItem__item}
          onClick={(e) => {
            e.target === e.currentTarget &&
              setIsOpenVisitation(!isOpenVisitation);
          }}
        >
          Odwiedziny
          <ul className={userTableItem__item}
            style={{
              display: isOpenVisitation ? "block" : "none",
            }}
          >
            {visitation.slice(visitLastIndex-10,visitLastIndex).map((item, i) => {
              return (
                <li key={i}>
                  <p>Login:{item.login}</p>
                  <p>LogOut:{item.logout ? item.logout : "----"}</p>
                </li>
              );
            })}
          </ul>
        </li>
        <li className={userTableItem__item}>Ranga: {accountType}</li>
        <li className={userTableItem__item}>Wydane środki: {moneySpend} zł</li>
        <li className={userTableItem__item}>NickName: {alias}</li>
        <li className={userTableItem__item}>Rejerstracja: {time}</li>
      </ul>
    </li>
  );
};
export default UserTableItem;
