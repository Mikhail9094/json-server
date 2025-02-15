import { toast } from "react-toastify";
import { useSeminarsQuery } from "../../hooks/useSeminarsQuery";
import Seminar from "./Seminar";
import styles from "./seminarList.module.css";

function SeminarList() {
  const { data: seminars, isLoading, isError, isSuccess } = useSeminarsQuery();

  if (isLoading) {
    return <div style={{ textAlign: "center", padding: "10px" }}>Загрузка...</div>;
  }

  if (isError) {
    toast.error("Ошибка при загрузке данных!");
  }

  return (
    <div className={styles["seminar-list"]}>
      <h1 className={styles.title}>Семинары</h1>
      <div className={styles.list}>
        {isSuccess && seminars.map((seminar) => <Seminar seminar={seminar} key={seminar.id} />)}
      </div>
    </div>
  );
}

export default SeminarList;
