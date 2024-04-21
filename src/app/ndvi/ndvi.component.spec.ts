import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NDVIComponent } from './ndvi.component';

describe('NDVIComponent', () => {
  let component: NDVIComponent;
  let fixture: ComponentFixture<NDVIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NDVIComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NDVIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
