import {Component, input} from '@angular/core';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-skill',
  imports: [
    CommonModule
  ],
  templateUrl: './skill.html',
  styleUrl: './skill.scss',
  standalone: true
})
export class Skill {
  skill = input<SkillType>();
}

export type SkillType = {
  color: `#${string}`;
  class: string;
  text: string;
  textClass: string;
}
