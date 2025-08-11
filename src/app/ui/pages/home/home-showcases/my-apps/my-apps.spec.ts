import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyApps } from './my-apps';

describe('MyAppsComponent', () => {
  let component: MyApps;
  let fixture: ComponentFixture<MyApps>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [MyApps]
})
    .compileComponents();

    fixture = TestBed.createComponent(MyApps);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
