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
import {FormBuilder, FormGroup, NgForm, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ReCaptchaV3Service} from 'ng-recaptcha';
import {distinctUntilChanged, map, Observable, scan, startWith, switchMap, takeWhile} from 'rxjs';
import {TRANSITION_IMAGE_SCALE, TRANSITION_TEXT} from 'src/app/ui/animations/transitions/transitions.constants';
import {ParamPostContact} from "../../../../types/contact-param";
import {FlexLayoutModule} from "ng-flex-layout";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {DialogSuccess} from "../../../common/dialog-success/dialog-success";
import {DialogProgress} from "../../../common/dialog-progress/dialog-progress";
import {UiUtilsView} from "../../../../core/utils/views.utils";
import {DialogModelProgress} from "../../../../types/model";
import {FlexLayoutServerModule} from "ng-flex-layout/server";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-home-contact',
  templateUrl: './home-contact.html',
  styleUrls: ['./home-contact.scss'],
  animations: [
    TRANSITION_TEXT,
    TRANSITION_IMAGE_SCALE
  ],
  imports: [
    FlexLayoutModule,
    FlexLayoutServerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    TranslatePipe
  ],
  standalone: true,
})
export class HomeContact implements AfterViewInit {
  mDialogSuccessRef?: MatDialogRef<DialogSuccess, any>;
  mDialogProgressRef?: MatDialogRef<DialogProgress, any>;

  formGroup = this.formBuilder.group({
    name: this.formBuilder.nonNullable.control('', Validators.required),
    email: this.formBuilder.nonNullable.control('', [Validators.required, Validators.email]),
    details: this.formBuilder.nonNullable.control('', [Validators.minLength(10), Validators.maxLength(500)]),
  });
  _mInProgress = false;

  mOnceAnimated = false

  _mTriggerAnim? = 'false'
  _mThreshold = 0.2

  @ViewChild('animRefView') vAnimRefView?: ElementRef<HTMLElement>;
  @ViewChild("formDirective", {static: true}) private formDirective?: NgForm;

  private _destroyRef = inject(DestroyRef);

  constructor(
    public el: ElementRef,
    private _ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    private scroll: ScrollDispatcher,
    private viewPortRuler: ViewportRuler,
    private formBuilder: FormBuilder,
    // private recaptchaV3Service: ReCaptchaV3Service,
    public dialog: MatDialog
  ) {
  }

  ngAfterViewInit(): void {
    this.setupAnimation();
  }

  _onSubmit(): void {
    this._mInProgress = true;

    this.openProgress();
    const value = this.formGroup.getRawValue();
    setTimeout(() => {
      // this.recaptchaV3Service.execute("importantAction").subscribe(token => {
      //   this._resolvedCaptcha(token, value);
      // });
    }, 100);
  }

  _resolvedCaptcha(token: string, value: ParamPostContact) {
    value.token = token;
    if (token) {
      this.addContact(value);
    } else {
      this.closeProgress();
    }
  }

  addContact(data: ParamPostContact) {
    // this.apiContactService.add(data).subscribe({
    //     next: (res: ParamPostContact) => {
    //       this.resetForm();
    //       this.closeProgress();
    //       this.openSuccess();
    //     },
    //
    //     error: (error) => {
    //       console.error(error);
    //       this.closeProgress();
    //     },
    //   }
    // );
  }

  resetForm(): void {
    this.formGroup.reset();
    this.formDirective?.resetForm();
  }

  setupAnimation(): void {
    if (!this.vAnimRefView) return;

    this.scroll.ancestorScrolled(this.vAnimRefView, 100).pipe(
      takeUntilDestroyed(this._destroyRef),
      startWith(0),
      map(() => {
        return this.vAnimRefView ? UiUtilsView.getVisibility(this.vAnimRefView, this.viewPortRuler) : 0;
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

  openProgress() {
    this._mInProgress = true;
    let alert: DialogModelProgress = new DialogModelProgress(
      "Sending...",
      "",
      undefined,
      undefined
    );

    this.mDialogProgressRef = this.dialog.open(DialogProgress, {
      data: alert,
      disableClose: true
    });
  }

  closeProgress() {
    this._mInProgress = false;
    if (this.mDialogProgressRef) this.mDialogProgressRef.close();
  }

  openSuccess() {
    this.mDialogSuccessRef = this.dialog.open(DialogSuccess, {
      data: {},
      disableClose: false
    });
    setTimeout(() => {
      this.closeSuccess()
    }, 4000);
  }

  closeSuccess() {
    if (this.mDialogSuccessRef) this.mDialogSuccessRef.close();
  }
}
