import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogSuccessComponent } from './dialog-success/dialog-success.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { SharedModule } from '../../@shared/shared.module';



@NgModule({
  declarations: [
    DialogSuccessComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  exports: [
    DialogSuccessComponent   
  ]
})
export class SuccessModule { }
