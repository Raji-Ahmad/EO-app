import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NdwiComponent } from './ndwi.component';

describe('NdwiComponent', () => {
  let component: NdwiComponent;
  let fixture: ComponentFixture<NdwiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NdwiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NdwiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
