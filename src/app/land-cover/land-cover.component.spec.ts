import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandCoverComponent } from './land-cover.component';

describe('LandCoverComponent', () => {
  let component: LandCoverComponent;
  let fixture: ComponentFixture<LandCoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandCoverComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LandCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
