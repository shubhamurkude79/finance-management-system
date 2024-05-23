import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../services/transaction-service.service';

@Component({
  selector: 'app-transaction-summaries',
  templateUrl: './transaction-summaries.component.html',
  styleUrls: ['./transaction-summaries.component.scss']
})
export class TransactionSummariesComponent implements OnInit {
  totalTransactions = 0;
  totalAmount = 0;

  constructor(private transacService: TransactionService) { }

  ngOnInit(): void {
    this.transacService.transactions$.subscribe(transactions => {
      this.totalTransactions = transactions.length;
      this.totalAmount = transactions.reduce((sum, transaction) => sum + transaction.amount, 0) 
    });
  }

}
