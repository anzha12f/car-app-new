import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarSearchHeaderComponent } from './car-search-header.component';

describe('CarSearchHeaderComponent', () => {
  let component: CarSearchHeaderComponent;
  let fixture: ComponentFixture<CarSearchHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarSearchHeaderComponent]
    });
    fixture = TestBed.createComponent(CarSearchHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
