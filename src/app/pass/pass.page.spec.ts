import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassPage } from './pass.page';

describe('PassPage', () => {
  let component: PassPage;
  let fixture: ComponentFixture<PassPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
