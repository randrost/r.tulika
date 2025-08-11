import {Component} from '@angular/core';
import {FlexLayoutModule} from "ng-flex-layout";
import {FlexLayoutServerModule} from "ng-flex-layout/server";

@Component({
  selector: 'app-junkielabs-illustration',
  templateUrl: './junkielabs-illustration.html',
  styleUrls: ['./junkielabs-illustration.scss'],
  imports: [
    FlexLayoutModule,
    FlexLayoutServerModule
  ],
  standalone: true
})
export class JunkielabsIllustration {}
