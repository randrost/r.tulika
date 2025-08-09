import {ScrollDispatcher, ViewportRuler} from '@angular/cdk/scrolling';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  NgZone,
  ViewChild
} from '@angular/core';
import {FlexLayoutModule, MediaChange, MediaObserver} from 'ng-flex-layout';
import {
  startWith,
  map,
  scan,
  distinctUntilChanged,
  takeWhile,
  switchMap,
  Observable
} from 'rxjs';
import {TRANSITION_TEXT, TRANSITION_IMAGE_SCALE} from 'src/app/ui/animations/transitions/transitions.constants';
import {MyAppsComponent} from "./my-apps/my-apps.component";
import {ClientAppsComponent} from "./client-apps/client-apps.component";
import {UiUtilsView} from "../../../../core/utils/views.utils";
import {FlexLayoutServerModule} from "ng-flex-layout/server";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {TranslatePipe} from "@ngx-translate/core";
import {AppItem} from "./client-apps/app-item/app-item.component";

@Component({
  selector: 'app-home-showcases',
  templateUrl: './home-showcases.component.html',
  styleUrls: ['./home-showcases.component.scss'],
  animations: [
    TRANSITION_TEXT,
    TRANSITION_IMAGE_SCALE
  ],
  imports: [
    MyAppsComponent,
    ClientAppsComponent,
    FlexLayoutModule,
    FlexLayoutServerModule,
    TranslatePipe,
  ],
  standalone: true
})
export class HomeShowcasesComponent implements AfterViewInit {
  readonly ICONS_2: string = "assets/img/icons/icon_set_2.png";
  readonly ICONS_2_XS = "assets/img/icons/icon_set_2_xs.png";

  mOnceAnimated = false;

  _mIcon2 = "assets/img/icons/icon_set_2.png";
  _mTriggerAnim? = 'false';
  _mThreshold = 0.2;

  clientApps: AppItem[] = [
    {
      id: "5131",
      name: "PepPlus: For Academic Growth",
      image: "assets/img/clients/pepplus.png",
      link: "https://play.google.com/store/apps/details?id=com.pepstudy.pepplus",
      tab: "Android",
      color: "#FFFFFF"
    },
    {
      id: "5132",
      name: "WhichOne Shop: Amazon Flipkart",
      image: "assets/img/clients/whichone.png",
      link: "https://play.google.com/store/apps/details?id=com.whichone",
      tab: "Flutter"
    },
    {
      id: "5133",
      name: "Aabboo - Anonymous Chat Rooms",
      image: "assets/img/clients/aabboo.png",
      link: "https://play.google.com/store/apps/details?id=com.aabboo.social",
      tab: "Android"
    }
  ];

  @ViewChild('animRefView') vAnimRefView?: ElementRef<HTMLElement>;

  private _destroyRef = inject(DestroyRef);

  constructor(
    public el: ElementRef,
    private _ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    public mediaObserver: MediaObserver,
    private scroll: ScrollDispatcher,
    private viewPortRuler: ViewportRuler,
  ) {
    this.mediaObserver.asObservable().subscribe((mediaChange: MediaChange[]) => {
      if (mediaChange.length > 0) {
        if (mediaChange[0].mqAlias == "xs") {
          this._mIcon2 = this.ICONS_2_XS
        } else {
          this._mIcon2 = this.ICONS_2
        }
      }
    });
  }

  ngAfterViewInit(): void {
    this.setupAnimation();
  }

  setupAnimation(): void {
    if (!this.vAnimRefView) return;

    this.scroll.ancestorScrolled(this.vAnimRefView, 100).pipe(
      takeUntilDestroyed(this._destroyRef),
      startWith(0),
      map(() => UiUtilsView.getVisibility(this.vAnimRefView!, this.viewPortRuler)),
      scan((acc, val) => val >= this._mThreshold || (acc ? val > 0 : false), false),
      distinctUntilChanged(),
      takeWhile(trigger => !trigger || !this.mOnceAnimated, true),
      switchMap(trigger => new Observable(observer => this._ngZone.run(() => observer.next(trigger))))
    ).subscribe(val => {
      if (this.mOnceAnimated) return;
        if (val) {
        this.mOnceAnimated = true;
        this._mTriggerAnim = 'true';
        this.cdr.detectChanges();
        }
    });
  }
}
