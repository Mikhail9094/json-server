import { ISeminar } from "../SeminarList/types";

export interface EditSeminarProps {
  seminar: ISeminar;
  closeModal: () => void;
}
