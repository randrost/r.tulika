import { Component } from '@angular/core';
import {Footer} from "../../common/footer/footer";
import {HomeContact} from "./home-contact/home-contact";
import {HomeExpertise} from "./home-expertise/home-expertise";
import {HomePlatforms} from "./home-platforms/home-platforms";
import {HomeShowcases} from "./home-showcases/home-showcases";
import {HomeAbout} from "./home-about/home-about";
import {HomeTop} from "./home-top/home-top";
import {FlexLayoutModule} from "ng-flex-layout";
import {FlexLayoutServerModule} from "ng-flex-layout/server";

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  animations: [],
  imports: [
    Footer,
    HomeContact,
    HomeExpertise,
    HomeShowcases,
    HomeAbout,
    HomeTop,
    FlexLayoutModule,
    FlexLayoutServerModule
  ],
  standalone: true,
})
export class Home {
}
