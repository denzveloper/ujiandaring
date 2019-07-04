import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HasilPage } from './hasil.page';

describe('HasilPage', () => {
  let component: HasilPage;
  let fixture: ComponentFixture<HasilPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HasilPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HasilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
