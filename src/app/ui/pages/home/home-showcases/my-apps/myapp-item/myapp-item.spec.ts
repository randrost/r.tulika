import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyappItem } from './myapp-item';

describe('MyappItemComponent', () => {
  let component: MyappItem;
  let fixture: ComponentFixture<MyappItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [MyappItem]
})
    .compileComponents();

    fixture = TestBed.createComponent(MyappItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
