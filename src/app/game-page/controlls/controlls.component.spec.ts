import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControllsComponent } from './controlls.component';

describe('ControllsComponent', () => {
  let component: ControllsComponent;
  let fixture: ComponentFixture<ControllsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControllsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControllsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
