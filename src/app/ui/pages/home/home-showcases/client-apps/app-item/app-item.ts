import {Component, ElementRef, inject, Input, OnInit} from '@angular/core';
import {FlexLayoutModule} from "ng-flex-layout";
import {FlexLayoutServerModule} from "ng-flex-layout/server";
import {UiUtilsColor} from "../../../../../../core/utils/color.utils";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-app-item',
  templateUrl: './app-item.html',
  styleUrls: ['./app-item.scss'],
  imports: [
    FlexLayoutModule,
    FlexLayoutServerModule,
    TranslatePipe,
  ],
  standalone: true
})
export class AppItem implements OnInit {
  @Input('name') set name(data: string) {
    this._mName = data;
  };

  @Input('link') set link(data: string | undefined) {
    if (data) {
      this._mAppUrl = data
    }
  }

  @Input('image') set image(data: string | undefined) {
    this._mImage = data
  }

  @Input('color') set color(data: string | undefined) {
    if (data) {
      this._mColor = data
    }
  }

  el = inject(ElementRef);

  _mAppUrl: string = ""
  _mName: string = ""
  _mImage?: string
  _mColor: string = '#FFFFFF';

  ngOnInit(): void {
    this.bindColor();
  }

  bindColor() {
    var element = this.el.nativeElement
    element.style.setProperty('--app-primary', this._mColor);
    element.style.setProperty('--app-primary--rgb', UiUtilsColor.hexToRgb(this._mColor));
  }
}

export type AppItemType = {
  name: string;
  image?: string;
  link?: string;
  color?: string;
}
