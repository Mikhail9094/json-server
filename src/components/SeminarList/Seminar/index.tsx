import { useState } from "react";
import { useDeleteSeminar } from "../../../hooks/useDeleteSeminar";
import styles from "./seminarCard.module.css";
import { SeminarProps } from "./types";
import Modal from "../../Modal";
import EditSeminar from "../../EditSeminar";
import Button from "../../Button";

function Seminar({ seminar }: SeminarProps) {
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalСonfirm, setShowModalСonfirm] = useState(false);
  const { mutate: onDelete } = useDeleteSeminar();

  const handlerOkClickModalСonfirm = () => {
    onDelete(seminar.id);
    setShowModalСonfirm(false);
  };

  const toggleModalСonfirm = () => {
    setShowModalСonfirm((prev) => !prev);
  };

  const toggleModalEdit = () => {
    setShowModalEdit((prev) => !prev);
  };

  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <img src={seminar.photo} alt={seminar.title} />
      </div>
      <div className={styles.info}>
        <div className={styles.text}>
          <h2 className={styles.title}>{seminar.title}</h2>
          <p className={styles.description}>{seminar.description}</p>
          <p className={styles.dateTime}>
            Дата: {seminar.date} | Время: {seminar.time}
          </p>
        </div>
        <div className={styles.buttons}>
          <Button className={styles.con} onClick={toggleModalСonfirm} color="secondary">
            Удалить
          </Button>
          <Button className={styles.edit} onClick={toggleModalEdit}>
            Редактировать
          </Button>
        </div>
      </div>

      <Modal open={showModalEdit} title="Редактирование семинара" onClose={toggleModalEdit}>
        <EditSeminar seminar={seminar} closeModal={toggleModalEdit} />
      </Modal>

      <Modal
        open={showModalСonfirm}
        title="Вы уверены что хотите удалить этот семинар?"
        onOkClick={handlerOkClickModalСonfirm}
        onClose={toggleModalСonfirm}
        actionsVisible
      />
    </div>
  );
}

export default Seminar;
