import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JunkielabsIllustration } from './junkielabs-illustration';

describe('JunkielabsIllustrationComponent', () => {
  let component: JunkielabsIllustration;
  let fixture: ComponentFixture<JunkielabsIllustration>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [JunkielabsIllustration]
})
    .compileComponents();

    fixture = TestBed.createComponent(JunkielabsIllustration);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
