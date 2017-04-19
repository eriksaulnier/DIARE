import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { JournalPagesComponent } from './journal-pages.component';
import { PageComponent } from './page/page.component';

describe('JournalPagesComponent', () => {
  let component: JournalPagesComponent;
  let fixture: ComponentFixture<JournalPagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JournalPagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
