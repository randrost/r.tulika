import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeContact } from './home-contact';

describe('HomeContactComponent', () => {
  let component: HomeContact;
  let fixture: ComponentFixture<HomeContact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [HomeContact]
})
    .compileComponents();

    fixture = TestBed.createComponent(HomeContact);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
