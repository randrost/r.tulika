import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeShowcases } from './home-showcases';

describe('HomeShowcasesComponent', () => {
  let component: HomeShowcases;
  let fixture: ComponentFixture<HomeShowcases>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [HomeShowcases]
})
    .compileComponents();

    fixture = TestBed.createComponent(HomeShowcases);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
