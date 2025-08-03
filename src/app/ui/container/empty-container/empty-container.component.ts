import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-empty-container',
    templateUrl: './empty-container.component.html',
    styleUrls: ['./empty-container.component.scss'],
    standalone: false
})
export class EmptyContainerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
