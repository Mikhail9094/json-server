import { ReactNode } from "react";

export interface ModalProps {
  open: boolean;
  title?: string;
  onOkClick?: () => void;
  onClose: () => void;
  okButtonText?: string;
  cancelButtonText?: string;
  actionsVisible?: boolean;
  disablePortal?: boolean;
  children?: ReactNode;
}
