import styles from "./editValueSettingsModal.module.scss";

const EditValueSettingsModal = ({ editFiles, product, closeModal }) => {
  const {
    modal,
    modal__form,
    modal__label,
    modal__file,
    modal__btn,
    modal__btnClose,
  } = styles;
  return (
    <div className={modal}>
      <form className={modal__form} onSubmit={editFiles}>
        {Object.keys(product).map((item, i) => {
          return (
            <label key={i} className={modal__label}>
              {item + ":"}
              <input
                name={item}
                className={modal__file}
                type="text"
                placeholder={`${Object.values(product)[i]}`}
              />
            </label>
          );
        })}
        <button className={modal__btn}>Save</button>
      </form>
      <button
        className={modal__btnClose}
        onClick={() => {
          closeModal(false);
        }}
      >
        +
      </button>
    </div>
  );
};
export default EditValueSettingsModal;
