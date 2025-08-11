import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeExpertise } from './home-expertise';

describe('HomeExpertiseComponent', () => {
  let component: HomeExpertise;
  let fixture: ComponentFixture<HomeExpertise>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [HomeExpertise]
})
    .compileComponents();

    fixture = TestBed.createComponent(HomeExpertise);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
