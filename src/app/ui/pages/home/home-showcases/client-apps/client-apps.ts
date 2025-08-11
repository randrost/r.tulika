import {ScrollDispatcher, ViewportRuler} from '@angular/cdk/scrolling';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component, DestroyRef,
  ElementRef,
  inject, input,
  NgZone,
  ViewChild
} from '@angular/core';
import {FlexLayoutModule} from 'ng-flex-layout';
import {
  distinctUntilChanged,
  map,
  Observable,
  scan,
  startWith,
  switchMap,
  takeWhile
} from 'rxjs';
import {TRANSITION_TEXT, TRANSITION_IMAGE_SCALE} from 'src/app/ui/animations/transitions/transitions.constants';
import {UiUtilsView} from "../../../../../core/utils/views.utils";
import {FlexLayoutServerModule} from "ng-flex-layout/server";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MatTooltipModule} from "@angular/material/tooltip";
import {TranslatePipe} from "@ngx-translate/core";
import {AppItem, AppItemType} from "./app-item/app-item";

@Component({
  selector: 'app-client-apps',
  templateUrl: './client-apps.html',
  styleUrls: ['./client-apps.scss'],
  animations: [
    TRANSITION_TEXT,
    TRANSITION_IMAGE_SCALE
  ],
  imports: [
    AppItem,
    FlexLayoutModule,
    FlexLayoutServerModule,
    MatTooltipModule,
    TranslatePipe,
  ],
  standalone: true
})
export class ClientApps implements AfterViewInit {
  apps = input<AppItemType[]>([]);

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
        const ref = this.vAnimRefView;
        return ref ? UiUtilsView.getVisibility(ref, this.viewPortRuler) : 0;
      }),
      scan((acc: number | boolean, val: number) => val >= this._mThreshold || (acc ? val > 0 : false)),
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
