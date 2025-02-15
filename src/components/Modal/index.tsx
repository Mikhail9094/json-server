import React from "react";
import { ModalProps } from "./types";
import styles from "./styles.module.css";
import { createPortal } from "react-dom";
import Button from "../Button";

const Modal: React.FC<ModalProps> = ({
  children,
  okButtonText,
  cancelButtonText,
  actionsVisible,
  onClose,
  open,
  title,
  onOkClick,
  disablePortal,
}) => {
  if (!open) return null;

  const closeHandler = () => {
    if (!onClose) return;
    onClose();
  };

  const render = () => (
    <>
      <div className={styles.backdrop} onClick={closeHandler}></div>

      <div className={styles.modal}>
        <div className={styles.title}>
          <h2>{title}</h2>
        </div>
        <div>{children}</div>
        {actionsVisible && (
          <div className={styles.actionsBlock}>
            <Button onClick={closeHandler} color="secondary">
              {cancelButtonText || "Cancel"}
            </Button>
            <Button onClick={onOkClick}>{okButtonText || "OK"}</Button>
          </div>
        )}
      </div>
    </>
  );

  if (disablePortal) return render();

  const root = document.getElementById("root");
  if (!root) return null;

  return createPortal(render(), root);
};

export default Modal;
