import { HttpErrorResponse } from '@angular/common/http';

export interface Account {
  name?: string;
  accountNumber: string;
}

export interface Transfer {
  categoryCode?: string;
  dates?: BankDate;
  transaction: Transaction;
  merchant: Account;
}

export interface BankDate {
  valueDate: number | string | Date;
}

export interface Transaction {
  amountCurrency: AmountCurrency;
  type: TransactionTypes;
  creditDebitIndicator: CreditDebitIndicators;
}

export interface AmountCurrency {
  amount: number;
  currencyCode: string;
}

export enum TransactionTypes {
  Salary = 'Salaries',
  Payment = 'Card Payment',
  Transfer = 'Online Transfer',
}

export enum CreditDebitIndicators {
  CRDT = 'CRDT',
  DBIT = 'DBIT',
}

export interface FailedActionPayload {
  errorMessage: string;
  errorResponse: HttpErrorResponse;
}

export interface QueryModel {
  search?: string | undefined;
  sortBy?: SortBy | undefined;
  sortOrder?: SortingOrders | undefined;
}

export enum SortBy {
  Date = 'date',
  Beneficiary = 'beneficiary',
  Amount = 'amount'
}

export enum SortingOrders {
  Asc = 'ascending',
  Dsc = 'descending',
}
