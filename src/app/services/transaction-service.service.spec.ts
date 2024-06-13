import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Transaction, TransactionService } from './transaction-service.service';
import { environment } from 'src/environments/environment';

describe('TransactionService', () => {
  let service: TransactionService;
  let httpMock: HttpTestingController;

  const initialTransactions: Transaction[] = [
    { id: 1, date: new Date('2022-01-01'), amount: 100, category: 'A' },
    { id: 2, date: new Date('2022-01-03'), amount: 200, category: 'B' },
    { id: 3, date: new Date('2022-01-02'), amount: 150, category: 'C' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TransactionService]
    });
    service = TestBed.inject(TransactionService);
    httpMock = TestBed.inject(HttpTestingController);
     service.resetTransactions();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a transaction', (done) => {
    const newTransaction: Transaction = { id: 4, date: new Date(), amount: 100, category: 'Food', description: 'Lunch' };

    service.addTransaction(newTransaction);

    const req = httpMock.expectOne(`${environment.ec2instance}/transactions`);
    expect(req.request.method).toBe('POST');
    req.flush(newTransaction);

    service.transactions$.subscribe(transactions => {
      expect(transactions.length).toBe(1);
      expect(transactions[0]).toEqual(jasmine.objectContaining(newTransaction));
      done();
    });
  });

  it('should get transactions', (done) => {
    service.getTransaction();

    const req = httpMock.expectOne(`${environment.ec2instance}/transactions`);
    expect(req.request.method).toBe('GET');
    req.flush(initialTransactions);

    service.transactions$.subscribe(transactions => {
      expect(transactions.length).toBe(3);
      expect(transactions).toEqual(initialTransactions.map(transaction => ({
        ...transaction,
        date: new Date(transaction.date)
      })));
      done();
    });
  });

  it('should sort transactions by date in ascending order', (done) => {
    service.resetTransactions();
    initialTransactions.forEach(transaction => service.addTransaction(transaction));
    const reqs = httpMock.match(`${environment.ec2instance}/transactions`);
    reqs.forEach(req => req.flush({}));

    service.sortTransactions('date', 'asc');
    service.transactions$.subscribe(sortedTransactions => {
      expect(sortedTransactions[0].date).toEqual(new Date('2022-01-01'));
      expect(sortedTransactions[1].date).toEqual(new Date('2022-01-02'));
      expect(sortedTransactions[2].date).toEqual(new Date('2022-01-03'));
      done();
    });
  });

  it('should sort transactions by date in descending order', () => {
    service.resetTransactions();
    initialTransactions.forEach(transaction => service.addTransaction(transaction));
    const reqs = httpMock.match(`${environment.ec2instance}/transactions`);
    reqs.forEach(req => req.flush({}));

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

  it('should reset transactions', (done) => {
    const transaction: Transaction = { id: 4, date: new Date(), amount: 100, category: 'Food', description: 'Lunch' };
    service.addTransaction(transaction);

    const req = httpMock.expectOne(`${environment.ec2instance}/transactions`);
    req.flush(transaction);

    service.resetTransactions();
    service.transactions$.subscribe(transactions => {
      expect(transactions.length).toBe(0);
      done();
    });
  });

});
