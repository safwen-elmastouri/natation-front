import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonDemo } from './button-demo.component';

describe('ButtonDemo', () => {
  let component: ButtonDemo;
  let fixture: ComponentFixture<ButtonDemo>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonDemo]
    });
    fixture = TestBed.createComponent(ButtonDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
