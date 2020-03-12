import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcateComponent } from './concate.component';

describe('ConcateComponent', () => {
  let component: ConcateComponent;
  let fixture: ComponentFixture<ConcateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConcateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
