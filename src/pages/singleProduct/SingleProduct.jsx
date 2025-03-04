import { useLocation } from "react-router-dom";
import { throttle } from "lodash";
import clsx from "clsx";
import styles from "./SingleProduct.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { LuShoppingCart } from "react-icons/lu";
import { FaArrowRight, FaCheck } from "react-icons/fa";
import { getProduct, getProductsList } from "../../redux/products/thunk";
import { calculateProduct } from "../../redux/products/thunk";
import { addToCart } from "../../redux/orders/slice";
import {
  selectProduct,
  selectPrice,
  selectProductList,
  selectIsLoading,
} from "../../redux/products/selectors";
import RecommendedProducts from "../../components/recommendedProducts/RecommendedProducts";
const SingleProduct = () => {
  const {
    buySection,
    buySection__img,
    buyForm__price,
    buySection__tastName,
    buySection__brend,
    buyForm,
    buyForm__range,
    buyForm__select,
    buyForm__priceBox,
    buyForm__btn,
    buyForm__buy,
    buyForm__toggle,
    buyForm__nicType,
    aboutProduct,
    aboutProduct__title,
    aboutProduct__text,
  } = styles;
  const product = useSelector(selectProduct);
  const { pathname } = useLocation();
  const productId = pathname.replace("/products/", "");
  const [power, setPower] = useState(12);
  const [aroma, setAroma] = useState(0);
  const [rotation, setRotation] = useState(-180);
  const [buyAnimation,setBuyAnimation]=useState(false);
  const dispatch = useDispatch();
  const price = useSelector(selectPrice);
  const isLoading = useSelector(selectIsLoading);
  const productList = useSelector(selectProductList);

  const popularProduct = productList.filter((item) => item.popularity); //filtrujemy produkty, które są popularne

  const onChangehandler = async (e) => {
    // funkcja, która pobiera dane z formularza i wysyła je do serwera
    const ingr = {
      id: productId,
      size: e.target.form.ml.value,
      power: e.target.form.power.value,
      amount: 1,
      nicotineType: e.target.form.nicotineType.checked ? "zasada" : "sól",
      dosage: e.target.form.aroma.value,
    };
    try {
      dispatch(calculateProduct(ingr));
    } catch (error) {
      console.log(error, "d");
    }
  };
  //definiujemy funkcję throttle, która będzie wywoływać funkcję onChangehandler co 2 sekundy
  const onChangehandlerThrottled = useRef(throttle(onChangehandler, 2000));
  //definiujemy funkcję, która będzie wywoływać funkcję onChangehandlerThrottled
  const onChangehandlerThrottledReff = async (e) => {
    await onChangehandlerThrottled.current(e);
  };
  //pobieramy dane produktu z serwera
  useEffect(() => {
    setAroma(0);
    // dispatch(getProductsList());????????
    console.log("efect");
    
    dispatch(getProduct(productId));
    dispatch(
      calculateProduct({
        id: productId,
        size: 10,
        power: 12,
        amount: 1,
        nicotineType: "sól",
        dosage: Number(product.dosage),
      })
    );
  }, [dispatch, product.dosage, productId]);

  const toggleRotation = () => {
    setRotation((prevRotation) => prevRotation + 180);
  };

  
  const submitHandler = (e) => {
    
    e.preventDefault();
    const item = {
      img: product.imgUrl,
      tastName: product.tastName,
      brend: product.brend,
      id: productId,
      key: Math.random(),
      amount: 1,
      power: power,
      size: e.target.ml.value,
      dosage: aroma,
      price: price.priceForOneBottle.sum,
      nicotineType: e.target.nicotineType.checked ? "zasada" : "sól",
    };
    
    
    
    
    dispatch(addToCart(item));
   
    setBuyAnimation(true)
    setTimeout(() => {setBuyAnimation(false)}, 1600);
  };
  
console.log(aroma);

  return (
    <div>
      <section className={buySection}>
        <img
          className={buySection__img}
          src={product.imgUrl}
          alt={product.tastName}
        />

        <div>
          <h4 className={buySection__brend}>{product.brend}</h4>
          <h5 className={buySection__tastName}>{product.tastName}</h5>
          <form
            onSubmit={submitHandler}
            onChange={onChangehandlerThrottledReff}
            className={buyForm}
          >
            <label className={buyForm__range} htmlFor="power">
              Moc (mg) {power}
              <input
                onChange={(e) => {
                  setPower(e.target.value);
                }}
                type="range"
                name="power"
                min="0"
                max="50"
                defaultValue={12}
              />
              Aromat (%) {aroma}
              <input
                onChange={(e) => {
                  setAroma(e.target.value);
                }}
                type="range"
                name="aroma"
                min="5"
                max="30"
                defaultValue={aroma}
              />
            </label>
            <label className={buyForm__nicType} htmlFor="nicotineType">
              <span>Sól</span>
              <div className={buyForm__toggle}>
                <FaArrowRight
                  style={{
                    transform: `rotate(${rotation}deg)`,
                    transition: "transform 0.3s",
                  }}
                />
                <input
                  type="checkbox"
                  name="nicotineType"
                  id="toggleCheckbox"
                  onClick={toggleRotation}
                />
              </div>

              <span>Zasada</span>
            </label>
            <label className={buyForm__select} htmlFor="ml">
              <div>
                <input type="radio" name="ml" value={10} defaultChecked />
                <span>10ml</span>
              </div>
              <div>
                <input type="radio" name="ml" value={30} />
                <span>30ml</span>
              </div>
              <div>
                <input type="radio" name="ml" value={60} />
                <span>60ml</span>
              </div>
            </label>
            {aroma < 1? <p>Wybierz ilość aromatu zalecana ilość {product.dosage}% </p>:(price.priceForOneBottle ? (
              <div className={buyForm__priceBox}>
                <p className={buyForm__price}>
                  {price.priceForOneBottle ? price.priceForOneBottle.sum : "-"}
                </p>
                <button
                  disabled={isLoading ? true : false}
                  className={buyForm__btn}
                  type="submit"
                >
                  <LuShoppingCart color="#fff" size={25} />
                  <div className={clsx(buyForm__btn,buyAnimation&&buyForm__buy)} >
                    <FaCheck color="#fff" size={25} />
                  </div>
                </button>
              </div>
            ) : (
              <p>Brak w Magazynie </p>
            ))}
          </form>
        </div>
      </section>
      <section className={aboutProduct}>
        <h2 className={aboutProduct__title}>Opis produktu</h2>
        <p className={aboutProduct__text}>{product.tastDescryption}</p>
      </section>
      <RecommendedProducts array={popularProduct} />
    </div>
  );
};

export default SingleProduct;
