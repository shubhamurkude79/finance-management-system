import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TransactionService, Transaction } from '../services/transaction-service.service';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss']
})
export class TransactionFormComponent implements OnInit {
  transactionForm: FormGroup;

  constructor(private fb: FormBuilder, private transactionService: TransactionService) {
    this.transactionForm = this.fb.group({
      amount: [null, [Validators.required, Validators.min(0.01)]],
      date: [null, Validators.required],
      category: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if(this.transactionForm.valid){
      const newTransaction: Transaction = {
        id: Date.now(),
        ...this.transactionForm.value
      }
      this.transactionService.addTransaction(newTransaction);
      this.transactionForm.reset();
    }
  }

}
