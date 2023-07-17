import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyCartDialogComponentComponent } from './empty-cart-dialog-component.component';

describe('EmptyCartDialogComponentComponent', () => {
  let component: EmptyCartDialogComponentComponent;
  let fixture: ComponentFixture<EmptyCartDialogComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmptyCartDialogComponentComponent]
    });
    fixture = TestBed.createComponent(EmptyCartDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
