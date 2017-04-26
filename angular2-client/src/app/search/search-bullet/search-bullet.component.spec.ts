import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBulletComponent } from './search-bullet.component';

describe('SearchBulletComponent', () => {
  let component: SearchBulletComponent;
  let fixture: ComponentFixture<SearchBulletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBulletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBulletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
