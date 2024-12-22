import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GivingtofundraiserComponent } from './givingtofundraiser.component';

describe('GivingtofundraiserComponent', () => {
  let component: GivingtofundraiserComponent;
  let fixture: ComponentFixture<GivingtofundraiserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GivingtofundraiserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GivingtofundraiserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
