import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationThankYouComponent } from './organization-thank-you.component';

describe('OrganizationThankYouComponent', () => {
  let component: OrganizationThankYouComponent;
  let fixture: ComponentFixture<OrganizationThankYouComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizationThankYouComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizationThankYouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
