import styles from "./ConfirmDialog.module.css";

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

export default ConfirmDialog;
