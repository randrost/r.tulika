import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientApps } from './client-apps';

describe('ClientAppsComponent', () => {
  let component: ClientApps;
  let fixture: ComponentFixture<ClientApps>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ClientApps]
})
    .compileComponents();

    fixture = TestBed.createComponent(ClientApps);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
