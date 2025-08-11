import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogProgress } from './dialog-progress';

describe('DialogProgressComponent', () => {
  let component: DialogProgress;
  let fixture: ComponentFixture<DialogProgress>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [DialogProgress]
})
    .compileComponents();

    fixture = TestBed.createComponent(DialogProgress);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
