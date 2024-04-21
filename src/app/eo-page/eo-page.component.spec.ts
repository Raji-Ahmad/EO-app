import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EoPageComponent } from './eo-page.component';

describe('EoPageComponent', () => {
  let component: EoPageComponent;
  let fixture: ComponentFixture<EoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EoPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
