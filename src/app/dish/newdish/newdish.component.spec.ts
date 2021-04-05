import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewdishComponent } from './newdish.component';

describe('NewdishComponent', () => {
  let component: NewdishComponent;
  let fixture: ComponentFixture<NewdishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewdishComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewdishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
