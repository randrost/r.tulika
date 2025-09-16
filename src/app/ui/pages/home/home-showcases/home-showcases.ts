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
import {MyApps} from "./my-apps/my-apps";
import {ClientApps} from "./client-apps/client-apps";
import {UiUtilsView} from "../../../../core/utils/views.utils";
import {FlexLayoutServerModule} from "ng-flex-layout/server";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {TranslatePipe} from "@ngx-translate/core";
import {AppType} from "../../../../types/apps_type";

@Component({
  selector: 'app-home-showcases',
  templateUrl: './home-showcases.html',
  styleUrls: ['./home-showcases.scss'],
  animations: [
    TRANSITION_TEXT,
    TRANSITION_IMAGE_SCALE
  ],
  imports: [
    MyApps,
    FlexLayoutModule,
    FlexLayoutServerModule,
    TranslatePipe,
  ],
  standalone: true
})
export class HomeShowcases implements AfterViewInit {
  readonly ICONS_2: string = "assets/img/icons/icon_set_2.png";
  readonly ICONS_2_XS = "assets/img/icons/icon_set_2_xs.png";

  mOnceAnimated = false;

  _mIcon2 = "assets/img/icons/icon_set_2.png";
  _mTriggerAnim? = 'false';
  _mThreshold = 0.2;

  // clientApps: AppItemType[] = [
  //   {
  //     name: "Inframan: IIoT Devices Management",
  //     image: "assets/img/clients/inframan.jpg",
  //     link: "https://www.linkedin.com/posts/narz_audako-inframan-unsere-l%C3%B6sung-f%C3%BCr-smarte-activity-7267834202534920194-hTNJ?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEXbLc0Bkn493tLHsy0mxwhT8Kh1QbwWwTM",
  //     color: "#FFFFFF"
  //   },
  //   {
  //     name: "audako: Modern Process Control System",
  //     image: "assets/img/clients/audako2.png",
  //     link: "https://www.narz.net/leistungen/audako-plattform",
  //   },
  //   {
  //     name: "License Manager: License Management for Software",
  //   },
  //   {
  //     name: "IIoT Configurator: Full Stack IIoT Solution",
  //     image: "assets/img/clients/iot.jpg",
  //   },
  // ];

  contributedApps: AppType[] = [
    // {
    //   name: "Licendra: Enterprise Multitenant Licensing",
    //   image: "assets/img/apps/licendra_com.png",
    //   link: "",
    //   tab: "Web and Android",
    //   caption: "In Angular & Ionic -",
    //   isFull: false,
    //   inDevelopment: true,
    //   primary: "#3FD67D",
    //   background: "#E1E1E1"
    // },
    // {
    //   name: "LLems: AI Powered Trading Bot",
    //   image: "assets/img/apps/llems_net.png",
    //   link: "",
    //   tab: "Android",
    //   isFull: false,
    //   inDevelopment: true,
    //   caption: "In Flutter -",
    //   background: "#F5E7B4"
    // },
    // {
    //   name: "Zyppins Haus: Gastronomy and Hospitality",
    //   image: "assets/img/apps/zyppins_haus.png",
    //   link: "",
    //   tab: "Web",
    //   caption: "In Angular -",
    //   isFull: true,
    //   inDevelopment: true,
    //   background: "#3CE79F"
    // }

    {
      name: "Inframan: IIoT Devices Management",
      image: "assets/img/clients/inframan.jpg",
      link: "https://www.linkedin.com/posts/narz_audako-inframan-unsere-l%C3%B6sung-f%C3%BCr-smarte-activity-7267834202534920194-hTNJ?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEXbLc0Bkn493tLHsy0mxwhT8Kh1QbwWwTM",
      tab: "Web and Android",
      caption: "In Angular -",
      isFull: false,
      primary: "#3FD67D",
      showShadow: true,
      background: "#E1E1E1"
    },
    {
      name: "audako: Modern Process Control System",
      image: "assets/img/clients/audako2.png",
      link: "https://www.narz.net/leistungen/audako-plattform",
      tab: "Android",
      isFull: false,
      caption: "In Angular -",
      showShadow: true,
      background: "#F5E7B4"
    },
    {
      name: "IIoT Configurator: Full Stack IIoT Configuration and Diagnnosis Solution",
      image: "assets/img/clients/iot.jpg",
      link: "",
      tab: "Web",
      caption: "In Angular & NestJS -",
      isFull: true,
      showShadow: true,
      isInternal: true,
      background: "#3CE79F"
    }
  ];

  myApps: AppType[] = [
    {
      name: "Kitchensink: Features and Skills showcase app",
      image: "assets/img/apps/kitchensink.png",
      link: "https://kitchensink.r-tulika.me",
      tab: "Web",
      caption: "In Angular -",
      isFull: true,
      showShadow: true,
      background: "#64aedc"
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
