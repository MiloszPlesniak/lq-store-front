import styles from "./MixingPanel.module.scss";
import { useSelector } from "react-redux";
import { selectProductList } from "../../redux/products/selectors";

const MixingPanel = ({ order, setOpen }) => {
  const products = useSelector(selectProductList);

  const {
    mixingPanel,
    mixingPanel__list,
    mixingPanel__item,
    mixingPanel__img,
    mixingPanel__closeBtn,
   
  } = styles;
  return (
    <div className={mixingPanel}>
      <ul className={mixingPanel__list}>
        <li className={mixingPanel__item}>
          <div className={mixingPanel__img}></div>
          <span>Marka</span>
          <span>Smak</span>
          <span>Moc</span>
          <span>% aromat</span>
          <span>Pojemność</span>
          <span>Aromat</span>
          <span>Nikotyna</span>
          <span>Baza</span>
          <span>Cena</span>
          <div
        className={mixingPanel__closeBtn}
        onClick={() => {
          setOpen(false);
        }}
      >
        +
      </div>
        </li>
        {order.order.map((item, i) => {
          
          const { imgUrl, tastName, brend } = products.find(
            (prod) => prod._id === item.id
          );

          return (
            <li key={i} className={mixingPanel__item}>
              <img src={imgUrl} alt={tastName} className={mixingPanel__img} />

              <span>{brend}</span>
              <span>{tastName}</span>
              <span>{item.power + "mg " + item.nicotineType}</span>
              <span>{item.dosage}</span>
              <span>{item.size + "ml"}</span>
              <span>{item.cost.amoundOfProducts.aroma+" mlA"}</span>
              <span>{item.cost.amoundOfProducts.nicotine+" mlN"}</span>
              <span>{item.cost.amoundOfProducts.base+" mlB"}</span>
              <span>{item.cost.priceForOneBottle.sum}zł</span>
            </li>
          );
        })}
      </ul>
      <p>Total {order.comment}</p>
      
    </div>
  );
};
export default MixingPanel;
