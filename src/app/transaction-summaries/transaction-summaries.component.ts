import { Component, OnInit } from '@angular/core';
import { Transaction, TransactionService } from '../services/transaction-service.service';

@Component({
  selector: 'app-transaction-summaries',
  templateUrl: './transaction-summaries.component.html',
  styleUrls: ['./transaction-summaries.component.scss']
})
export class TransactionSummariesComponent implements OnInit {
  transactions: Transaction[] = [];
  totalTransactions = 0;
  totalAmount = 0;

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.transactionService.transactions$.subscribe(transactions => {
      this.transactions = transactions;
      this.totalTransactions = transactions.length;
      this.totalAmount = transactions.reduce((sum, transaction) => sum + transaction.amount, 0) 
    });
  }

}
