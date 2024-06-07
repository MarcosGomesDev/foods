"use client";

import { useDialog, useDialogService } from "@/services";
import { AlertDialog, AlertDialogContent } from "../ui/alert-dialog";
import { DialogContent } from "./components";

export function Dialog() {
  const dialog = useDialog();
  const { hideDialog } = useDialogService();

  if (!dialog) {
    return null;
  }

  return (
    <AlertDialog open={dialog ? true : false} onOpenChange={hideDialog}>
      <AlertDialogContent>
        <DialogContent dialog={dialog} />
      </AlertDialogContent>
    </AlertDialog>
  );
}
