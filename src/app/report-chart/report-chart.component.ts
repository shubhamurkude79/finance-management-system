import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Transaction, TransactionService } from '../services/transaction-service.service';
import * as c3 from 'c3';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-report-chart',
  templateUrl: './report-chart.component.html',
  styleUrls: ['./report-chart.component.scss']
})
export class ReportChartComponent implements AfterViewInit, OnDestroy {
  transactions: Transaction[] = [];
  subscription: Subscription | undefined;
  
  constructor(private transactionService: TransactionService) { }

  ngAfterViewInit(): void {
    this.transactionReportData();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  transactionReportData(): void {
    this.subscription = this.transactionService.transactions$.subscribe(transactions => {
      this.transactions = transactions;
      console.log('chart', this.transactions);
      const dates: [string, ...string[]] = ['x', ...this.transactions.map(transaction => {
        if (transaction.date instanceof Date) {
          return transaction.date.toISOString().split('T')[0];
        }
        return '';
      })];
      const amounts: [string, ...number[]] = ['Amount', ...this.transactions.map(transaction => transaction.amount)];
      
        this.generateBarChart(dates, amounts);
    });
  }

  generateBarChart(dates: [string, ...string[]], amounts: [string, ...number[]]): void {
    c3.generate({
      bindto: '#expensesChart',
      data: {
        x: 'x',
        columns: [
          dates,
          amounts
        ],
        type: 'line'
      },
      axis: {
        x: {
          type: 'category',
          tick: {
            fit: true,
            format: '%Y-%m-%d',
            rotate: 70,
            multiline: false
          },
          height: 70
        },
        y: {
          label: {
            text: 'Transaction Amount',
            position: 'outer-middle'
          }
        }
      }
    });
  }


}
