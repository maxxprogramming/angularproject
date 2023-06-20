import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarListRenderComponent } from './car-list-render.component';

describe('CarListRenderComponent', () => {
  let component: CarListRenderComponent;
  let fixture: ComponentFixture<CarListRenderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarListRenderComponent]
    });
    fixture = TestBed.createComponent(CarListRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
