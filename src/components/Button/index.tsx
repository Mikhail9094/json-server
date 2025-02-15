import { ButtonProps } from "./types";
import styles from "./button.module.css";

export default function Button({ children, className = "", color = "", onClick }: ButtonProps) {
  return (
    <button className={`${styles.button} ${styles[color]} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}
