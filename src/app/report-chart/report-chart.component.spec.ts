import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportChartComponent } from './report-chart.component';
import { Transaction, TransactionService } from '../services/transaction-service.service';
import * as c3 from 'c3';
import { of } from 'rxjs';

describe('ReportChartComponent', () => {
  let component: ReportChartComponent;
  let fixture: ComponentFixture<ReportChartComponent>;
  let transactionService: jasmine.SpyObj<TransactionService>;

  const mockTransactions: Transaction[] = [
    { id: 1, date: new Date('2023-01-01'), amount: 100, category: 'A', description: 'Test transaction 1' },
    { id: 2, date: new Date('2023-01-02'), amount: 200, category: 'B', description: 'Test transaction 2' },
    { id: 3, date: new Date('2023-01-03'), amount: 300, category: 'C', description: 'Test transaction 3' },
  ];

  beforeEach(async () => {
    const transactionServiceSpy = jasmine.createSpyObj('TransactionService', ['transaction$']);
    transactionServiceSpy.transactions$ = of(mockTransactions);
    await TestBed.configureTestingModule({
      declarations: [ ReportChartComponent ],
      providers: [{ provide: TransactionService, useValue: transactionServiceSpy }]
    })
    .compileComponents();
    fixture = TestBed.createComponent(ReportChartComponent);
    component = fixture.componentInstance;
    transactionService = TestBed.inject(TransactionService) as jasmine.SpyObj<TransactionService>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize and call transaction report data on ngAfterViewInit', () => {
    spyOn(component, 'transactionReportData');
    component.ngAfterViewInit();
    expect(component.transactionReportData).toHaveBeenCalled();
  });

  it('should unsubscribe on ngOnDestroy', () => {
    component.transactionReportData();
    spyOn(component.subscription!, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.subscription!.unsubscribe).toHaveBeenCalled();
  });
  
  it('should call c3.generate with correct parameters in generateBarChart', () => {
    const dates: [string, ...string[]] = ['x', '2023-01-01', '2023-01-02', '2023-01-03'];
    const amounts: [string, ...number[]] = ['Amount', 100, 200, 300];

    spyOn(c3, 'generate');
    component.generateBarChart(dates, amounts);
    expect(c3.generate).toHaveBeenCalledWith({
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
          height: 100
        },
        y: {
          label: {
            text: 'Transaction Amount',
            position: 'outer-middle'
          }
        }
      }
    });
  });

});
