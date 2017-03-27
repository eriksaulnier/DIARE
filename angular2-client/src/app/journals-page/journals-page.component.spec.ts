import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalsPageComponent } from './journals-page.component';

describe('JournalsPageComponent', () => {
  let component: JournalsPageComponent;
  let fixture: ComponentFixture<JournalsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JournalsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});