export interface Dialog {
  message: string;
  title?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export interface DialogService {
  dialog: Dialog | null;
  /* eslint-disable no-unused-vars */
  showDialog: (dialog: Dialog) => void;
  hideDialog: () => void;
}
