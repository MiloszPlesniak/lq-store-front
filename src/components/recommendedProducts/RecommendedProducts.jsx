import styles from "./RecommendedProducts.module.scss";

const RecommendedProducts = ({ array }) => {
  const {
    products,
    products__list,
    products__item,
    products__box,
    products__img,
    products__textBox,
    products__brend,
    products__tast,
    products__listBox,
  } = styles;

  return (
    <section className={products}>
      <h4>Produkty które mogą ci się spodobać:</h4>
      <div className={products__listBox}>
        <ul className={products__list}>
          {array.map((item) => {
            return (
              <li className={products__item} key={item._id}>
                <figure className={products__box}>
                  <img className={products__img} src={item.imgUrl} alt="" />
                  <figcaption className={products__textBox}>
                    <h6 className={products__brend}>{item.brend}</h6>
                    <p className={products__tast}>{item.tastName}</p>
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
export default RecommendedProducts;