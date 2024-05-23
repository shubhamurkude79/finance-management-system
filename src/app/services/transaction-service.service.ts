import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Transaction {
  date: string;
  amount: number;
  category: string;
}
@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private transactionSubject = new BehaviorSubject<Transaction[]>([]);
  transactions$ = this.transactionSubject.asObservable();
  private transactions: Transaction[] = [];

  addTransaction(transaction: Transaction){
    this.transactions.push(transaction);
    this.transactionSubject.next(this.transactions);
    console.log('transactions: ', this.transactions)
  }

  getTransaction(){
    return this.transactions;
  }
}
