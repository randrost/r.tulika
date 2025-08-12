import {Component, Input,} from '@angular/core';
import {AppType} from 'src/app/types/apps_type';
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {FlexLayoutModule} from "ng-flex-layout";
import {FlexLayoutServerModule} from "ng-flex-layout/server";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-myapp-item',
  templateUrl: './myapp-item.html',
  styleUrls: ['./myapp-item.scss'],
  imports: [
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    // RecaptchaV3Module,
    MatIconModule,
    FlexLayoutModule,
    FlexLayoutServerModule,
    TranslatePipe,
  ],
  standalone: true
})
export class MyappItem {
  _mModel?: AppType;

  @Input('data') set model(data: AppType) {
    this._mModel = data;
  };
}
