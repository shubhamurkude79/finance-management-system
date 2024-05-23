import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionSummariesComponent } from './transaction-summaries.component';

describe('TransactionSummariesComponent', () => {
  let component: TransactionSummariesComponent;
  let fixture: ComponentFixture<TransactionSummariesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionSummariesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionSummariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
