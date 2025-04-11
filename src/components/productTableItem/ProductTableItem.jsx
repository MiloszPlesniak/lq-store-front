import { useState } from "react";
import { editProduct } from "../../redux/products/thunk";
import EditValueSettingsModal from "../editValueSettingsModal/EditValueSettingsModal";
import styles from "./productTableItem.module.scss";
import { useDispatch } from "react-redux";
import { FaEdit } from "react-icons/fa";
// import { editProduct } from "../../redux/products/thunk";
const ProductTableItem = ({ product }) => {
  const [isOpenProductList, setIsOpenProductList] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const dispatch = useDispatch();

  const { productTableItem, productTableItem__list, productTableItem__item } =
    styles;
  const {
    brend,
    tastName,
    profilTast,
    tastDescryption,
    quantityInStorage,
    visibility,
    priceForOneMl,
    dosage,
    imgUrl,
    popularity,
  } = product;

  const openModalEditFile = (e) => {
    
    e.preventDefault();
    setIsOpenEditModal(true);
    
  };

  const editProductFiles = (e) => {
    e.preventDefault();
    setIsOpenEditModal(false);
    
    const obj = {};
    for (let index = 0; index < e.target.children.length - 1; index++) {
     
      if (e.target.children[index].children[0].value !== "") {
        obj[e.target.children[index].children[0].name] =
          e.target.children[index].children[0].value;
      }
    }

    switch (obj.popularity) {
      case "true":
        obj.popularity = true;
        break;
      case "false":
        obj.popularity = false;
        break;

      default:
        break;
    }
    switch (obj.visibility) {
      case "true":
        obj.visibility = true;
        break;
      case "false":
        obj.visibility = false;
        break;

      default:
        break;
    }

    const editObj = {
      product: obj,
      id: product._id,
    };
    dispatch(editProduct(editObj));
  };

  return (
    <li className={productTableItem}>
      <p
        onClick={(e) => {
          e.target === e.currentTarget &&
            setIsOpenProductList(!isOpenProductList);
        }}
      >
        {brend + " " + tastName}
        <button onClick={openModalEditFile} type="button">
          <FaEdit/>
        </button>
      </p>
      <ul
        className={productTableItem__list}
        style={{
          display: isOpenProductList ? "block" : "none",
        }}
      >
        <li className={productTableItem__item}>
          <span>Marka: </span> {brend}
        </li>
        <li className={productTableItem__item}>
          <span>Nazwa smaku: </span> {tastName}
        </li>
        <li className={productTableItem__item}>
          <span>Profil Smakowy: </span> {profilTast}
        </li>
        <li className={productTableItem__item}>
          <span>Opis smaku: </span>
          {tastDescryption}
        </li>
        <li className={productTableItem__item}>
          <span>ilość w magazynie: </span>
          {quantityInStorage + " ml/szt"}
        </li>
        <li className={productTableItem__item}>
          <span data-change={"change"}>Dostąpny: </span>
          {visibility ? "Tak" : "Nie"}
        </li>
        <li className={productTableItem__item}>
          <span>Cena za 1 ml: </span>
          {priceForOneMl + " zł"}
        </li>
        <li className={productTableItem__item}>
          <span>Zalecana dawka: </span> {dosage + " %"}
        </li>
        <li className={productTableItem__item}>
          <span>Zdjęcie poglądowe PNG: </span>
          <a href={imgUrl}>{imgUrl}</a>
        </li>
        <li className={productTableItem__item}>
          <span data-change={"change"}>Popularny: </span>
          {popularity ? "Tak" : "Nie"}
        </li>
      </ul>
      {isOpenEditModal && (
        <EditValueSettingsModal
          setisopen={setIsOpenEditModal}
          product={product}
          editFiles={editProductFiles}
          closeModal={setIsOpenEditModal}
        />
      )}
    </li>
  );
};
export default ProductTableItem;
