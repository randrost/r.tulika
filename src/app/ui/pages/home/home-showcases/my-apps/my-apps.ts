import {ScrollDispatcher, ViewportRuler} from '@angular/cdk/scrolling';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  inject, input,
  NgZone,
  ViewChild
} from '@angular/core';
import {FlexLayoutModule} from 'ng-flex-layout';
import {
  ReplaySubject,
  takeUntil,
  startWith,
  map,
  scan,
  distinctUntilChanged,
  takeWhile,
  switchMap,
  Observable
} from 'rxjs';
import {AppType} from 'src/app/types/apps_type';
import {TRANSITION_IMAGE_SCALE, TRANSITION_TEXT} from 'src/app/ui/animations/transitions/transitions.constants';
import {MyappItem} from "./myapp-item/myapp-item";
import {UiUtilsView} from "../../../../../core/utils/views.utils";
import {FlexLayoutServerModule} from "ng-flex-layout/server";
import {TranslatePipe} from "@ngx-translate/core";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-my-apps',
  templateUrl: './my-apps.html',
  styleUrls: ['./my-apps.scss'],
  animations: [
    TRANSITION_TEXT,
    TRANSITION_IMAGE_SCALE
  ],
  imports: [
    MyappItem,
    FlexLayoutModule,
    FlexLayoutServerModule,
    TranslatePipe
  ],
  standalone: true
})
export class MyApps implements AfterViewInit {
  apps = input<AppType[]>([]);

  mOnceAnimated = false

  _mTriggerAnim? = 'false'
  _mThreshold = 0.4

  @ViewChild('animRefView') vAnimRefView?: ElementRef<HTMLElement>;

  private _destroyRef = inject(DestroyRef);

  constructor(
    public el: ElementRef,
    private _ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    private scroll: ScrollDispatcher,
    private viewPortRuler: ViewportRuler,
  ) {
  }

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
