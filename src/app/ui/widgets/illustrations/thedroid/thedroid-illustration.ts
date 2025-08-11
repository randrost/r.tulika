import {Component} from '@angular/core';
import {FlexLayoutModule} from "ng-flex-layout";
import {FlexLayoutServerModule} from "ng-flex-layout/server";

@Component({
  selector: 'app-thedroid-illustration',
  templateUrl: './thedroid-illustration.html',
  styleUrls: ['./thedroid-illustration.scss'],
  imports: [
    FlexLayoutModule,
    FlexLayoutServerModule
  ],
  standalone: true
})
export class ThedroidIllustration {}
