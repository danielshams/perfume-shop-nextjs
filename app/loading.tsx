import styles from "./_styles/Spinner.module.css";

function Spinner() {
  return (
    <div className={styles.spinnerContainer}>
      <span className={styles.loader}></span>
    </div>
  );
}

export default Spinner;
