import {Component, input} from '@angular/core';
import {FlexLayoutModule} from "ng-flex-layout";
import {FlexLayoutServerModule} from "ng-flex-layout/server";

@Component({
  selector: 'app-experience',
  imports: [FlexLayoutModule, FlexLayoutServerModule],
  templateUrl: './experience.html',
  styleUrl: './experience.scss'
})
export class Experience {
  experience = input<ExperienceType>()
}

export type ExperienceType = {
  number: string;
  text: string;
}
