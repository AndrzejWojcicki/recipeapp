import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaloricBalanceComponent } from './caloric-balance.component';

describe('CaloricBalanceComponent', () => {
  let component: CaloricBalanceComponent;
  let fixture: ComponentFixture<CaloricBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaloricBalanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaloricBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
