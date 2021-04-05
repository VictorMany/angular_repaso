import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListdishComponent } from './listdish.component';

describe('ListdishComponent', () => {
  let component: ListdishComponent;
  let fixture: ComponentFixture<ListdishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListdishComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListdishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
