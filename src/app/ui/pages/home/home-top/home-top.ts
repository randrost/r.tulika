import {Component, ElementRef, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {FlexLayoutModule} from 'ng-flex-layout';
import {
  ENTER_SCALE,
  TRANSITION_TEXT,
  TRANSITION_TEXT_ENTER
} from 'src/app/ui/animations/transitions/transitions.constants';
import {FlexLayoutServerModule} from "ng-flex-layout/server";
import {TranslatePipe, TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-home-top',
  templateUrl: './home-top.html',
  styleUrls: ['./home-top.scss'],
  animations: [
    TRANSITION_TEXT,
    TRANSITION_TEXT_ENTER,
    ENTER_SCALE
  ],
  imports: [
    FlexLayoutModule,
    FlexLayoutServerModule,
    TranslatePipe
  ],
  standalone: true
})
export class HomeTop implements OnInit {
  el = inject(ElementRef);
  private _translateService = inject(TranslateService);

  _mAnimTextEnded = false;

  titleParts: WritableSignal<{
    text: string,
  }[]> = signal([]);

  ngOnInit(): void {
    this._getTitleParts();

    this._translateService.onLangChange.subscribe(() => {
      this._getTitleParts();
    });
  }

  onTextAnimationEnd($event: any) {
    if ($event['toState'] == "in") {
      this._mAnimTextEnded = true;
    }
  }

  private _getTitleParts(): void {
    this._translateService.get('home.pages.top.title').subscribe((title: {
      text: string,
    }[]): void => {
      this.titleParts.set(title);
    });
  }
}
