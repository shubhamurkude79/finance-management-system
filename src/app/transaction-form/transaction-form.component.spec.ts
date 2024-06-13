import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionFormComponent } from './transaction-form.component';
import { TransactionService } from '../services/transaction-service.service';
import { ReactiveFormsModule } from '@angular/forms';

describe('TransactionFormComponent', () => {
  let component: TransactionFormComponent;
  let fixture: ComponentFixture<TransactionFormComponent>;
  let transactionService: jasmine.SpyObj<TransactionService>;

  beforeEach(async () => {
    const transactionServiceSpy = jasmine.createSpyObj('TransactionService', ['addTransaction']);
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [TransactionFormComponent],
      providers: [{ provide: TransactionService, useValue: transactionServiceSpy }]
    })
    .compileComponents();
    fixture = TestBed.createComponent(TransactionFormComponent);
    component = fixture.componentInstance;
    transactionService = TestBed.inject(TransactionService) as jasmine.SpyObj<TransactionService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.transactionForm.value).toEqual({
      amount: null,
      date: null,
      category: '',
      description: ''
    });
  });
  
  it('should mark the form as invalid when fields are empty', () => {
    expect(component.transactionForm.valid).toBeFalsy();
    expect(component.transactionForm.get('amount')!.errors?.required).toBeTruthy();
    expect(component.transactionForm.get('date')!.errors?.required).toBeTruthy();
    expect(component.transactionForm.get('category')!.errors?.required).toBeTruthy();
    expect(component.transactionForm.get('description')!.errors?.required).toBeFalsy(); 
  });

  it('should mark the form as valid when all fields are filled', () => {
    component.transactionForm.patchValue({
      amount: 100,
      date: new Date(),
      category: 'Food',
      description: 'Lunch'
    });
    expect(component.transactionForm.valid).toBeTruthy();
  });

  it('should call addTransaction method when form is submitted', () => {
    component.transactionForm.patchValue({
      amount: 100,
      date: new Date(),
      category: 'Food',
      description: 'Lunch'
    });
    component.onSubmit();
    expect(transactionService.addTransaction).toHaveBeenCalledOnceWith(jasmine.any(Object));
  });

  it('should reset the form after successful submission', () => {
    component.transactionForm.patchValue({
      amount: 100,
      date: new Date(),
      category: 'Food',
      description: 'Lunch'
    });
    component.onSubmit();
    expect(component.transactionForm.value).toEqual({
      amount: null,
      date: null,
      category: null,
      description: null
    });
  });

});
