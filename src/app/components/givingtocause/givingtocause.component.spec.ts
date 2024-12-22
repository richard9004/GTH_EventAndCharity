import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GivingtocauseComponent } from './givingtocause.component';

describe('GivingtocauseComponent', () => {
  let component: GivingtocauseComponent;
  let fixture: ComponentFixture<GivingtocauseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GivingtocauseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GivingtocauseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
