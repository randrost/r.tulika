import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {FlexLayoutModule} from "ng-flex-layout";

@Component({
  selector: 'app-dialog-success',
  templateUrl: './dialog-success.html',
  styleUrls: ['./dialog-success.scss'],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    FlexLayoutModule
  ],
  standalone: true,
})
export class DialogSuccess {
  constructor(
    public dialogRef: MatDialogRef<DialogSuccess>,
    @Inject(MAT_DIALOG_DATA) public _mData: any
  ) {
  }

  onSubmit() {
    this.dialogRef.close(this._mData);
  }
}
