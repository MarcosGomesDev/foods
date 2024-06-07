import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Dialog } from "@/services/dialog/dialogTypes";

interface DialogContentProps {
  dialog: Dialog;
}

export function DialogContent({ dialog }: DialogContentProps) {
  return (
    <>
      <AlertDialogHeader>
        {dialog.title && <AlertDialogTitle>{dialog.title}</AlertDialogTitle>}
        <AlertDialogDescription>{dialog.message}</AlertDialogDescription>
      </AlertDialogHeader>
      {dialog.onCancel || dialog.onConfirm ? (
        <AlertDialogFooter>
          {dialog.onCancel && (
            <AlertDialogCancel
              onClick={dialog.onCancel}
              className="border-gray-600 hover:bg-black hover:text-white"
            >
              Cancelar
            </AlertDialogCancel>
          )}
          {dialog.onConfirm && (
            <AlertDialogAction onClick={dialog.onConfirm}>
              Confirmar
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      ) : (
        <></>
      )}
    </>
  );
}
