import {ScrollDispatcher, ViewportRuler} from '@angular/cdk/scrolling';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  NgZone, OnInit, signal,
  ViewChild, WritableSignal
} from '@angular/core';
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
import {TRANSITION_IMAGE_SCALE, TRANSITION_TEXT} from 'src/app/ui/animations/transitions/transitions.constants';
import {ExpertiseItem} from "./expertise-item/expertise-item";
import {UiUtilsView} from "../../../../core/utils/views.utils";
import {FlexLayoutServerModule} from "ng-flex-layout/server";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {TranslatePipe, TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-home-expertise',
  templateUrl: './home-expertise.html',
  styleUrls: ['./home-expertise.scss'],
  animations: [
    TRANSITION_TEXT,
    TRANSITION_IMAGE_SCALE
  ],
  imports: [FlexLayoutModule, FlexLayoutServerModule, ExpertiseItem, TranslatePipe],
  standalone: true
})
export class HomeExpertise implements OnInit, AfterViewInit {
  tools: WritableSignal<{
    name: string;
    logo: string;
    link: string;
    tab: string;
    color?: string;
  }[]> = signal([
    // design
    {
      name: "Figma",
      logo: "assets/img/tools/figma.svg",
      link: "https://www.figma.com/",
      tab: "design"
    },

    {
      name: "Adobe Photoshop",
      logo: "assets/img/tools/ps.png",
      link: "https://www.adobe.com/products/photoshop.html",
      tab: "design"
    },
    {
      name: "Adobe Illustrator",
      logo: "assets/img/tools/ai.svg",
      link: "https://www.adobe.com/products/illustrator.html",
      tab: "design"
    },
    {
      name: "Ink Scape",
      logo: "assets/img/tools/inkscape-logo.svg",
      link: "https://inkscape.org/",
      tab: "design"
    },
    {
      name: "Material Design 3",
      logo: "assets/img/tools/m3.ico",
      link: "https://m3.material.io/",
      tab: "design"
    },
    {
      name: "RxJS",
      logo: "assets/img/tools/rx-js.png",
      link: "https://rxjs.dev/",
      tab: "design",
    },
    {
      name: "Tailwind CSS",
      logo: "assets/img/tools/tailwind.png",
      link: "https://tailwindcss.com/",
      tab: "design",
    },

    // cross
    {
      name: "Flutter",
      logo: "assets/img/tools/flutter_logo.svg",
      link: "https://flutter.dev/",
      tab: "Cross",
      color: "#42A5F5"
    },
    {
      name: "Ionic",
      logo: "assets/img/tools/ionic.svg",
      link: "https://ionicframework.com/",
      tab: "Cross",
    },

    // web
    // {
    //   name: "HighCharts js",
    //   logo: "assets/img/tools/highchart-logo.png",
    //   link: "https://www.highcharts.com/",
    //   tab: "web"
    // },
    {
      name: "AmCharts",
      logo: "assets/img/tools/amcharts.webp",
      link: "https://www.amcharts.com/",
      tab: "web"
    },
    {
      name: "Sass",
      logo: "assets/img/tools/sass-logo.svg",
      link: "https://sass-lang.com/",
      tab: "web",
      color: "#CF649A"
    },
    {
      name: "Angular",
      logo: "assets/img/tools/angular.png",
      link: "https://angular.io/",
      tab: "web",
      color: "#FF4369"
    },
    {
      name: "Typescript",
      logo: "assets/img/tools/typescript.png",
      link: "https://www.typescriptlang.org/",
      tab: "web",
    },
    {
      name: "JavaScript",
      logo: "assets/img/tools/javascript.png",
      link: "https://www.javascript.com/",
      tab: "web",
    },

    // backend
    {
      name: "Express",
      logo: "assets/img/tools/express.png",
      link: "https://expressjs.com/",
      tab: "back-end"
    },
    {
      name: "NodeJs",
      logo: "assets/img/tools/nodejs.png",
      link: "https://nodejs.org/en/",
      tab: "back-end"
    },
    {
      name: "NestJs",
      logo: "assets/img/tools/nestjs.svg",
      link: "https://nestjs.com/",
      tab: "back-end",
      color: "#712636"
    },
    {
      name: "Microservices",
      logo: "assets/img/tools/microservices.png",
      link: "https://microservices.io/",
      tab: "back-end"
    },
    {
      name: "MongoDB",
      logo: "assets/img/tools/mongo.png",
      link: "https://www.mongodb.com/",
      tab: "back-end",
      color: "#47A248",
    },
    {
      name: ".Net",
      logo: "assets/img/tools/dotnet-logo.svg",
      link: "https://dotnet.microsoft.com/",
      tab: "back-end"
    },
    {
      name: "C#",
      logo: "assets/img/tools/csharp.png",
      link: "https://learn.microsoft.com/en-us/dotnet/csharp/",
      tab: "back-end"
    },
    {
      name: "Java",
      logo: "assets/img/tools/java-logo.png",
      link: "https://www.java.com/en/",
      tab: "back-end"
    },
    {
      name: "Spring Boot",
      logo: "assets/img/tools/springboot.png",
      link: "https://spring.io/projects/spring-boot",
      tab: "back-end",
      color: "#000000"
    },
  ]);
  expertises: WritableSignal<{
    isColored: boolean,
    jobType: string,
    parts: string[],
  }[]> = signal([]);

  mOnceAnimated = false

  _mTriggerAnim? = 'false'

  _mThreshold = 0.2

  @ViewChild('animRefView') vAnimRefView?: ElementRef<HTMLElement>;

  private _destroyRef = inject(DestroyRef);

  constructor(
    public el: ElementRef,
    private _ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    private scroll: ScrollDispatcher,
    private viewPortRuler: ViewportRuler,
    private _translateService: TranslateService
  ) {
  }

  ngOnInit(): void {
    this._getExpertises();

    this._translateService.onLangChange.subscribe(() => {
      this._getExpertises();
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
      scan((acc: number | boolean, val: number, _: number) => val >= this._mThreshold || (acc ? val > 0 : false)),
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

  private _getExpertises(): void {
    this._translateService.get('home.pages.expertise.expertise').subscribe((expertises: {
    isColored: boolean;
    jobType: string;
    parts: string[];
    }[]) => {
      this.expertises.set(expertises);
    });
  }
}
