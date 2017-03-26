import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserJournalListComponent } from './user-journal-list.component';

describe('UserJournalListComponent', () => {
  let component: UserJournalListComponent;
  let fixture: ComponentFixture<UserJournalListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserJournalListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserJournalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
