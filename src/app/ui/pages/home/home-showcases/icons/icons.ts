import {ScrollDispatcher, ViewportRuler} from '@angular/cdk/scrolling';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component, DestroyRef,
  ElementRef,
  inject,
  NgZone,
  ViewChild
} from '@angular/core';
import {MediaObserver, MediaChange, FlexLayoutModule} from 'ng-flex-layout';
import {
  startWith,
  map,
  scan,
  distinctUntilChanged,
  takeWhile,
  switchMap,
  Observable,
} from 'rxjs';
import {TRANSITION_TEXT, TRANSITION_IMAGE_SCALE} from 'src/app/ui/animations/transitions/transitions.constants';
import {FlexLayoutServerModule} from "ng-flex-layout/server";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {UiUtilsView} from "../../../../../core/utils/views.utils";

@Component({
  selector: 'app-icons',
  templateUrl: './icons.html',
  styleUrls: ['./icons.scss'],
  animations: [
    TRANSITION_TEXT,
    TRANSITION_IMAGE_SCALE
  ],
  imports: [
    FlexLayoutModule,
    FlexLayoutServerModule,
  ],
  standalone: true
})
export class Icons implements AfterViewInit {
  readonly ICONS_2: string = "assets/img/icons/icon_set_2.png"
  readonly ICONS_2_XS = "assets/img/icons/icon_set_2_xs.png"
  readonly ICONS_3: string = "assets/img/icons/icon_set_3.png"
  readonly ICONS_3_XS = "assets/img/icons/icon_set_3_xs.png"
  mOnceAnimated = false

  _mIcon2 = "assets/img/icons/icon_set_2.png"
  _mIcon3 = "assets/img/icons/icon_set_3.png"

  _mTriggerAnim? = 'false'
  _mThreshold = 0.2

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
          this._mIcon3 = this.ICONS_3_XS
        } else {
          this._mIcon2 = this.ICONS_2
          this._mIcon3 = this.ICONS_3
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
      map(() =>
        this.vAnimRefView
          ? UiUtilsView.getVisibility(this.vAnimRefView, this.viewPortRuler)
          : 0
      ),
      scan((acc: number | boolean, val: number) => val >= this._mThreshold || acc),
      distinctUntilChanged(),
      takeWhile(trigger => !trigger || !this.mOnceAnimated, true),
      switchMap(trigger =>
        new Observable(observer => this._ngZone.run(() => observer.next(trigger)))
      )
    ).subscribe(val => {
      if (!this.mOnceAnimated && val) {
        this.mOnceAnimated = true;
        this._mTriggerAnim = 'true';
        this.cdr.detectChanges();
      }
    });
  }
}
