import { TestBed } from '@angular/core/testing';

import { Transaction, TransactionService } from './transaction-service.service';

describe('TransactionService', () => {
  let service: TransactionService;

  const initialTransactions: Transaction[] = [
    { id: 1, date: new Date('2022-01-01'), amount: 100, category: 'A' },
    { id: 2, date: new Date('2022-01-03'), amount: 200, category: 'B' },
    { id: 3, date: new Date('2022-01-02'), amount: 150, category: 'C' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionService);
     // Clear existing transactions and add the test transactions before each test
     service.resetTransactions();
    initialTransactions.forEach(transaction => service.addTransaction(transaction));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a transaction', (done) => {
    const newTransaction: Transaction = { id: 4, date: new Date(), amount: 100, category: 'Food', description: 'Lunch' };
    service.addTransaction(newTransaction);
    service.transactions$.subscribe(transactions => {
      expect(transactions.length).toBe(4);
      expect(transactions[3]).toEqual(newTransaction);
      done();
    });
  });

  it('should get transactions', () => {
    const transactions = service.getTransaction();
    expect(transactions.length).toBe(3);
    expect(transactions).toEqual(initialTransactions);
  });

  it('should sort transactions by date in ascending order', () => {
    service.sortTransactions('date', 'asc');
    service.transactions$.subscribe(sortedTransactions => {
      expect(sortedTransactions[0].date).toEqual(new Date('2022-01-01'));
      expect(sortedTransactions[1].date).toEqual(new Date('2022-01-02'));
      expect(sortedTransactions[2].date).toEqual(new Date('2022-01-03'));
    });
  });

  it('should sort transactions by date in descending order', () => {
    service.sortTransactions('date', 'desc');
    service.transactions$.subscribe((sortedTransactions) => {
      expect(sortedTransactions[0].date).toEqual(new Date('2022-01-03'));
      expect(sortedTransactions[1].date).toEqual(new Date('2022-01-02'));
      expect(sortedTransactions[2].date).toEqual(new Date('2022-01-01'));
    });
  });

  it('should sort transactions by amount in ascending order', () => {
    service.sortTransactions('amount', 'asc');
    service.transactions$.subscribe((sortedTransactions) => {
      expect(sortedTransactions[0].amount).toBe(100);
      expect(sortedTransactions[1].amount).toBe(150);
      expect(sortedTransactions[2].amount).toBe(200);
    });
  });

  it('should sort transactions by amount in descending order', () => {
    service.sortTransactions('amount', 'desc');
    service.transactions$.subscribe((sortedTransactions) => {
      expect(sortedTransactions[0].amount).toBe(200);
      expect(sortedTransactions[1].amount).toBe(150);
      expect(sortedTransactions[2].amount).toBe(100);
    });
  });

  it('should sort transactions by category in ascending order', () => {
    service.sortTransactions('category', 'asc');
    service.transactions$.subscribe((sortedTransactions) => {
      expect(sortedTransactions[0].category).toBe('A');
      expect(sortedTransactions[1].category).toBe('B');
      expect(sortedTransactions[2].category).toBe('C');
    });
  });

  it('should sort transactions by category in descending order', () => {
    service.sortTransactions('category', 'desc');
    service.transactions$.subscribe((sortedTransactions) => {
      expect(sortedTransactions[0].category).toBe('C');
      expect(sortedTransactions[1].category).toBe('B');
      expect(sortedTransactions[2].category).toBe('A');
    });
  });

  it('should filter transactions by category', (done) => {
    service.filterTransactions('category', 'A');
    service.transactions$.subscribe(filteredTransactions => {
      expect(filteredTransactions.length).toBe(1);
      expect(filteredTransactions[0].category).toBe('A');
      done();
    });
  });

  it('should filter transactions by amount', (done) => {
    service.filterTransactions('amount', '150');
    service.transactions$.subscribe(filteredTransactions => {
      expect(filteredTransactions.length).toBe(1);
      expect(filteredTransactions[0].amount).toBe(150);
      done();
    });
  });

  it('should filter transactions by date', (done) => {
    service.filterTransactions('date', '2022-01-02');
    service.transactions$.subscribe(filteredTransactions => {
      expect(filteredTransactions.length).toBe(1);
      expect(filteredTransactions[0].date).toEqual(new Date('2022-01-02'));
      done();
    });
  });

  it('should reset transactions', () => {
    const transaction: Transaction = { id: 4, date: new Date(), amount: 100, category: 'Food', description: 'Lunch' };
    service.addTransaction(transaction);
    service.resetTransactions();
    service.transactions$.subscribe(transactions => {
      expect(transactions.length).toBe(0);
    });
  });

});
