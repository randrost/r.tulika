import {Component, Input, OnInit} from '@angular/core';
import {FlexLayoutModule} from "ng-flex-layout";
import {FlexLayoutServerModule} from "ng-flex-layout/server";

@Component({
  selector: 'app-expertise-item',
  templateUrl: './expertise-item.html',
  styleUrls: ['./expertise-item.scss'],
  imports: [
    FlexLayoutModule,
    FlexLayoutServerModule
  ],
  standalone: true
})
export class ExpertiseItem {
  @Input('jobType') set jobType(data: string) {
    if (data) {
      this._mJobType = data;
    }
  };

  @Input('parts') set parts(data: string[]) {
    if (data && data.length > 0) {
      this._mParts = data.join(" | ")
    }
  }

  @Input('isColored') set isColored(data: boolean) {
    if (data) {
      this._mIsColored = data
    }
  }

  _mParts: string = ""
  _mJobType: string = ""
  _mIsColored: boolean = false
}
