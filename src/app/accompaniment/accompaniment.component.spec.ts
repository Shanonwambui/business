import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccompanimentComponent } from './accompaniment.component';

describe('AccompanimentComponent', () => {
  let component: AccompanimentComponent;
  let fixture: ComponentFixture<AccompanimentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccompanimentComponent]
    });
    fixture = TestBed.createComponent(AccompanimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
