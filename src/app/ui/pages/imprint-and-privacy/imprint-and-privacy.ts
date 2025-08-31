import { Component } from '@angular/core';
import {
  DefaultClassDirective,
  DefaultFlexDirective, DefaultFlexOrderDirective,
  DefaultLayoutAlignDirective,
  DefaultLayoutDirective,
} from "ng-flex-layout";
import {MarkdownComponent} from "ngx-markdown";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-imprint-and-privacy',
  imports: [
    DefaultClassDirective,
    DefaultFlexDirective,
    DefaultLayoutAlignDirective,
    DefaultLayoutDirective,
    MarkdownComponent,
    TranslatePipe,
    DefaultFlexOrderDirective
  ],
  templateUrl: './imprint-and-privacy.html',
  styleUrl: './imprint-and-privacy.scss',
  preserveWhitespaces: true,
})
export class ImprintAndPrivacy {

}
