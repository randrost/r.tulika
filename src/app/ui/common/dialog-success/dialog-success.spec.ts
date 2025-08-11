import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSuccess } from './dialog-success';

describe('DialogSuccessComponent', () => {
  let component: DialogSuccess;
  let fixture: ComponentFixture<DialogSuccess>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [DialogSuccess]
})
    .compileComponents();

    fixture = TestBed.createComponent(DialogSuccess);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
