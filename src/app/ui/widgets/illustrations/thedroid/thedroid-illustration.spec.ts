import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThedroidIllustration } from './thedroid-illustration';

describe('ThedroidIllustrationComponent', () => {
  let component: ThedroidIllustration;
  let fixture: ComponentFixture<ThedroidIllustration>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ThedroidIllustration]
})
    .compileComponents();

    fixture = TestBed.createComponent(ThedroidIllustration);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
