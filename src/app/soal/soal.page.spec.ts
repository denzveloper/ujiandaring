import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoalPage } from './soal.page';

describe('SoalPage', () => {
  let component: SoalPage;
  let fixture: ComponentFixture<SoalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
