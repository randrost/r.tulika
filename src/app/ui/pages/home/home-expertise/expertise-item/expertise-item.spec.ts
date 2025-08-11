import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertiseItem } from './expertise-item';

describe('ExpertiseItemComponent', () => {
  let component: ExpertiseItem;
  let fixture: ComponentFixture<ExpertiseItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ExpertiseItem]
})
    .compileComponents();

    fixture = TestBed.createComponent(ExpertiseItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
