import {ScrollDispatcher, ViewportRuler} from '@angular/cdk/scrolling';
import {AfterViewInit, ChangeDetectorRef, Component, DestroyRef, ElementRef, inject, NgZone, ViewChild} from '@angular/core';
import {FlexLayoutModule} from 'ng-flex-layout';
import {
  startWith,
  map,
  scan,
  distinctUntilChanged,
  takeWhile,
  switchMap,
  Observable
} from 'rxjs';
import {TRANSITION_TEXT} from 'src/app/ui/animations/transitions/transitions.constants';
import {ThedroidIllustration} from "../../../widgets/illustrations/thedroid/thedroid-illustration";
import {
  JunkielabsIllustration
} from "../../../widgets/illustrations/junkielabs/junkielabs-illustration";
import {UiUtilsView} from "../../../../core/utils/views.utils";
import {FlexLayoutServerModule} from "ng-flex-layout/server";
import {MatButtonModule} from "@angular/material/button";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-home-platforms',
  templateUrl: './home-platforms.html',
  styleUrls: ['./home-platforms.scss'],
  animations: [
    TRANSITION_TEXT
  ],
  imports: [
    FlexLayoutModule,
    FlexLayoutServerModule,
    ThedroidIllustration,
    JunkielabsIllustration,
    MatButtonModule,
  ],
  standalone: true
})
export class HomePlatforms implements AfterViewInit {
  mOnceAnimated = false

  _mTriggerAnim? = 'false'
  _mThreshold = 0.2

  @ViewChild('animRefView') vAnimRefView?: ElementRef<HTMLElement>;

  private _destroyRef = inject(DestroyRef);

  constructor(
    public el: ElementRef,
    private _ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    private scroll: ScrollDispatcher, private viewPortRuler: ViewportRuler
  ) {}

  ngAfterViewInit(): void {
    this.setupAnimation();
  }

  setupAnimation(): void {
    if (!this.vAnimRefView) return;

    this.scroll.ancestorScrolled(this.vAnimRefView, 100).pipe(
      takeUntilDestroyed(this._destroyRef),
      startWith(0),
      map(() => {
        if (this.vAnimRefView != null) {
          var visibility = UiUtilsView.getVisibility(this.vAnimRefView, this.viewPortRuler)
          return visibility;
        }
        return 0;
      }),
      scan<number, boolean>((acc: number | boolean, val: number) => (val >= this._mThreshold || (acc ? val > 0 : false))),
      distinctUntilChanged(),
      takeWhile(trigger => {
        return !trigger || !this.mOnceAnimated
      }, true),
      switchMap(trigger => new Observable<number | boolean>(observer => this._ngZone.run(() => observer.next(trigger))))
    ).subscribe(val => {
        if (this.mOnceAnimated) {
          return;
        }

        if (val) {
          this.mOnceAnimated = true
          this._mTriggerAnim = 'true'
          this.cdr.detectChanges()
        }
      }
    )
  }
}
