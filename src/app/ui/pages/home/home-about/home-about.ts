import {ScrollDispatcher, ViewportRuler} from '@angular/cdk/scrolling';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component, DestroyRef,
  ElementRef,
  inject,
  NgZone, OnInit, signal,
  ViewChild, WritableSignal
} from '@angular/core';
import {FlexLayoutModule,} from 'ng-flex-layout';
import {
  startWith,
  map,
  scan,
  distinctUntilChanged,
  takeWhile,
  switchMap,
  Observable,
} from 'rxjs';
import {
  ENTER_SCALE,
  TRANSITION_AREA_SLIDE,
  TRANSITION_IMAGE_SCALE,
  TRANSITION_TEXT
} from 'src/app/ui/animations/transitions/transitions.constants';
import {UiUtilsView} from "../../../../core/utils/views.utils";
import {FlexLayoutServerModule} from "ng-flex-layout/server";
import {MatButtonModule} from "@angular/material/button";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {TranslatePipe, TranslateService} from "@ngx-translate/core";
import {MatTooltip} from "@angular/material/tooltip";
import {MarkdownComponent} from "ngx-markdown";
import {Skill, SkillType} from "./skill/skill";
import {Experience, ExperienceType} from "./experience/experience";

@Component({
  selector: 'app-home-about',
  templateUrl: './home-about.html',
  styleUrls: ['./home-about.scss'],
  animations: [
    TRANSITION_TEXT,
    TRANSITION_AREA_SLIDE,
    TRANSITION_IMAGE_SCALE,
    ENTER_SCALE
  ],
  imports: [FlexLayoutModule, FlexLayoutServerModule, MatButtonModule,  TranslatePipe, MatTooltip, Skill, MarkdownComponent, Experience],
  standalone: true
})
export class HomeAbout implements OnInit, AfterViewInit {
  mOnceAnimated = false

  _mTriggerAnim? = 'false'
  _mThreshold = 0.2

  @ViewChild('animRefView') vAnimRefView?: ElementRef<HTMLElement>;

  private _destroyRef = inject(DestroyRef);

  skillsFirstRow: WritableSignal<SkillType[]> = signal([]);
  skillsSecondRow: WritableSignal<SkillType[]> = signal([]);
  experiences: WritableSignal<ExperienceType[]> = signal([]);

  constructor(
    public el: ElementRef,
    private _ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    private scroll: ScrollDispatcher,
    private viewPortRuler: ViewportRuler,
    private _translateService: TranslateService,
  ) {
  }

  ngOnInit(): void {
    this._getSkills();
    this._getExperiences();

    this._translateService.onLangChange.subscribe(() => {
      this._getSkills();
      this._getExperiences();
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
      map(() => this.vAnimRefView ? UiUtilsView.getVisibility(this.vAnimRefView, this.viewPortRuler) : 0),
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

  private _getSkills(): void {
    this._translateService.get('home.pages.about.skills.first-row')
      .subscribe((skills: SkillType[]): void => {
        this.skillsFirstRow.set(skills);
      });

    this._translateService.get('home.pages.about.skills.second-row')
      .subscribe((skills: SkillType[]): void => {
        this.skillsSecondRow.set(skills);
      });
  }

  private _getExperiences(): void {
    this._translateService.get('home.pages.about.experiences')
      .subscribe((experiences: ExperienceType[]): void => {
        this.experiences.set(experiences);
      });
  }
}
