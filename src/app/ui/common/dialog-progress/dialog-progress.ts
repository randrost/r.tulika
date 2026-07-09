import { Component, Inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import {MatIconModule} from "@angular/material/icon";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {FlexLayoutModule} from "ng-flex-layout";
import {DialogModelProgress} from "../../../types/model";
import {FlexLayoutServerModule} from "ng-flex-layout/server";

@Component({
  selector: 'app-dialog-progress',
  templateUrl: './dialog-progress.html',
  styleUrls: ['./dialog-progress.scss'],
  imports: [
    MatIconModule,
    MatProgressSpinnerModule,
    FlexLayoutModule,
    FlexLayoutServerModule
],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: true,
})
export class DialogProgress implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogProgress>,
    @Inject(MAT_DIALOG_DATA) public _mData: DialogModelProgress
  ) {}

  ngOnInit():void {}

  onSubmit() {
    this.dialogRef.close(this._mData);
  }
}
