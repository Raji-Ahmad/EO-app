import {inject, Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  public snackBar = inject(MatSnackBar);
  constructor() { }

    showSuccessToast(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }

  /**
   * Displays an error toast message.
   * @param message - The error message to be displayed.
   */
  showErrorToast(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000
    });
  }

}
