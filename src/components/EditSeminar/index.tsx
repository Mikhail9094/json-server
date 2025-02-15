import React, { useState } from "react";
import styles from "./editSeminar.module.css";
import { EditSeminarProps } from "./types";
import { useUpdateSeminar } from "../../hooks/useUpdateSeminar";
import Button from "../Button";

export default function EditSeminar({ seminar, closeModal }: EditSeminarProps) {
  const [seminarData, setSeminarData] = useState({
    title: seminar.title,
    description: seminar.description,
    date: seminar.date,
    time: seminar.time,
    photo: seminar.photo,
  });
  // преобразуем дату из input c type="date" в нужный формат
  function formatDate(dateString: string) {
    const [year, month, day] = dateString.split("-");
    return `${day}.${month}.${year}`;
  }

  const { mutate: update } = useUpdateSeminar();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type == "date") {
      setSeminarData((prev) => ({
        ...prev,
        date: formatDate(value),
      }));
    } else {
      setSeminarData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    update({ ...seminar, ...seminarData });
    closeModal();
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <label>
          Название:
          <input
            type="text"
            name="title"
            value={seminarData.title}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Описание:
          <textarea
            name="description"
            value={seminarData.description}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Дата:
          <input type="date" name="date" onChange={handleChange} required />
        </label>
        <label>
          Время:
          <input
            type="time"
            name="time"
            value={seminarData.time}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Фото URL:
          <input
            type="text"
            name="photo"
            value={seminarData.photo}
            onChange={handleChange}
            required
          />
        </label>
        <div className={styles.buttons}>
          <Button type="button" onClick={closeModal} color="secondary">
            Отмена
          </Button>
          <Button type="submit">Сохранить</Button>
        </div>
      </form>
    </div>
  );
}
