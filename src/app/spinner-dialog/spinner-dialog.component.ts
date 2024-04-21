import {Component, Inject} from '@angular/core';
import {
  MatDialogContent,
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogTitle,
  MatDialogActions,
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-spinner-dialog',
  standalone: true,
  imports: [MatDialogContent,
    MatDialogClose, MatDialogTitle, MatButton, MatDialogActions, MatProgressSpinner,],
  templateUrl: './spinner-dialog.component.html',
  styleUrl: './spinner-dialog.component.scss'
})
export class SpinnerDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {question: string}) {
  }
}
