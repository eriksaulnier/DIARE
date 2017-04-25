import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBulletComponent } from './add-bullet.component';

describe('AddBulletComponent', () => {
  let component: AddBulletComponent;
  let fixture: ComponentFixture<AddBulletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBulletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBulletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
