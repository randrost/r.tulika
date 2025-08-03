import { Component, Inject, OnInit } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { DialogModelProgress } from '../model';

@Component({
  selector: 'app-dialog-progress',
  templateUrl: './dialog-progress.component.html',
  styleUrls: ['./dialog-progress.component.scss']
})
export class DialogProgressComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogProgressComponent>,
    @Inject(MAT_DIALOG_DATA) public _mData: DialogModelProgress
  ) {}

  ngOnInit():void {}

  onSubmit() {
    this.dialogRef.close(this._mData);
  }

}
