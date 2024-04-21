import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistComponent } from './hist.component';

describe('HistComponent', () => {
  let component: HistComponent;
  let fixture: ComponentFixture<HistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
