import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePlatforms } from './home-platforms';

describe('HomePlatformsComponent', () => {
  let component: HomePlatforms;
  let fixture: ComponentFixture<HomePlatforms>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [HomePlatforms]
})
    .compileComponents();

    fixture = TestBed.createComponent(HomePlatforms);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
