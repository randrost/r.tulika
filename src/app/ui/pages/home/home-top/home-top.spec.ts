import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTop } from './home-top';

describe('HomeTopComponent', () => {
  let component: HomeTop;
  let fixture: ComponentFixture<HomeTop>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [HomeTop]
})
    .compileComponents();

    fixture = TestBed.createComponent(HomeTop);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
