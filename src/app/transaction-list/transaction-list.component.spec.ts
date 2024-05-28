import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionListComponent } from './transaction-list.component';
import { TransactionService } from '../services/transaction-service.service';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

describe('TransactionListComponent', () => {
  let component: TransactionListComponent;
  let fixture: ComponentFixture<TransactionListComponent>;
  let transactionService: TransactionService;
  let transactionServiceSpy: jasmine.SpyObj<TransactionService>;

  const mockTransactions = [
    { id: 1, date: new Date('2023-01-01'), amount: 100, category: 'A', description: 'Test transaction 1' },
    { id: 2, date: new Date('2023-01-02'), amount: 200, category: 'B', description: 'Test transaction 2' },
  ];

  beforeEach(async () => {
    transactionServiceSpy = jasmine.createSpyObj('TransactionService', ['transactions$', 'sortTransactions', 'filterTransactions', 'resetTransactions']);
    transactionServiceSpy.transactions$ = of(mockTransactions);
    
    await TestBed.configureTestingModule({
      declarations: [ TransactionListComponent ],
      imports: [ReactiveFormsModule],
      providers: [{ provide: TransactionService, useValue: transactionServiceSpy }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize transactions on ngOnInit', () => {
    component.ngOnInit();
    expect(component.transactions).toEqual(mockTransactions);
  });

  it('should sort transactions on sort', () => {
    const event = { target: { value: 'amount' } } as unknown as Event;
    component.onSort(event, 'asc');
    expect(transactionServiceSpy.sortTransactions).toHaveBeenCalledWith('amount', 'asc');
  });

  it('should filter transactions on filter', () => {
    component.filterForm.setValue({ criteria: 'category', value: 'A' });
    component.onFilter();
    expect(transactionServiceSpy.filterTransactions).toHaveBeenCalledWith('category', 'A');
  });

  it('should search transactions on search', () => {
    const event = { target: { value: 'Test' } } as unknown as Event;
    component.onSearch(event);
    expect(transactionServiceSpy.filterTransactions).toHaveBeenCalledWith('description', 'Test');
  });

  it('should reset transactions on reset', () => {
    component.resetFilters();
    expect(transactionServiceSpy.resetTransactions).toHaveBeenCalled();
  });

  it('should handle null event.target in onSearch', () => {
    component.onSearch({ target: null } as unknown as Event);
    expect(transactionServiceSpy.filterTransactions).toHaveBeenCalledWith('description', '');
  });

});
