import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SongModalPage } from './song-modal.page';

describe('SongModalPage', () => {
  let component: SongModalPage;
  let fixture: ComponentFixture<SongModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SongModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
