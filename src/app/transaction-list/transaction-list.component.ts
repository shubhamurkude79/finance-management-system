import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../services/transaction-service.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {
  transactions:any = [];

  constructor(private trnasacService: TransactionService) { }

  ngOnInit(): void {
    this.trnasacService.transactions$.subscribe(transact => {
      this.transactions = transact;
    });
  }

}
