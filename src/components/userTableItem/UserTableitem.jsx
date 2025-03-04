import { useState } from "react";
import styles from "./userTableItem.module.scss";
const UserTableItem = ({ user }) => {
  const [isOpenVisitation, setIsOpenVisitation] = useState(false);
  const [isOpenUserData, setIsOpenUserData] = useState(false);
  
  const{email,phoneNumber,visitation,accountType,moneySpend,alias,accountCreate}=user
  const time= accountCreate.slice(0,10)+" "+accountCreate.slice(11,19);
  const {UserTableItem} = styles;
  return (
    <div>
      <p
        onClick={(e) => {
          e.target === e.currentTarget && setIsOpenUserData(!isOpenUserData);
        }}
      >
        {email} ^
      </p>
      <ul
        style={{
          display: isOpenUserData ? "block" : "none",
        }}
      >
        <li>{phoneNumber}</li>
        <li
          onClick={(e) => {
            e.target === e.currentTarget &&
              setIsOpenVisitation(!isOpenVisitation);
          }}
        >
          Visitation^
          <ul
            style={{
              display: isOpenVisitation ? "block" : "none",
            }}
          >
            {visitation.map((item,i) => {
              return (
                <li key={i}>
                  <p>Login:{item.login}</p>
                  <p>LogOut:{item.logout ? item.logout : "----"}</p>
                </li>
              );
            })}
          </ul>
        </li>
        <li>{accountType}</li>
        <li>{moneySpend}</li>
        <li>{alias}</li>
        <li>{time}</li>
      </ul>
    </div>
  );
};
export default UserTableItem;
