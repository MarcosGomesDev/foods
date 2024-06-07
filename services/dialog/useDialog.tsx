"use client";

import { DialogService } from "./dialogTypes";
import { useDialogServiceZustand, useDialogZustand } from "./useDialogZustand";

export function useDialog(): DialogService["dialog"] {
  return useDialogZustand();
}

export function useDialogService(): Pick<
  DialogService,
  "showDialog" | "hideDialog"
> {
  return useDialogServiceZustand();
}
