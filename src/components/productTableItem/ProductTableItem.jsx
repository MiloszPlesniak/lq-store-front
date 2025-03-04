import { useState } from "react";
import { editProduct } from "../../redux/products/thunk";
import EditValueSettingsModal from "../editValueSettingsModal/EditValueSettingsModal";

import { useDispatch } from "react-redux";
// import { editProduct } from "../../redux/products/thunk";
const ProductTableItem = ({ product }) => {
  const [isOpenProductList, setIsOpenProductList] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const dispatch = useDispatch();
  // const dispatch = useDispatch();
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
    console.log(e.target);
  };

  const editProductFiles = (e) => {
    e.preventDefault();
    setIsOpenEditModal(false);
    // const objKey = e.target.children[0].children[0].name;
    // const objValue = e.target.children[10].children[0].value;
    // console.log({ [objKey]: objValue });
    const obj = {};
    for (let index = 0; index < e.target.children.length - 1; index++) {
      // console.log({
      //   [e.target.children[index].children[0].name]:
      //     e.target.children[index].children[0].value,
      // });
      if (e.target.children[index].children[0].value !== "") {
        obj[e.target.children[index].children[0].name] =
          e.target.children[index].children[0].value;
      }
    }

    console.log(true.toString());
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
    console.log(obj);
    const editObj = {
      product: obj,
      id: product._id,
    };
    dispatch(editProduct(editObj));
  };

  return (
    <div>
      <p
        onClick={(e) => {
          e.target === e.currentTarget &&
            setIsOpenProductList(!isOpenProductList);
        }}
      >
        {brend + " " + tastName} ^
      </p>
      <ul
        onClick={openModalEditFile}
        style={{
          display: isOpenProductList ? "block" : "none",
        }}
      >
        <li>
          <span>Marka: </span> {brend}
          <button type="button">Edit</button>
        </li>
        <li>
          <span>Nazwa smaku: </span> {tastName}
          <button type="button">Edit</button>
        </li>
        <li>
          <span>Profil Smakowy: </span> {profilTast}
          <button type="button">Edit</button>
        </li>
        <li>
          <span>Opis smaku: </span>
          {tastDescryption}
          <button type="button">Edit</button>
        </li>
        <li>
          <span>ilość w magazynie: </span>
          {quantityInStorage + " ml/szt"}
          <button type="button">Edit</button>
        </li>
        <li>
          <span data-change={"change"}>Dostąpny: </span>
          {visibility ? "Tak" : "Nie"}
          <button type="button">Edit</button>
        </li>
        <li>
          <span>Cena za 1 ml: </span>
          {priceForOneMl + " zł"}
          <button type="button">Edit</button>
        </li>
        <li>
          <span>Zalecana dawka: </span> {dosage + " %"}
          <button type="button">Edit</button>
        </li>
        <li>
          <span>Zdjęcie poglądowe PNG: </span>
          <a href={imgUrl}>{imgUrl}</a>
          <button type="button">Edit</button>
        </li>
        <li>
          <span data-change={"change"}>Popularny: </span>
          {popularity ? "Tak" : "Nie"}
          <button type="button">Edit</button>
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
    </div>
  );
};
export default ProductTableItem;
