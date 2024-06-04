import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Transaction {
  id: number;
  date: Date;
  amount: number;
  category: string;
  description?: string;
}
@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private ec2InstanceUrl = environment.ec2instance;
  private transactionSubject = new BehaviorSubject<Transaction[]>([]);
  transactions$ = this.transactionSubject.asObservable();
  private transactions: Transaction[] = [];

  constructor(private http: HttpClient){}

  addTransaction(transaction: Transaction){
    // this.transactions.push(transaction);
    // this.transactionSubject.next(this.transactions);
    return this.http.post<Transaction>(this.ec2InstanceUrl, transaction);
    console.log('transactions: ', this.transactions)
  }

  getTransaction(){
    // return this.transactions;
    return this.http.get<Transaction[]>(this.ec2InstanceUrl);
  }

  sortTransactions(criteria: string, direction: 'asc' | 'desc'): void {
    const sortedTransactions = [...this.transactions].sort((a, b) => {
      if (criteria === 'date') {
        return direction === 'asc'
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (criteria === 'amount') {
        return direction === 'asc' ? a.amount - b.amount : b.amount - a.amount;
      } else if (criteria === 'category') {
        return direction === 'asc'
          ? a.category.localeCompare(b.category)
          : b.category.localeCompare(a.category);
      }
      return 0;
    });
    this.transactionSubject.next(sortedTransactions);
  }

  filterTransactions(criteria: keyof Transaction, value: string): void {
    const filteredTransactions = this.transactions.filter(transaction => {
      const transactionValue = transaction[criteria];
      if (typeof transactionValue === 'string') {
        return transactionValue.toLowerCase().includes(value.toLowerCase());
      } else if (typeof transactionValue === 'number') {
        return transactionValue === Number(value);
      } else if (transactionValue instanceof Date) {
        return transactionValue.toISOString().includes(value);
      }
      return false;
    });
    this.transactionSubject.next(filteredTransactions);
  }

  resetTransactions(): void {
    this.transactionSubject.next([]);
  }

}
