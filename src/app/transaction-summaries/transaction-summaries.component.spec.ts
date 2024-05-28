import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionSummariesComponent } from './transaction-summaries.component';
import { TransactionService, Transaction } from '../services/transaction-service.service';
import { of } from 'rxjs';

describe('TransactionSummariesComponent', () => {
  let component: TransactionSummariesComponent;
  let fixture: ComponentFixture<TransactionSummariesComponent>;
  let transactionServiceSpy: jasmine.SpyObj<TransactionService>;

  const mockTransactions: Transaction[] = [
    { id: 1, date: new Date('2023-01-01'), amount: 100, category: 'A', description: 'Test transaction 1' },
    { id: 2, date: new Date('2023-01-02'), amount: 200, category: 'B', description: 'Test transaction 2' },
    { id: 3, date: new Date('2023-01-03'), amount: 300, category: 'C', description: 'Test transaction 3' },
  ];

  beforeEach(async () => {
    transactionServiceSpy = jasmine.createSpyObj('TransactionService', ['transactions$']);
    transactionServiceSpy.transactions$ = of(mockTransactions);

    await TestBed.configureTestingModule({
      declarations: [TransactionSummariesComponent],
      providers: [{ provide: TransactionService, useValue: transactionServiceSpy }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionSummariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize transactions, totalTransactions, and totalAmount on ngOnInit', () => {
    component.ngOnInit();
    expect(component.transactions).toEqual(mockTransactions);
    expect(component.totalTransactions).toBe(3);
    expect(component.totalAmount).toBe(600);
  });

  it('should update totalTransactions and totalAmount when transactions change', () => {
    const newTransactions: Transaction[] = [
      { id: 4, date: new Date('2023-01-04'), amount: 400, category: 'D', description: 'Test transaction 4' },
      { id: 5, date: new Date('2023-01-05'), amount: 500, category: 'E', description: 'Test transaction 5' },
    ];
    transactionServiceSpy.transactions$ = of(newTransactions);

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.transactions).toEqual(newTransactions);
    expect(component.totalTransactions).toBe(2);
    expect(component.totalAmount).toBe(900);
  });

  it('should handle empty transactions list', () => {
    transactionServiceSpy.transactions$ = of([]);

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.transactions).toEqual([]);
    expect(component.totalTransactions).toBe(0);
    expect(component.totalAmount).toBe(0);
  });

  it('should handle transactions with negative amounts', () => {
    const negativeTransactions: Transaction[] = [
      { id: 6, date: new Date('2023-01-06'), amount: -100, category: 'F', description: 'Test transaction 6' },
      { id: 7, date: new Date('2023-01-07'), amount: 200, category: 'G', description: 'Test transaction 7' },
    ];
    transactionServiceSpy.transactions$ = of(negativeTransactions);

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.transactions).toEqual(negativeTransactions);
    expect(component.totalTransactions).toBe(2);
    expect(component.totalAmount).toBe(100);
  });
});
