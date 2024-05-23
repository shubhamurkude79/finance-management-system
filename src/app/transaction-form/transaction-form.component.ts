import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TransactionService } from '../services/transaction-service.service';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss']
})
export class TransactionFormComponent implements OnInit {
  transactionForm: FormGroup;

  constructor(private fb: FormBuilder, private transacService: TransactionService) {
    this.transactionForm = this.fb.group({
      amount: ['', Validators.required],
      date: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if(this.transactionForm.valid){
      this.transacService.addTransaction(this.transactionForm.value);
      this.transactionForm.reset();
    }
  }

}
