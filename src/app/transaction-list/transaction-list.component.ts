import { Component, OnInit } from '@angular/core';
import { Transaction, TransactionService } from '../services/transaction-service.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {
  transactions:any = [];
  filterForm: FormGroup;

  constructor(private transactionService: TransactionService, private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      criteria: [''],
      value: ['']
    });
  }

  ngOnInit(): void {
    this.transactionService.transactions$.subscribe(transact => {
      this.transactions = transact;
    });
  }

  onSort(event: Event, direction: 'asc' | 'desc'): void {
    const target = event.target as HTMLSelectElement;
    const criteria = target.value as keyof Transaction;
    this.transactionService.sortTransactions(criteria, direction);
  }

  onFilter(): void {
    const { criteria, value } = this.filterForm.value;
    this.transactionService.filterTransactions(criteria as keyof Transaction, value);
  }
  
  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target ? target.value : '';
    this.transactionService.filterTransactions('description', value);
  }

  resetFilters(): void {
    this.transactionService.resetTransactions();
  }
}
