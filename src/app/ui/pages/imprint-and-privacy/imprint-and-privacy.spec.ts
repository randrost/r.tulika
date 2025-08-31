import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprintAndPrivacy } from './imprint-and-privacy';

describe('ImprintAndPrivacyComponent', () => {
  let component: ImprintAndPrivacy;
  let fixture: ComponentFixture<ImprintAndPrivacy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImprintAndPrivacy]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImprintAndPrivacy);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
