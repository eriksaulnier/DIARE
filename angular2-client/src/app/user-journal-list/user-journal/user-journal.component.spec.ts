import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserJournalComponent } from './user-journal.component';

describe('UserJournalComponent', () => {
  let component: UserJournalComponent;
  let fixture: ComponentFixture<UserJournalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserJournalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserJournalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
