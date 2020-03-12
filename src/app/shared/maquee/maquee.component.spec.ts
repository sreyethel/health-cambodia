import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaqueeComponent } from './maquee.component';

describe('MaqueeComponent', () => {
  let component: MaqueeComponent;
  let fixture: ComponentFixture<MaqueeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaqueeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaqueeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
