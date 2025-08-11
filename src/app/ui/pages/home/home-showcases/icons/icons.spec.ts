import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Icons } from './icons';

describe('IconsComponent', () => {
  let component: Icons;
  let fixture: ComponentFixture<Icons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [Icons]
})
    .compileComponents();

    fixture = TestBed.createComponent(Icons);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
