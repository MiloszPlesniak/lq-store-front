import { useDispatch, useSelector } from "react-redux";
import { selectUser, selectUserId } from "../../redux/auth/selectors";
import { Link } from "react-router-dom";
import styles from "./SideMenu.module.scss";
import { logOut } from "../../redux/auth/thunk";
import { IoIosArrowForward } from "react-icons/io";
import { toggleSideMenu } from "../../redux/settings/slice";
const SideMenu = () => {
  const {
    sideMenu,
    sideMenu__box,
    sideMenu__header,
    sideMenu__welcome,
    sideMenu__item,
    sideMenu__list,
    sideMenu__logOutBtn,
    sideMenu__menuCloseBtn,
  } = styles;

  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const nickname = useSelector(selectUser).alias;
  const rank = useSelector(selectUser).accountType;
  
  
  const logOutHandler = () => {
    dispatch(logOut(userId));
  };
  const closeMenuHandler = (e) => {
    e.stopPropagation();
    if (e.target.tagName === "A") {
      dispatch(toggleSideMenu());
    }
    if (e.target === e.currentTarget) {
      dispatch(toggleSideMenu());
    }
  };
  return (
    <div onClick={closeMenuHandler} className={sideMenu}>
      <div className={sideMenu__box}>
        <div className={sideMenu__header}>
          <p className={sideMenu__welcome}>Cześć {nickname} 👋</p>
          <button className={sideMenu__menuCloseBtn} onClick={closeMenuHandler}>
            X
          </button>
        </div>

        <ul onClick={closeMenuHandler} className={sideMenu__list}>
          <li className={sideMenu__item}>
            <Link to={"/account/user"}>Twoje Konto</Link> <IoIosArrowForward />
          </li>
          <li className={sideMenu__item}>
            <Link to={"/account/orders"}>Zamówienia</Link> <IoIosArrowForward />
          </li>
          <li className={sideMenu__item}>
            <Link to={"/account/user"}>Dane klienta</Link> <IoIosArrowForward />
          </li>
          <li className={sideMenu__item}>
            <Link to={"/account/preferences"}>Preferencje</Link>
            <IoIosArrowForward />
          </li>
          <li className={sideMenu__item}>
            <Link to={"/account/faq"}>FAQ</Link> <IoIosArrowForward />
          </li>
          <li className={sideMenu__item}>
            <Link to={"/account/shopingCart"}>Koszyk</Link>{" "}
            <IoIosArrowForward />
          </li>
          {rank === "GOD" ? (
            <li className={sideMenu__item}>
              <Link to={"/account/adminPanel"}>settings</Link>{" "}
              <IoIosArrowForward />
            </li>
          ) : null}
        </ul>
        <button
          className={sideMenu__logOutBtn}
          onClick={(e) => {
            logOutHandler();
            closeMenuHandler(e);
          }}
        >
          Wyloguj się
        </button>
      </div>
    </div>
  );
};
export default SideMenu;
