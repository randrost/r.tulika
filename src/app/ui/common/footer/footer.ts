import {ScrollDispatcher, ViewportRuler} from '@angular/cdk/scrolling';
import {AfterViewInit, ChangeDetectorRef, Component, DestroyRef, ElementRef, inject, NgZone, ViewChild} from '@angular/core';
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
import {TRANSITION_REVEAL} from '../../animations/transitions/transitions.constants';
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {RouterModule} from "@angular/router";
import {UiUtilsView} from "../../../core/utils/views.utils";
import {FlexLayoutServerModule} from "ng-flex-layout/server";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MatTooltipModule} from "@angular/material/tooltip";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss'],
  animations: [
    TRANSITION_REVEAL
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FlexLayoutServerModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatTooltipModule,
    TranslatePipe
  ],
  standalone: true
})
export class Footer implements AfterViewInit {
  _mThreshold = 0.4

  mOnceAnimated = false
  _mTriggerAnim? = 'false'

  @ViewChild('animRefView') vAnimRefView?: ElementRef<HTMLElement>;

  private _destroyRef = inject(DestroyRef);

  constructor(
    private _ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    private scroll: ScrollDispatcher,
    private viewPortRuler: ViewportRuler) {}

  ngAfterViewInit(): void {
    this.setupAnimation();
  }

  setupAnimation(): void {
    if (!this.vAnimRefView) return;

    this.scroll.ancestorScrolled(this.vAnimRefView, 100).pipe(
      takeUntilDestroyed(this._destroyRef),
      startWith(0),
      map(() => this.vAnimRefView ? UiUtilsView.getVisibility(this.vAnimRefView, this.viewPortRuler) : 0),
      scan((acc: number | boolean, val: number) => val >= this._mThreshold || (acc ? val > 0 : false)),
      distinctUntilChanged(),
      takeWhile(trigger => !trigger || !this.mOnceAnimated, true),
      switchMap(trigger => new Observable(observer => this._ngZone.run(() => observer.next(trigger))))
    ).subscribe(val => {
      if (!this.mOnceAnimated && val) {
        this.mOnceAnimated = true;
        this._mTriggerAnim = 'true';
        this.cdr.detectChanges();
        }
    });
  }
}
