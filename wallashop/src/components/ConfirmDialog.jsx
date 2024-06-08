import styles from "./ConfirmDialog.module.css";

import PropTypes from "prop-types";

const ConfirmDialog = ({ message, onConfirm, onCancel }) => {
  return (
    <div className={styles.dialogOverlay}>
      <div className={styles.dialog}>
        <p>{message}</p>
        <div className={styles.dialogActions}>
          <button onClick={onConfirm}>Yes</button>
          <button onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
};

ConfirmDialog.propTypes = {
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ConfirmDialog;
