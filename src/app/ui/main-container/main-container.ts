import {Component, inject, ChangeDetectionStrategy} from '@angular/core';
import {ENTER_FORM_TOP} from "../animations/transitions/transitions.constants";
import {FlexLayoutModule} from "ng-flex-layout";
import {RouterLink, RouterOutlet} from "@angular/router";
import {MatRipple} from "@angular/material/core";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";

import {FlexLayoutServerModule} from "ng-flex-layout/server";
import { MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatTooltipModule} from "@angular/material/tooltip";
import {TranslatePipe, TranslateService} from "@ngx-translate/core";
import {Footer} from "../common/footer/footer";

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.html',
  styleUrls: ['./main-container.scss'],
  animations: [
    ENTER_FORM_TOP
  ],
    imports: [
    FlexLayoutModule,
    FlexLayoutServerModule,
    RouterOutlet,
    MatRipple,
    MatSidenavModule,
    MatToolbarModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    MatTooltipModule,
    TranslatePipe,
    Footer
],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: true
})
export class MainContainer {
  private _translateService: TranslateService = inject(TranslateService)

  setLanguage(lang: string): void {
    this._translateService.use(lang);
  }
}
