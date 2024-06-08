import styles from "./SuccessDialog.module.css";

import PropTypes from "prop-types";

const SuccessDialog = ({ message, onClose }) => {
  return (
    <div className={styles.dialogOverlay}>
      <div className={styles.dialog}>
        <p>{message}</p>
        <div className={styles.dialogActions}>
          <button onClick={onClose}>OK</button>
        </div>
      </div>
    </div>
  );
};

SuccessDialog.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SuccessDialog;
