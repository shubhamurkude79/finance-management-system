import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransactionSummariesComponent } from './transaction-summaries/transaction-summaries.component';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransactionService } from './services/transaction-service.service';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { ReportChartComponent } from './report-chart/report-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TransactionSummariesComponent,
    TransactionFormComponent,
    TransactionListComponent,
    ReportChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [TransactionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
