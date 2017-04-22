import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageBulletComponent } from './page-bullet.component';

describe('PageBulletComponent', () => {
  let component: PageBulletComponent;
  let fixture: ComponentFixture<PageBulletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageBulletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageBulletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
