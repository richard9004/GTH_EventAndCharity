import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubEventComponent } from './sub-event.component';

describe('SubEventComponent', () => {
  let component: SubEventComponent;
  let fixture: ComponentFixture<SubEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubEventComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
